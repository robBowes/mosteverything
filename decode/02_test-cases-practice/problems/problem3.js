var assert = require('assert');

// we need 7 test cases. I've provided 2.
let inputs = [
  [2, 4],
  [-3, 3],
  [null, 999],
  ['', 23],
  [9],
  [-1,1],
  [true, true],
]

let outputs = [
  6,
  0,
  undefined,
  undefined,
  undefined,
  0,
  undefined
]

/*
Make this function return the sum of the two numbers that are passed to it. If one of the numbers is not passed, or if anything other than numbers are passed, return undefined.
*/
function f(x, y) {  
    if(typeof x != 'number'||typeof y != 'number') return undefined;
    return x + y;
}

function runTest(i) {
    var expected = outputs[i];
    var actual = f(...inputs[i]);
    assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);
runTest(5);
runTest(6);
