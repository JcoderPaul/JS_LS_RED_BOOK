"use strict";

const button = document.querySelector(".button");
const inner = document.querySelector(".inner");
const wrapper = document.querySelector(".wrapper");

button.addEventListener("click", function (event) {
  console.log("button");
  console.log(event.target);
  console.log(event.currentTarget);
  this.style.backgroundColor = "red";
});

button.addEventListener("mouseover", function (event) {
  console.log("button back to grey");
  this.style.backgroundColor = "rgb(63, 63, 63)";
});

inner.addEventListener("click", function (event) {
  console.log("inner");
  console.log(event.target);
  console.log(event.currentTarget);
  this.style.backgroundColor = "blue";
});

wrapper.addEventListener("click", function (event) {
  console.log("wrapper");
  console.log(event.target);
  console.log(event.currentTarget);
  this.style.backgroundColor = "purple";
});

/*
При наведении мыши и клике мы видим смену цетов 
сразу во всех блоках, и вывод в консоль сообщений:

---

button back to grey
button
<button class=​"button" style=​"background-color:​ red;​">​Press it!​</button>​
<button class=​"button" style=​"background-color:​ red;​">​Press it!​</button>​
inner
<button class=​"button" style=​"background-color:​ red;​">​Press it!​</button>​
<div class=​"inner" style=​"background-color:​ blue;​">​…​</div>​
wrapper
<button class=​"button" style=​"background-color:​ red;​">​Press it!​</button>​
<div class=​"wrapper" style=​"background-color:​ purple;​">​…​</div>​flex

---

Не сложно заметить, что цель во всех случаях одна и та же - кнопка.
Но текущая цель уже 'сама обертка' над целью (target)

---

Еще интересный эксперимент - если начать кликать мышью по остальным полям
кроме кнопки и следить в консоли за 'целью' и 'текущей целью' при 'всплытии',
и наглядной сменой цветов (у нас ведь 3-и эвента).
*/
