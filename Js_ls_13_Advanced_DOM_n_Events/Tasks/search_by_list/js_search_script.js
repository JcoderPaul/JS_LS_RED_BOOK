"use strict";

/*
Создать динамически N элементов с текстом и поле для поиска.
При вводе в поле, выделять элементы, которые содержат введенный текст.
*/

const wrapper = document.querySelector('.wrapper');

for (let i = 0; i < 100; i++) {
  const el = document.createElement('div');
  el.innerHTML = `Элемент - ${i}`;
  wrapper.append(el);
}

function search(event) {
  const inputVal = event.target.value;
  console.log(inputVal);
  
  const arr = [...wrapper.children];
  console.log(arr);

  for (const el of arr) {
    if (el.innerHTML.includes(inputVal)) {
      el.classList.add('yellow');
      continue;
    }
    el.classList.remove('yellow');
  }
}