'use strict';

/* Запускаем LiveServer в HTML */
const res = fetch('https://dummyjson.com/products/1');
console.log(res); // В консоли разработчика видим Promise {<pending>} с содержимым ответа