'use strict';

/* Точность */
console.log(10 === 10.0); // true
console.log(0.1 + 0.2 === 0.3); // Уже false

console.log(Number('10s')); // NaN
console.log(+'20'); // 20

console.log(Number.parseInt('11', 10)); // 11
console.log(Number.parseInt('11 sec', 10)); // 11
console.log(Number.parseInt('sek 11', 10)); // NaN

console.log(Number.parseFloat('11.5', 10)); // 11.5
console.log(Number.parseFloat('11.5 sec', 10)); // 11.5
console.log(Number.parseFloat('sek 11.5', 10)); // NaN

/* А число ли? */
console.log(Number.isNaN(Number('10dbf6'))); // true - это не число (Not a Number)

/* Конечное ли число? */
console.log(Number.isNaN(10 / 0)); // !!! TRUE !!! - но это бесконечность Infinity

console.log(Number.isFinite(10 / 0)); // false - т.к. число не конечное
console.log(Number.isFinite(10)); // true





