'use strict';

const constNum = new Number(23); // Конструирование экземпляра класса 'в динамике'
const maxSafeNum = Number.MAX_SAFE_INTEGER // Обращение к статическому свойству

console.log(constNum.toString()); //23
console.log(maxSafeNum); //9007199254740991

const myArr = new Array(23, 34, 22, -1); // Конструирование массива при помощи конструктора
const myArrTwo = Array.from(myArr); // Обращение к статическому свойству для создания массива

console.log(myArr); // [ 23, 34, 22, -1 ]
console.log(myArrTwo); // [ 23, 34, 22, -1 ]
console.log(myArr === myArrTwo); // false - ссылки на разные объекты
