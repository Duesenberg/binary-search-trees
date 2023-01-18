//create a node
const Node = (data) => {
  return {
    data,
    left: null,
    right: null,
  }
}

//create a BST
const Tree = (array) => {
  return {
    root: buildTree(array),
  }
}

//structure the BST from un-ordered array
const buildTree = (array) => {
  let cleanArray = removeDuplicates(array);

  let sortedArray = mergeSort(cleanArray);

  let start = 0;
  let end = sortedArray.length - 1;

  let root = sortedArrayToBST(sortedArray, start, end);

  return root;
}

//remove duplicate values from array
const removeDuplicates = (array) => {
  let cleanArray = [];
  let current;
  let duplicateIndicator = 0;

  for (i = 0; i < array.length; i++) {
    current = array[i];

    for (j = 0; j < cleanArray.length; j++) {
      if (current === cleanArray[j]) duplicateIndicator = 1;
    }

    if (duplicateIndicator == 0) cleanArray.push(current);

    duplicateIndicator = 0;
  }

  return cleanArray;
}

//merge-sort
const merge = (arrayA, arrayB) => {
  let m = 0, n = 0, k = 0;
  let arrayC = [];
  while (m < arrayA.length && n < arrayB.length) {
    if (arrayA[m] < arrayB[n]) {
      arrayC[k] = arrayA[m];
      m++, k++;
    } else {
      arrayC[k] = arrayB[n];
      n++, k++;
    }
  }
  if (arrayA.length > m) {
    for (; m < arrayA.length; m++) {
      arrayC[k] = arrayA[m];
      k++;
    }
  }
  if (arrayB.length > n) {
    for (; n < arrayB.length; n++) {
      arrayC[k] = arrayB[n];
      k++;
    }
  }
  return arrayC;
}

const mergeSort = (array) => {
  if (array.length < 2) return array;
  else {
    let mid = array.length / 2;
    let arrayOne = mergeSort(array.slice(0, mid));
    let arrayTwo = mergeSort(array.slice(mid));
    return merge(arrayOne, arrayTwo);
  }
}

//create BST from sorted array
const sortedArrayToBST = (array, start, end) => {
  if (start > end) return null

  let mid = parseInt((start + end) / 2);
  let node = Node(array[mid]);

  node.left = sortedArrayToBST(array, start, mid - 1);
  node.right = sortedArrayToBST(array, mid + 1, end);

  return node;
}

/* ---------------------------aux functions---------------------------------- */

