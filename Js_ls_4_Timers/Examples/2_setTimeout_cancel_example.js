'use strict';

const timerOne = setTimeout((a, b) => console.log(a + b), 1000, 10, 15); // Ничего не увидим т.к. отменили
const timerTwo = setTimeout((a, b) => console.log(a - b), 2000, 10, 15); 

console.log(timerOne);
console.log(timerTwo); // -5

clearTimeout(timerOne); // Отменяем таймер