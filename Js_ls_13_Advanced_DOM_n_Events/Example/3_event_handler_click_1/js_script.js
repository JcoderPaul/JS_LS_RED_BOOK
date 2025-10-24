/* Пример подписки/отписки на событие клик мыши (как простое и наглядное) */

"use strict";

/* 
Преимущество подписки на 'событие - event' - неограниченное 
количество обработчиков. Тут, мы к одному событию - клик мыши 
по кнопке, привязали два обработчика, что видно в консоли.  
*/
const button = document.querySelector('.button');

button.addEventListener('click', (event) => {
      console.log('event_1'); // event_1
});
button.addEventListener('click', (event) => {
      console.log('event_2'); // event_2
});

/* Вместо стрелочной функции мы можем передать функцию */
function eventReaction(event) {
      console.log('event_3');
}

/* После первого клика список из event_1, event_2, event_3 */
button.addEventListener('click', eventReaction);
/* После второго клика список из event_1, event_2 */
button.addEventListener('click', (event) => {
      button.removeEventListener('click', eventReaction);
});