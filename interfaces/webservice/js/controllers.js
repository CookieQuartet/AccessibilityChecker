angular.module('ac.controllers', ['ngMaterial'])
    .controller('ContentController', ['$scope', '$rootScope', 'ACFSServices', 'ACMockResponse', '$mdDialog', '$mdMedia',
      function($scope, $rootScope, ACFSServices, ACMockResponse, $mdDialog, $mdMedia) {
      var platform = 'Android',
          profile = 'A',
          items = ACMockResponse;

      $scope.methods = {
        analyze: function() {
          ACFSServices.processFiles(ACFSServices.root(), (/\.(xml|java)$/i), function(item) {
            var _item = item;
            ACFSServices.readFileContent(item.fullPath, function(content) {
              var parts = _item.name.split('.');
              $scope.data.items.push({
                file: _item.name,
                fullPath: _item.fullPath,
                selected: false,
                extension: parts[parts.length-1],
                description: 'Descripcion del problema',
                snippet: content.substring(0, 350),
                line: 100
              })
            });
          });
          $scope.data.running = true;
        },
        pickProject: function() {
          $rootScope.$broadcast('ac:pick-project');
        },
        selectAll: function() {
          angular.forEach($scope.data.items, function(item) {
            item.selected = true;
          })
        },
        selectNone: function() {
          angular.forEach($scope.data.items, function(item) {
            item.selected = false;
          })
        },
        showCode: function(event, item) {
          event.preventDefault();
          event.stopPropagation();

          var _item = item;

          ACFSServices.readFileContent(item.fullPath, function(content) {

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
              controller: function DialogController($scope, $mdDialog) {

                $scope.data = {
                  name: _item.file,
                  content: content,
                  extension: _item.extension
                };

                $scope.close = function() {
                  $mdDialog.cancel();
                };
              },
              templateUrl: 'partials/dialog.code.tmpl.html',
              parent: angular.element(document.body),
              targetEvent: event,
              clickOutsideToClose:true,
              fullscreen: useFullScreen
            });

            $scope.$watch(function() {
              return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
              $scope.customFullscreen = (wantsFullScreen === true);
            });
          });
        }
      };

      $scope.data = {
          project: '',
          analyzable: false,
          files: [],
          //items: items,
          items: [],
          platform: platform,
          profile: profile,
          running: false,
          platforms: [
            {category: 'platform', name: 'Android'},
            {category: 'platform', name: 'iOS'},
            {category: 'platform', name: 'Windows'}
          ],
          profiles: [
            {category: 'profile', name: 'A'},
            {category: 'profile', name: 'B'},
            {category: 'profile', name: 'C'}
          ]
      };

      var listeners = [
            $scope.$on('ac:select-project', function(event, data) {
              $scope.data.project = data.name;
              $scope.data.analyzable = true;
            }),
            $scope.$on('ac:file-list', function(event, data) {
              $scope.data.files = data;
            }),
            $scope.$on('ac:reset-list', function(event, data) {
              $scope.data.items = [];
            }),
            /*------------------------------------------------------------------------*/
            /* Eliminar cuando se implemente otra plataforma                          */
            /*------------------------------------------------------------------------*/
            $scope.$watch('data.items.length', function(newValue, oldValue) {

              $scope.data.running = false;
            }),
            $scope.$watch('data.platform', function(newValue, oldValue) {
              if(newValue !== 'Android') {
                alert('Por el momento solamente funciona con plataforma Android');
                $scope.data.platform = oldValue;
              }
            })
            /*------------------------------------------------------------------------*/
          ];

      $scope.$on('$destroy', function() {
        listeners.forEach(function(listener) {
          listener.call();
        });
      })
    }]);