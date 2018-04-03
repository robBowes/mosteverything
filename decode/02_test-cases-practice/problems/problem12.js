var assert = require('assert');

// we need 5 test cases. 
let inputs = [
  [[0,1,2,3], [1,2,3,4,5]],
  [[1,2,3], [1,2,3]],
  [2,3],
  [['apple', 'orange'],['apple', 'banana']],
  [undefined, ['apple']]
]

let outputs = [
  [0,4,5],
  [],
  undefined,
  ['orange', 'banana'],
  undefined
]

/*
Make this function return the elements that are unique to array1 and array2.
If there are no unique elements return an empty array.
If the inputs are anything other than arrays, return undefined. 
For example:

uniqueElements([0,1,2,3], [1,3,4,5]); // [0,4,5]
uniqueElements([1,2,3], [1,2,3]); // []
uniqueElements(2,3); // undefined, not arrays
*/
function f(args) {
    let [arr1, arr2] = args;
    if (!Array.isArray(arr1)|| !Array.isArray(arr2)) return undefined; 
    return [...arr1.filter(el=>arr2.indexOf(el)<0), ...arr2.filter(el=>arr1.indexOf(el)<0)];
}

function runTest(i) {
    if(i > inputs.length) throw new Error("You do not have enough test cases");
    var expected = outputs[i];
    var actual = f(inputs[i]);
    assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);

