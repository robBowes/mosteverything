var assert = require('assert');

// we need 5 test cases. 
let inputs = [
  'hello',
  'how are you',
  true,
  null,
  ['a','b','c']
]

let outputs = [
  'olleh',
  'uoy era woh',
  undefined,
  undefined,
  undefined
]

/*
Make this function return the input string, reversed. For example "hello" would return "olleh" and "how are you" would return "uoy era woh".
You must use a for loop for this exercise.
*/
function f(str) {
    if (typeof str != 'string') return undefined;
    let newStr= '';
    for (let i = str.length-1; i >= 0; i--) {
        newStr+=str[i];
    }
    return newStr;
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