//------------------visualize a tree 
//accepts the root node of a tree
const prettyPrint = function (node, prefix = '', isLeft = true) {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

//------------------search for an element in a BST; 
//if it exists, print it. else return null
//accepts root node and value of element to be found
const findNode = (node, value) => {
  if (node === null || node.data === value) return node;
  else {
    if (node.data > value) return findNode(node.left, value);
    else return findNode(node.right, value);
  }
}

//------------------insert a node in a tree
//accepts root node and value to be inserted
const insertNode = (node, value) => {
  let newNode = Node(value);

  if (node === null) {
    node = newNode;
    return node;
  } else {
    if (node.data > value) node.left = insertNode(node.left, value);
    else if (node.data < value) node.right = insertNode(node.right, value);
  }

  return node;
}

//------------------delete a node from tree
//accepts root node and value to be deleted
const deleteNode = (node, value) => {
  if (node === null) return node;

  if (node.data > value) node.left = deleteNode(node.left, value);
  else if (node.data < value) node.right = deleteNode(node.right, value);
  else {
    if (node.left === null) return node.right;
    else if (node.right === null) return node.left;

    node.data = minValue(node.right);

    node.right = deleteNode(node.right, node.data);
  }

  return node;
}

//get inorder successor (smallest in the right subtree)
//used in deleteNode()
const minValue = (node) => {
  let minv = node.data;

  while (node.left != null) {
      minv = node.left.data;
      node = node.left;
  }

  return minv;
}

//------------------breadth first traversal
//accepts tree root node & a function as a parameter
const levelOrder = (node, func) => {
  let queue = [node];
  let nodesArray = [];

  while (queue !== []) {
    if (queue[0] === undefined) break;
    if (queue[0].left !== null) queue.push(queue[0].left);
    if (queue[0].right !== null) queue.push(queue[0].right);

    nodesArray.push(queue.shift());
  }

  if (func === undefined) {
    let dataArray = [];
    for (j = 0; j < nodesArray.length; j++) {
      dataArray.push(nodesArray[j].data);
    }
    return dataArray;
  }
  else {
    for (i = 0; i < nodesArray.length; i++) {
      func(nodesArray[i]);
    }
  }
}

//------------------preorder depth first traversal
//accepts root node & a function as a parameter
const depthFirstPreorder = (node, func) => {
  let nodesArray = [];
  
  preorder(node, nodesArray);
  
  if (func === undefined) {
    let dataArray = [];
    for (j = 0; j < nodesArray.length; j++) {
      dataArray.push(nodesArray[j].data);
    }
    return dataArray;
  }
  else {
    for (i = 0; i < nodesArray.length; i++) {
      func(nodesArray[i]);
    }
  }
}

const preorder  = (node, nodesArray) => {
  if (node === null) return;

  nodesArray.push(node);
  preorder(node.left, nodesArray);
  preorder(node.right, nodesArray);
}

//------------------inorder depth first traversal
//accepts root node & a function as a parameter
const depthFirstInorder = (node, func) => {
  let nodesArray = [];
  
  inorder(node, nodesArray);
  
  if (func === undefined) {
    let dataArray = [];
    for (j = 0; j < nodesArray.length; j++) {
      dataArray.push(nodesArray[j].data);
    }
    return dataArray;
  }
  else {
    for (i = 0; i < nodesArray.length; i++) {
      func(nodesArray[i]);
    }
  }
}

const inorder  = (node, nodesArray) => {
  if (node === null) return;

  inorder(node.left, nodesArray);
  nodesArray.push(node);
  inorder(node.right, nodesArray);
}

//------------------postorder depth first traversal
//accepts root node & a function as a parameter
const depthFirstPostorder = (node, func) => {
  let nodesArray = [];
  
  postorder(node, nodesArray);
  
  if (func === undefined) {
    let dataArray = [];
    for (j = 0; j < nodesArray.length; j++) {
      dataArray.push(nodesArray[j].data);
    }
    return dataArray;
  }
  else {
    for (i = 0; i < nodesArray.length; i++) {
      func(nodesArray[i]);
    }
  }
}

const postorder  = (node, nodesArray) => {
  if (node === null) return;

  postorder(node.left, nodesArray);
  postorder(node.right, nodesArray);
  nodesArray.push(node);
}

//-------------calculating height of node (longest path to a leaf node)
//accepts root & value of node for which height is calculated
const height = (node, value) => {
  let theNode;

  if (value !== undefined) theNode = findNode(node, value);
  else theNode = node;
  
  let nodeHeight = heightRecursion(theNode);

  return nodeHeight;
}

const heightRecursion = (node) => {
  if (node === null) return -1;

  let left = height(node.left);
  let right = height(node.right);

  let ans = Math.max(left, right) + 1;

  return ans;
}

//--------------calculating depth of node (path to root node)
//accepts root & value of node for which height is calculated
const depth = (node, value) => {
  if (node === null) return -1;

  let dist = -1;

  if (node.data === value ||
    (dist = depth(node.left, value)) >= 0 ||
    (dist = depth(node.right, value)) >= 0
  ) return dist + 1;

  return dist;
}

//check if a tree is balanced
//accepts root node
const isBalanced = (node) => {
  //calculate height of both subtrees
  const leftSubtreeHeight = height(node, node.left.data);
  const rightSubtreeHeight = height(node, node.right.data);

  //compare them
  if(Math.abs(leftSubtreeHeight - rightSubtreeHeight) <= 1)
    return "Tree is balanced.";
  else return "Tree is not balanced.";
}

//rebalance a tree
//accepts root node of tree
const rebalance = (node) => {
  //level order traversing
  let queue = [node];
  let nodesArray = [];

  while (queue !== []) {
    if (queue[0] === undefined) break;
    if (queue[0].left !== null) queue.push(queue[0].left);
    if (queue[0].right !== null) queue.push(queue[0].right);

    nodesArray.push(queue.shift());
  }

  //create array with only .data values
  let dataArray = [];
  for (j = 0; j < nodesArray.length; j++) {
    dataArray.push(nodesArray[j].data);
  }

  //create a new tree from the array
  const rebalancedTree = Tree(dataArray);
  return rebalancedTree;
}

//test array
let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

//building a tree
console.log("Building a tree");
const testTree = Tree(testArray);
prettyPrint(testTree.root);

//finding a node and logging it
console.log("finding the node with value 324")
let = foundNode = findNode(testTree.root, 324);
prettyPrint(foundNode);

//insert new node
console.log("Inserting a new node with value 600");
insertNode (testTree.root, 600);
prettyPrint(testTree.root);

//delete node
console.log("Deleting the node with value 67");
deleteNode(testTree.root, 67);
prettyPrint(testTree.root);

//levelorder testing
//console.log("Going through the tree breadth-first and printing each node")
//levelOrder(testTree.root, prettyPrint);

//preorder testing
//console.log("Preorder traversal")
//depthFirstPreorder(testTree.root, prettyPrint);

//inorder testing
//console.log("Inorder traversal")
//depthFirstInorder(testTree.root, prettyPrint);

//postorder testing
//console.log("Postorder traversal")
//let depthFirstArray = depthFirstPostorder(testTree.root);
//console.log(depthFirstArray);

//calculating height
console.log("Calculating height of node with value of 324")
let heightOfNode = height(testTree.root, 324);
console.log(heightOfNode);

//calculating depth
console.log("Calculating depth of node 324");
let depthOfNode = depth(testTree.root, 324);
console.log(depthOfNode);

//unbalancing the tree
console.log("Unbalancing the tree");
insertNode (testTree.root, 260);
insertNode (testTree.root, 254);
prettyPrint(testTree.root);
let isTreeBalanced = isBalanced(testTree.root);
console.log(isTreeBalanced);

//rebalancing the tree
console.log("Rebalancing the tree");
let rebalancedTree = rebalance(testTree.root);
prettyPrint(rebalancedTree.root);
let isNewTreeBalanced = isBalanced(rebalancedTree.root);
console.log(isNewTreeBalanced);

