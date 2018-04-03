var assert = require('assert');

// we need 5 test cases. 
let inputs = [
  'hello from montreal',
  'mOrE fIsH In mUddY WatEr',
  '111',
  false,
  null
]

let outputs = [
  'Hello From Montreal',
  'More Fish In Muddy Water',
  '111',
  undefined,
  undefined
]

/*
Make this function return the input string, capitalized. You must use a for loop. For example:

f("hello world"); // Hello World
f("ALL YOUR BASE ARE BELONG"); // All Your Base Are Belong

*/
function f(str) {
    if (typeof str != 'string') return undefined;
    return str
    .split(' ')
    .map(word=>{
        let newWord = '';
        for (let i = 0; i < word.length; i++) {
            if (i==0) newWord+= word[i].toUpperCase();                                
            else newWord+= word[i].toLowerCase();
        } 
        return newWord;
    }).join(' ');
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

