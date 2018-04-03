var assert = require('assert');

// we need 5 test cases. 
let inputs = [
  'radar',
  'asdfasdf',
  null,
  'Are we not pure? “No, sir!” Panama’s moody Noriega brags. “It is garbage!” Irony dooms a man—a prisoner up to new era.',
  true
]

let outputs = [
  true,
  false,
  false,
  true,
  false
]

/*
Make this function return true if the input string is a palindrome, and false otherwise. A palindrome is simply a string that is the same if you reverse it.

RADAR -> Yes
JAVASCRIPT -> No
*/
function f(str) {
    if (typeof str !== 'string') return false;
    let onlyChars = str.toLowerCase().match(/[A-Za-z0-9]/g)    
    return onlyChars.every((el,i,arr)=>{
        return el==arr[arr.length-1-i];
    }); 
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

