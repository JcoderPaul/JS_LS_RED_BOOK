/* Пример подписки/отписки на событие наведение мыши (как простое и наглядное) */

"use strict";

/* 
Преимущество подписки на 'событие - event' - неограниченное 
количество обработчиков. Тут, мы к одному событию - клик мыши 
по кнопке, привязали два обработчика, что видно в консоли.  
*/
const button = document.querySelector('.button');

/* Вместо стрелочной функции мы можем передать функцию */
function eventReaction(event) {
      console.log('event_mouse_click_1');
}

/* 
После первого наведения мыши на кнопку и нажатия на нее - 
в консоли список из event_mouse_over_2, event_mouse_click_1,
т.е. реакция на два действия.
*/
button.addEventListener('click', eventReaction);
button.addEventListener('mouseover', () => {
      console.log('event_mouse_over_2');
});
/* 
После второго нажатия и последующих наведений - в консоли только 
появление сообщения 'event_mouse_over_2' (со счетчиком наведений)
*/
button.addEventListener('click', (event) => {
      button.removeEventListener('click', eventReaction);
});