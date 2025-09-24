'use strict';

function isEven(num){
        return num % 2 != 0 ? false : true;
}

let one = 1;
let two = 2;
let hm = 231;
let negTwo = -2;

console.log(isEven(one)); // false
console.log(isEven(two)); // true
console.log(isEven(hm)); // false
console.log(isEven(negTwo)); // true