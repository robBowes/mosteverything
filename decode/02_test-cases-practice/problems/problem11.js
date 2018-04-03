var assert = require('assert');

// we need 5 test cases. 
let inputs = [
  [],
  [null, undefined,false],
  [1,2,3,null],
  [5,10,15],
  [[1],[10], 1]
]

let outputs = [
  0,
  0,
  6,
  30,
  1
]

/*
Make this function return the sum of all the numbers in the input array. If any element in the array is not a number, skip it. If the array is empty, return zero.
*/
function f(arr) {
    let cleanArr = arr.filter(el=>typeof el == 'number');
    if (cleanArr.length ==0) return 0;
    return cleanArr.reduce((acc,el)=>acc+el);
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

