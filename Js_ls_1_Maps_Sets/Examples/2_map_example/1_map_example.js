import brLine from "./../brLine.js";

'use strict';

const weatherMap = new Map(); // Создание map
weatherMap.set('London', '10'); // Добавление элемента {key: value}

/* Цепь добавлений */
weatherMap
        .set('Kiev', '19')
        .set('Bangor', '12')
        .set('Tallin', '23')

console.log(weatherMap);
/*
Map(4) {
  'London' => '10',
  'Kiev' => '19',
  'Bangor' => '12',
  'Tallin' => '23'
}
*/   
brLine();     
console.log(weatherMap.size); // 4

const city = weatherMap.get('Kiev');
console.log(city); // 19
brLine();

console.log(weatherMap.has('Bangor')); // true
console.log(weatherMap.has('Boston')); // false

const afterDelete = weatherMap.delete('London'); // true
const afterDeleteSecond = weatherMap.delete('London'); // false - удалять нечего

console.log(afterDelete);
console.log(afterDeleteSecond);
brLine();

weatherMap.clear();
console.log(weatherMap.size); // 0
