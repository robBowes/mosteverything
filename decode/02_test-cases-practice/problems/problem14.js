var assert = require('assert');

// we need 5 test cases. 
let inputs = [
  'Sometimes the most clever thing to say is nothing at all.',
  'Lorem ipsumos dolor sit amet consectetur adipisicing elit. Magni quisquam',
  null,
  true,
  undefined
]

let outputs = [
    'Sometimes the most clever thing to say i\ns nothing at all.',
    'Lorem ipsumos dolor sit amet consectetur\nadipisicing elit. Magni quisquam',
    undefined,
    undefined,
    undefined
]

/*
Make this function return the input string wrapped to 40 characters per line. 
This means you'll have to insert a newline \n character after every 40 characters in the input string. 
If the next character after a cut is a space, then do not display it. 

For example with the input:

Lorem ipsumos dolor sit amet consectetur adipisicing elit. Magni quisquam

the output would be:

Lorem ipsumos dolor sit amet consectetur
adipisicing elit. Magni quisquam

instead of:

Lorem ipsumos dolor sit amet consectetur
 adipisicing elit. Magni quisquam

 even though there is a space before the a in adipisicing
*/
function f(str) {
    if (typeof str != 'string') return undefined;
    let newStr = '';
    for (let i = 0; i < Math.ceil(str.length/40);i++) {
        let nextLine = str.substr(i*40, i*40+40) + '\n';
        if (nextLine[0].match(' ')) nextLine = nextLine.substr(1);
        newStr+=nextLine;
    }
    return newStr.substr(0,newStr.length-1);
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

