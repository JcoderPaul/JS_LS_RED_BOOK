import brLine from "../brLine.js";

/* Ключ всегда должен быть иммутабельным */
'use strict';

const weatherMap = new Map([
        ['London', '10'],
        ['Bangor', '15']
]); // Создание map и быстрое заполнение

console.log(weatherMap); // Map(2) { 'London' => '10', 'Bangor' => '15' }
brLine();
/* Структура объекта см. */
const objectLikeWeatherMap = {
        London: 10,
        Bangor: 15,
        Mumbay: 34
};

console.log(objectLikeWeatherMap); // { london: 10, bangor: 15, mumbay: 34 }
brLine();

/* Что позволяет нам легко превратить содержимое объекта в map */
const weatherMapTwo = new Map(Object.entries(objectLikeWeatherMap));
console.log(weatherMapTwo); // Map(3) { 'London' => 10, 'Bangor' => 15, 'Mumbay' => 34 }

