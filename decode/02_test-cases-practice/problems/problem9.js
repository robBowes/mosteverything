var assert = require('assert');

// we need 5 test cases. 
let inputs = [
  'hello from Montreal',
  'the rat has two pie',
  true,
  undefined,
  null
]

let outputs = [
  'Montreal',
  'pie',
  undefined,
  undefined,
  undefined
]

/*
Make this function return the longest word in the input string. If the input string is empty then return an empty string.
If multiple words have the same length, return the last one that matches.
*/
function f(str) {
    if (typeof str != 'string') return undefined;    
    return str.split(' ').reduce((acc, el)=>acc.length>el.length?acc:el,'');
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

