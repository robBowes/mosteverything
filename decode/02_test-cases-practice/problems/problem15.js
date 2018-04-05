var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    'Sometimes the most clever thing to say is nothing at all.',
    'Lorem ipsumos dolor sit amet consectetur adipisicing elit. Magni quisquam',
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    true,
    undefined
  ]
  
  let outputs = [
      'Sometimes the most clever thing to say i\ns nothing at all.',
      'Lorem ipsumos dolor sit amet consectetur\nadipisicing elit. Magni quisquam',
      "Lorem ipsum dolor sit amet, consectetur \nadipiscing elit, sed do eiusmod tempor i\nncididunt",
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
    return str
    .split('')
    .map((el,i)=>{
        if ((i+1)%40==0 && i !=0) return el + '\n';
        if (i%40==0) return el.replace(/\s/,'');
        return el;
    })
    .join('');
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

