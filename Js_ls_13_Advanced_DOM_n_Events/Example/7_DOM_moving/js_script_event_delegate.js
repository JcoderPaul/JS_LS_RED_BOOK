"use strict";

/* Поиск вниз по DOM дереву */
const wrapper = document.querySelector('.wrapper');
console.log(wrapper);

const inner = document.querySelector('.inner');
console.log(inner);

const button = document.querySelector('.button');
console.log(button);

console.log(inner.childNodes); // NodeList(7) [text, button.button, text, button.button, text, button.button, text]
/*
0: text
1: button.button
2: text
3: button.button
4: text
5: button.button
6: text
length: 7
*/
console.log(inner.children); // HTMLCollection(3) [button.button, button.button, button.button]
/*
0: button.button
1: button.button
2: button.button
length: 3
*/
console.log(inner.parentElement);
console.log(inner.parentNode);
/* Вывод в консоль: <div class="wrapper"> ... </div> */

/* 
Поиск вверх по DOM дереву 

Находим ближайшего родителя с конкр. названием 
*/
console.log(button.closest('.wrapper'));

/* Поиск элементов на том же уровне */
console.log(button.previousElementSibling); // null
console.log(button.previousSibling); // #text
console.log(button.nextElementSibling); // <button class="button">Press it now!</button>
console.log(button.nextSibling); // #text

/* Поиск от ближайших элементов */
const inner2 = wrapper.querySelector('.inner');
console.log(inner); // <div class="inner">...</div> или div.inner

const button2 = inner.querySelector('.button');
console.log(button); // <button class="button">Press it!</button> или button.button