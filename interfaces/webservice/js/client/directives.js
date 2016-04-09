angular.module('ac.directives', [])
    .directive('dropzone', ['ACFSServices', function(ACFSServices) {
      return {
        restrict: 'A',
        controller: function($scope) {

        },
        link: function(scope, element, attrs) {

          var fileSelect = angular.element('<input type="file" id="folder-selector" webkitdirectory/>');

          function init(dropZone) {
            dropZone.addEventListener('drop', ACFSServices.eventHandlers.onDrop);
            dropZone.addEventListener('dragover', function(e) {
              e.preventDefault(); // Necessary. Allows us to drop.
            });
            dropZone.addEventListener('dragenter', function(e) {
              e.target.classList.add('ac-dragdrop-active');
            });
            dropZone.addEventListener('dragleave', function(e) {
              e.target.classList.remove('ac-dragdrop-active');
            });

            fileSelect.bind('change', ACFSServices.eventHandlers.onChange);

            element.bind('click', function(e) {
              fileSelect[0].click();
            });

            ACFSServices.init();

          }

          var listeners = [
                scope.$on('ac:list-files', function() {
                  $rootScope.$broadcast('ac:file-list', files);
                }),
                scope.$on('ac:pick-project', function() {
                  fileSelect[0].click();
                })
              ];

          scope.$on('$destroy', function() {
            listeners.forEach(function(listener) {
              listener.call();
            });
            fileSelect.unbind('change');
          });

          init(element[0]);
        }
      }
    }]);
