var _ = require('lodash');
var GenerateBlocks = require('./GenerateBlocks');



/**
 *
 * @param file
 * @param ACArray
 * @returns {string}
 * @constructor
 */
function SourceMaker(file, ACArray) {
  var originalFile = String(file),
      blocks = GenerateBlocks.run(ACArray),
      root = {
        code: file,
        start: 0,
        stop: file.length-1,
        children: []
      },
      addNode = function(parent, newNode) {
        var ok = false;
        // buscar primero en los hijos del nodo de manera recursiva
        parent.children.forEach(function(node) {
          if(isParent(node, newNode)) {
            ok = addNode(node, newNode);
          }
        });
        // si recorrió todos los hijos del nodo actual (si tiene) y no encontró un padre
        // entonces lo "adopta"
        if(!ok) {
          parent.children.push(newNode);
          //console.log('Padre: ', parent.start, parent.stop, 'hijo: ', newNode.start, newNode.stop);
          ok = true;
        }
        return ok;
      },
      isParent = function(parent, node) {
        return parent.start <= node.start && parent.stop >= node.stop;
      },
      flatten = function(parent) {
        if(parent.children.length) {
          parent.children.forEach(function(child) {
            flatten(child);
          });
          parent.code = patch(parent);
        }
      },
      patch = function(node) {
        var code = node.code;
        _.each(node.children, function(child) {
          code = code.replace(child.originalCode, child.code);
        });
        return code;
      };

  while(blocks.length) {
    addNode(root, blocks.shift());
  }
  flatten(root);
  return root.code;
}

module.exports = SourceMaker;