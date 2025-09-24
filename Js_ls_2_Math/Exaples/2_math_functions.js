import brLine from "./../../Js_ls_1_Maps_Sets/Examples/brLine.js";
'use strict';

console.log(Math.sqrt(36)); // 6 - корень из 36
console.log(36 ** (1/2)); // 6 - степень 1/2 - это тоже, что и корень квадратный (внимательно следим за скобками)
console.log(Math.cbrt(27)); // 3 - корень третьей степени
console.log(27 ** (1/3)); // 3
console.log(16 ** (1/4)); // 2
brLine();

console.log(Math.sign(-100)); // -1 - получаем 'знак' числа
console.log(Math.sign(100)); // 1

console.log(Math.sign(-10)); // 10 - по модулю
console.log(Math.sign(10)); // 10

console.log(Math.max(1, -3, 12, -23, 0)); // 12
console.log(Math.min(1, -3, 12, -23, 0)); // -23
brLine();

console.log(Math.max(1, -3, 12, -23, true, 0)); // 12
console.log(Math.max(1, -3, 12, -23, 'adc', 0)); // NaN
console.log(Math.min(1, -3, 12, -23, true, 0)); // -23
console.log(Math.min(1, -3, 12, -23, 'adc', 0)); // NaN
brLine();

/* Работа метода max или min с массивом */
const arr = [2, 45, -2, 5, -12];
const maxOfArr = Math.max(...arr);
const minOfArr = Math.min(...arr);

console.log(maxOfArr); // 45
console.log(minOfArr); // -12
brLine();

/* Псевдо случайные числа */
console.log(Math.random());



