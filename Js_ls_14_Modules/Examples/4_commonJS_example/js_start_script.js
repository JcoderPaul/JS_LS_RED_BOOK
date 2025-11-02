'use strict';

const { add, sub } = require('./js_calc.js')

const resAdd = add(8, 3);
const resSub = sub(8, 3);

console.log(resAdd); // 11
console.log(resSub); // 5

