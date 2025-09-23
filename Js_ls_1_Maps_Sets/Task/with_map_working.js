'use strict';

/* Задача - Необходимо поменять местами ключи и значения в предложенной MAP */
let weatherMap = new Map([
        ['London', 10],
        ['Moscow', 7],
        ['Paris', 14]
]);
console.log(weatherMap);

weatherMap = new Map([...weatherMap].map(elem => elem.reverse()));
console.log(weatherMap)