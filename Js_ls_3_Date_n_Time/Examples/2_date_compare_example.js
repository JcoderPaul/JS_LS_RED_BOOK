'use strict';

const first = new Date(2023, 10, 5);
const second = new Date(2023, 10, 4);
const third  = new Date(2023, 10, 5);

console.log(first < second); // false

/* Tak не работает, т.к. объекты сравниваются по ... */
console.log(typeof first); // object
console.log(typeof third); // object

console.log(first == third); // false
console.log(first === third); // false

/* Делается так: */
let tm1 = first.getTime();
let tm2 = third.getTime();

console.log(typeof tm1); // number
console.log(typeof tm2); // number

console.log(first.getTime == third.getTime); // true - сравниваем примитивы
console.log(first.getTime === third.getTime); // true

/* Или так: */
console.log(Number(first) == Number(third)); // true
console.log(Number(first) === Number(third)); // true
console.log(Number(first) === Number(second)); // false