'use strict';

/*
Сделать запрос на https://dummyjson.com/products/categories
Получить список каиегорий и отобразить <select> выбора категорий.
*/

function createSelect(arr) {
  const el = document.querySelector(".filter");
  /* Формируем вставку на html страницу */
  el.innerHTML = `<select> 
      ${arr.map(arrElem => `<option value=${arrElem.name}>${arrElem.name}</option>}`)} 
    </select>`;
}

function getCategory() {
  fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(data => createSelect(data))
    .catch(err => console.error(`Error: ${err}`))
}

/* 
Из fetch после парсинга получаем что-то вроде:
[
{"slug":"beauty","name":"Beauty","url":"https://dummyjson.com/products/category/beauty"},
{"slug":"fragrances","name":"Fragrances","url":"https://dummyjson.com/products/category/fragrances"},
 ...
] 

Этот массив будет передан в createSelect(), где нам 
нужны только названия категорий - 'name', используем.
*/

getCategory(); // На выходе, в браузере видим выпадающее меню с категориями. 