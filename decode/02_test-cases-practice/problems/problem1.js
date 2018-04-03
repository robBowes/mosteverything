var assert = require('assert');

// we need 5 test cases. I provided 1 input
let inputs = [
  "",
  'a',
  'alskjdfasf',
  'errgegsd',
  '       '
]

let outputs = [
  undefined,
  'a',
  'a',
  'e',
  ' '
]

// Make this function return the first letter of the string that is passed to it. If the string does not have a first letter, return undefined
function f(str) {
    return str[0];
}

function runTest(i) {
    var expected = outputs[i];
    var actual = f(inputs[i]);
    assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);
