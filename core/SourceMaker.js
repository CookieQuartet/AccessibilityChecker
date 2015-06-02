function SourceMaker(file, blocks) {
  var root = {
        code: file,
        start: 0,
        stop: file.length,
        children: []
      },
      holder,
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
        var chunks = [],
            offset = node.start,
            begin = 0,
            end = node.code.length,
            child, next;
        while(node.children.length) {
          child = node.children.shift();
          next = node.children[0];
          if(typeof child !== 'undefined') {
            // codigo del padre previo a la insercion de codigo
            chunks.push(node.code.substring(begin, child.start - offset));
            // el codigo modificado
            chunks.push(child.code);
            if(typeof next !== 'undefined') {
              // si quedan nodos, tengo que seguir teniendolos en cuenta
              chunks.push(node.code.substring(child.stop - offset, next.start - offset));
              // corrijo el punto de inicio de substring para continuar
              begin = next.start - offset;
            } else {
              // si era el ultimo nodo, cierro con el codigo del padre posterior a la insercion de codigo
              chunks.push(node.code.substring(child.stop - offset, end))
            }
          }
        }
        return chunks.join('');
      };
  while(blocks.length) {
    addNode(root, blocks.shift());
  }
  flatten(root);
  return root.code;
}

module.exports = SourceMaker;