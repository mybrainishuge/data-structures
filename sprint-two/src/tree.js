var Tree = function(value) {
  var newTree = {};
  newTree.value = value;
  _.extend(newTree, treeMethods);
  newTree.children = {};

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var keys = Object.keys(this.children).length;
  this.children[keys] = Object.create(treeMethods);
  this.children[keys].value = value;
  this.children[keys].children = {};
};

treeMethods.contains = function(target) {
  if (this.value === target) {
    return true;
  }

  for (var child in this.children) {
    if (child.value === target) {
      return true;
    }
    if (!Object.keys(child.children).length) {
      return child.contains(target);
    }
  }
  return false;
};



/*
 * Complexity: What is the time complexity of the above functions?
 */

/*
  var tree = Tree();

  tree = {
    value: undefined,
    children: {
      0: {
        value: 5,
        children: {
          0: {
            value: 7,
            children: {}
          }
        }
      },

      1: {
        value: 6,
        children: {
          0: {
            value: 8,
            children: {}
          }
        }
      }
    },
  }
*/