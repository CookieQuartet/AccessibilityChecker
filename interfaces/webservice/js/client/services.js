angular.module('ac.services', [])
    .factory('ACFSServices', function($q, $timeout, $rootScope) {

      var fs = null;
      var files = [];
      var cwd = null;
      var events = {
        onError: function(e) {
          console.error(e.message);
        },
        onChange: function(e) {
          e.stopPropagation();
          e.preventDefault();

          $rootScope.$broadcast('ac:reset-list');

          var _target = e.target;
          var _files = _target.files;
          var total = _files.length;
          var count = 0;

          removeDirectoryContent(fs.root).then(function(promises) {
            $q.when.apply(null, promises).then(function() {
              var defer = $q.defer();
              [].forEach.call(_files, function(f, i) {
                writeFile(f, function(e) {
                  //console.log(e);
                  if(e.type === 'writeend') { count++; }
                  if(total === count) {
                    defer.resolve();
                  }
                });
              });
              defer.promise.then(function() {
                files = [];
                //listFiles(fs.root);
                //scope.$emit('ac:list-files');
              });
              updateProject(_target.files[0].webkitRelativePath.split('/')[0]);
              _target.value = "";
            });
          });

        },
        onDrop: function(e) {
          e.preventDefault();
          e.stopPropagation();

          $rootScope.$broadcast('ac:reset-list');

          removeDirectoryContent(fs.root);

          var items = e.dataTransfer.items;
          var files = e.dataTransfer.files;

          for (var i = 0, item; item = items[i]; ++i) {
            // Skip this one if we didn't get a file.
            if (item.kind != 'file') {
              continue;
            }

            item.webkitGetAsEntry().copyTo(cwd, null, function(copiedEntry) {
              files = [];
              //listFiles(fs.root);
              //scope.$emit('ac:list-files');
            }, events.onError);
          }
          updateProject(e.dataTransfer.files[0].name);
        }
      };

      function toArray(list) {
        return Array.prototype.slice.call(list || [], 0);
      }
      function updateProject(name) {
        // Enviar el nombre del proyecto al frontend
        var value = name;
        $timeout(function() {
          $rootScope.$broadcast('ac:select-project', {
            name: value
          });
        });
      }
      function getDirectory(fullPath, callback) {
        fs.root.getDirectory(fullPath, {}, function(dirEntry) {
          callback(dirEntry);
        }, function(e) {
          createDirectory(fs.root, fullPath.split('/'), callback);
        });
      }
      function createDirectory(rootDirEntry, folders, callback) {
        // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
        if (folders[0] == '.' || folders[0] == '') {
          folders = folders.slice(1);
        }
        rootDirEntry.getDirectory(folders[0], {create: true}, function(dirEntry) {
          // Recursively add the new subfolder (if we still have another to create).
          if (folders.length) {
            createDirectory(dirEntry, folders.slice(1), callback);
          } else {
            callback(dirEntry);
          }
        }, events.onError);
      }
      function readDirectory(dirEntry, callback) {
        var dirReader = dirEntry.createReader();
        var entries = [];

        // Call the reader.readEntries() until no more results are returned.
        var readEntries = function() {
          dirReader.readEntries (function(results) {
            if (!results.length) {
              callback(entries);
            } else {
              entries = entries.concat(toArray(results));
              readEntries();
            }
          }, events.onError);
        };

        readEntries(); // Start reading dirs.
      }
      function removeDirectoryContent(dir) {
        var totalDefer = $q.defer();
        readDirectory(dir, function(dirEntries) {
          var promises = [];
          dirEntries.forEach(function(entry) {
            var defer = $q.defer();
            promises.push(defer.promise);
            entry[entry.isDirectory ? 'removeRecursively' : 'remove'](function() { defer.resolve(); }, events.onError)
          });
          totalDefer.resolve(promises);
        });
        return totalDefer.promise;
      }
      function writeFile(file, callback) {
        var parts = file.webkitRelativePath.split('/'),
            filename = parts[parts.length -1],
            path = parts.slice(0, parts.length-1).join('/');
        getDirectory(path, function(dirEntry) {
          dirEntry.getFile(filename, {create: true}, function (fileEntry) {
            fileEntry.createWriter(function (writer) {
              writer.onwriteend = callback;
              writer.onerror = callback;
              writer.write(file);
            }, events.onError);
          }, events.onError);
        });
      }
      function readFileContent(file, type, callback) {
        fs.root.getFile(file, {}, function(fileEntry) {
          fileEntry.file(function(file) {
            var reader = new FileReader(),
                readMethod = type === 'binary' ? 'readAsArrayBuffer' : 'readAsText';
            reader.onloadend = function(e) {
              callback(this.result);
            };
            reader[readMethod](file);
            //reader.readAsText(file);
          }, events.onError);
        }, events.onError);
      }
      function listFiles(dirEntry) {
        readDirectory(dirEntry, function(entries) {
          if (!entries.length) {
            //$rootScope.$broadcast('ac:file-list', files);
            return;
          }
          entries.forEach(function(entry, i) {
            if (entry.isDirectory) {
              listFiles(entry);
            } else {
              //console.log(entry.fullPath);
              $rootScope.$broadcast('ac:file-item', entry.fullPath);
            }
          });
        });
      }
      function processFiles(dirEntry, regex, callback) {
        readDirectory(dirEntry, function(entries) {
          if (!entries.length) {
            return;
          }
          entries.forEach(function(entry, i) {
            if (entry.isDirectory) {
              processFiles(entry, regex, callback);
            } else {
              if(regex.test(entry.name)) {
                callback(entry);
              }
            }
          });
        });
      }
      function init() {
        window.requestFileSystem(TEMPORARY, 1024 * 1204, function(fileSystem) {
          fs = fileSystem;
          // cwd == current working directory
          cwd = fs.root;
          // limpiar el filesystem
          removeDirectoryContent(cwd);
        }, events.onError);
      }

      return {
        init: init,
        root: function() {
          return cwd;
        },
        getDirectory: getDirectory,
        createDirectory: createDirectory,
        readDirectory: readDirectory,
        removeDirectoryContent: removeDirectoryContent,
        writeFile: writeFile,
        readFileContent: readFileContent,
        listFiles: listFiles,
        processFiles: processFiles,
        eventHandlers: events
      }
    })
    .factory('ACMockResponse', function() {
      return [
        {
          file: 'file.xml',
          line: 205,
          description: 'Los botones tienen que tener un tamaño mínimo de 48x48 píxeles',
          snippet: '<Button \
          \n\tandroid:layout_width="wrap_content" \
          \n\tandroid:layout_height="wrap_content" \
          \n\tandroid:text="@string/composeButtonLabel" \
          \n\tandroid:id="@+id/composeButton" \
          \n\tandroid:layout_below="@+id/buttonsLabel" \
          \n\tandroid:layout_alignLeft="@+id/buttonsLabel" \
          \n\tandroid:nextFocusUp="@+id/buttonsLabel" \
          \n\tandroid:nextFocusDown="@+id/checkboxesLabel" \
              \n/>',
          selected: false
        },
        {
          file: 'file.xml',
          line: 205,
          description: 'Los botones tienen que tener un tamaño mínimo de 48x48 píxeles',
          snippet: '<Button \
          \n\tandroid:layout_width="wrap_content" \
          \n\tandroid:layout_height="wrap_content" \
          \n\tandroid:text="@string/composeButtonLabel" \
          \n\tandroid:id="@+id/composeButton" \
          \n\tandroid:layout_below="@+id/buttonsLabel" \
          \n\tandroid:layout_alignLeft="@+id/buttonsLabel" \
          \n\tandroid:nextFocusUp="@+id/buttonsLabel" \
          \n\tandroid:nextFocusDown="@+id/checkboxesLabel" \
              \n/>',
          selected: false
        }

      ]
    })
    .factory('ACSockets', function($socket) {
      return {
        getProfiles: function() {
          $socket.emit('ac:socket:get_profiles');
        },
        analyze: function(data) {
          $socket.emit('ac:socket:analyze', data);
        },
        process: function(data) {
          $socket.emit('ac:socket:process', data);
        },
        addListener: function(event, handler) {
          $socket.on(event, handler);
        }
      };
    })
    .factory('ACZip', function() {
      var zip = new JSZip();
      return {
        addFile: function(path, file) {
          zip.file(path, file);
        },
        getZip: function() {
          var content = zip.generate({type:"blob"});
          saveAs(content, "project.zip");
        }
      }
    });