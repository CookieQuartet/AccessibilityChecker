angular.module('ac.controllers', ['ngMaterial'])
    .controller('ContentController', ['$scope', '$rootScope', '$q', 'ACFSServices', '$mdDialog', '$mdMedia', 'ACSockets', 'ACZip',
      function($scope, $rootScope, $q, ACFSServices, $mdDialog, $mdMedia, ACSockets, ACZip) {

      $scope.methods = {
        analyze: function() {
          // reseteo la lista de archivos
          $scope.data.files = [];
          // Genero un listado de TODOS los archivos del proyecto
          ACFSServices.listFiles(ACFSServices.root());
          // proceso SOLO los archivos necesarios
          ACFSServices.processFiles(ACFSServices.root(), (/\.(xml|java)$/i), function(item) {
            var _item = item;
            ACFSServices.readFileContent(item.fullPath, 'text', function(content) {
              var parts = _item.name.split('.');
              ACSockets.analyze({
                file: content,
                name: _item.name,
                fullPath: _item.fullPath,
                extension: parts[parts.length-1],
                platform: $scope.data.platform.type,
                profile: $scope.data.profile.id
              });
            });
          });
          $scope.data.running = true;
        },
        generateZip: function() {
          var promises = [];
          var totalDefer = $q.defer();
          var count = 0;
          ACFSServices.processFiles(ACFSServices.root(), (/(.+)/i), function(item) {
            var _item = item;
            var defer = $q.defer();
            promises.push(defer.promise);
            ACFSServices.readFileContent(item.fullPath, 'binary', function(content) {
              ACZip.addFile(_item.fullPath, content);
              defer.resolve();
              count = count + 1;
              if(count == $scope.data.files.length) {
                totalDefer.resolve(promises);
              }
            });
          });
          return totalDefer.promise;
        },
        process: function() {
          // aplicar los cambios seleccionados
          // ...
          // generar el zip para descarga
          $scope.methods.generateZip().then(function(promises) {
            $q.when.apply(null, promises).then(function() {
              ACZip.getZip();
            });
          });
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

          ACFSServices.readFileContent(item.fullPath, 'text', function(content) {

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
              controller: function DialogController($scope, $mdDialog) {

                $scope.data = {
                  name: _item.name,
                  content: content,
                  extension: _item.extension,
                  start: _item.startLine,
                  stop: _item.stopLine
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
        },
        onTabSelected: function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $event.stopImmediatePropagation();
        }
      };

      $scope.data = {
          project: '',
          analyzable: false,
          files: [],
          items: [],
          platform: null,
          profile: null,
          running: false,
          platforms: [
            {type: 'android', name: 'Android'},
            {type: 'ios', name: 'iOS'},
            {type: 'windows', name: 'Windows'}
          ],
          profiles: []
      };

      var listeners = [
            $scope.$on('ac:select-project', function(event, data) {
              $scope.data.project = data.name;
              $scope.data.files = [];
              $scope.data.analyzable = true;
            }),
            $scope.$on('ac:file-item', function(event, data) {
              $scope.data.files.push(data);
             }),
            $scope.$on('ac:reset-list', function(event, data) {
              $scope.data.items = [];
            }),
            $scope.$watch('data.items.length', function(newValue, oldValue) {
              $scope.data.running = false;
            }),
            /*------------------------------------------------------------------------*/
            /* Eliminar cuando se implemente otra plataforma                          */
            /*------------------------------------------------------------------------*/
            $scope.$watch('data.platform', function(newValue, oldValue) {
              if(newValue && newValue.name !== 'Android') {
                alert('Por el momento solamente funciona con plataforma Android');
                $scope.data.platform = oldValue;
              }
            }, true)
            /*------------------------------------------------------------------------*/
          ];

      ACSockets.addListener('ac:socket:analyze_response', function(data) {
        // agregar a la lista de problemas encontrados
        $scope.data.items = _.union($scope.data.items, data);
      });

      ACSockets.addListener('ac:socket:process_response', function(data) {
        // sobreescribir en el filesystem el archivo recibido
      });

      ACSockets.addListener('ac:socket:profiles', function(data) {
        $scope.data.profiles = _.clone(data);
        $scope.data.profile = $scope.data.profiles[0];
        $scope.data.platform = $scope.data.platforms[0];
      });

      $scope.$on('$destroy', function() {
        listeners.forEach(function(listener) {
          listener.call();
        });
      });

      ACSockets.getProfiles();
    }]);