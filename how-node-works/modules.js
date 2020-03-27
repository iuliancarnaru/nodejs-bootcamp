console.log(arguments);
console.log(require('module').wrapper);

/* 
'(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
*/

// module.exports
const dummyCalc = require('./test-module');
const calc1 = new dummyCalc();

console.log(calc1.add(4, 5));

// exports
// const calc2 = require('./test-module2');
// console.log(calc2.add(5, 6));

const { add, multiply, divide } = require('./test-module2');
console.log(add(5, 6));
console.log(multiply(5, 6));

// caching
require('./test-module3')();
require('./test-module3')();
require('./test-module3')();
