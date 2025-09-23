import brLine from "../brLine.js";

/* Ключ всегда должен быть иммутабельным */
'use strict';

const weatherMap = new Map([
        ['London', '10'],
        ['Bangor', '15'],
        ['Paris', '23'],
        ['Mosсow','21']
]); // Создание map и быстрое заполнение

for(const entry of weatherMap){
        console.log(entry);
}
/* 
[ 'London', '10' ]
[ 'Bangor', '15' ]
[ 'Paris', '23' ]
[ 'Mosсow', '21' ]
*/

brLine();
/* Делаем из MAP снова массив */
const weatherArray = [...weatherMap];
console.log(weatherArray);
/*
[
  [ 'London', '10' ],
  [ 'Bangor', '15' ],
  [ 'Paris', '23' ],
  [ 'Mosсow', '21' ]
]
*/
console.log(weatherArray.length); // 4

console.log(weatherMap.keys()); // [Map Iterator] { 'London', 'Bangor', 'Paris', 'Mosсow' }
console.log(weatherMap.values()); // [Map Iterator] { '10', '15', '23', '21' }
/* И ключи и значения можно выделить в самостоятельный массив */
