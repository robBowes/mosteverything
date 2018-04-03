var assert = require('assert');

// we need 5 test cases. 
let inputs = [
  [2, 7],
  [true, false],
  [null, 1],
  [undefined, 1],
  [10,10],
]

let outputs = [
  14,
  undefined,
  undefined,
  undefined,
  100,
]

/*
Make this function return the product of the two numbers that are passed to it. If one of the numbers is not passed, or if anything other than numbers are passed, return undefined.
*/
function f(arr) {
  let [x,y] = arr;
  if (typeof x!= 'number'|| typeof y != 'number') return undefined;
  return x*y;
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
