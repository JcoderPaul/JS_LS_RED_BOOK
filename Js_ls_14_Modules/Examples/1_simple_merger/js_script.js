'use strict';

/* 
Если мы объявим переменную с одинаковым именем в обоих скриптах подключенных к
index.html, то будет ошибка: 
const a = 1; // Identifier 'a' has already been declared (at js_script.js:1:1)
*/

/* 
Теперь чтобы использовать функции из js_calc.js необходимо соблюcти порядок
подключения скриптов в index.html, нам повезло и js_calc идет раньше js_script,
в противном случае была бы ошибка:

js_script.js:14 Uncaught ReferenceError: add is not defined at js_script.js:14:9

Также возникает вопрос - откуда эти методы прилетели?
*/
console.log(add(5, 3)); // 8
console.log(sub(5, 3)); // 2
