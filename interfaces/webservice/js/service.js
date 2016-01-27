window.requestFileSystem = window.requestFileSystem ||
    window.webkitRequestFileSystem;
window.resolveLocalFileSystemURL = window.webkitResolveLocalFileSystemURL ||
    window.webkitResolveLocalFileSystemURL;

angular.module('accessibilityChecker', ['ngMaterial', 'ngMessages', 'ngMdIcons','ngSocket', 'hljs', 'ac.services', 'ac.controllers', 'ac.directives'])
    .config(function(hljsServiceProvider) {
      hljsServiceProvider.setOptions({

      });
    });