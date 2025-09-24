'use strict'

function brLine(){
        console.log("_____________________________________");
};

console.log(Math.trunc(3.74)); // 3
console.log(Math.trunc(3.25)); // 3
console.log(Math.trunc(-3.72)); // -3
console.log(Math.trunc(0.9122)); // 0
brLine();

console.log(Math.trunc("abc")); // NaN
brLine();

console.log(Math.trunc(NaN)); // NaN
console.log(Math.trunc(Infinity)); // Infinity
console.log(Math.trunc(0)); // 0
brLine();

/* Не мутирует данные */
let numToTrunc = 5.345;
console.log(Math.trunc(numToTrunc)); // 5
console.log(numToTrunc); // 5.345
brLine();

/* toFixed - всегда возвращает строку - это нужно помнить */
let pi = 3.14159;
const piToFixed_1 = pi.toFixed(2);
const piToFixed_2 = pi.toFixed(0);
const piToFixed_3 = (-pi).toFixed(1);

console.log(piToFixed_1); // "3.14"
console.log(typeof piToFixed_1); // string

console.log(piToFixed_2); // "3"
console.log(typeof piToFixed_2); // string

console.log(piToFixed_3); // "-3.1"
console.log(typeof piToFixed_3); // string


