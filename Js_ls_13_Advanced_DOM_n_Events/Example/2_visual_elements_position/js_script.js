"use strict";

function generate(event) {
  console.log(`X offset: ${window.pageXOffset}`); // 0
  console.log(`Y offset: ${window.pageYOffset}`); // 0

  /* 'Играя' шириной и высотой экрана отображения браузера мы будет получать разные значения */
  console.log(`clientWidth: ${document.documentElement.clientWidth}`); //960
  console.log(`clientHeight: ${document.documentElement.clientHeight}`); // 916

  /* Посмотрим где распологается кнопка Generate */
  console.log(event.target.getBoundingClientRect()); // DOMRect {x: 419.46875, y: 28, width: 95.0625, height: 41, top: 28, …}
  /*
        bottom: 69
        height: 41
        left: 419.46875
        right: 514.53125
        top: 28
        width: 95.0625
        x: 419.46875
        y: 28
  */

  /* См. где находится элемент 'down' */
  const elem = document.querySelector(".down");
  const rect = elem.getBoundingClientRect()
  console.log(rect); // {x: 8, y: 749, width: 918, height: 34, top: 749, …}
  /*
        bottom: 783
        height: 34
        left: 8
        right: 926
        top: 749
        width: 918
        x: 8
        y: 749
   */

  /* 
  Добавим 'динамики' - при нажатии на кнопку Generate 'курсор' 
  будет прыгать (экран будет съезжать) к надписи down
  */      
  window.scrollTo({
        left: window.pageXOffset + rect.left,
        top: window.pageYOffset + rect.top,
        behavior: 'smooth' // делать скрол плавно
  });      
}
