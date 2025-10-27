"use strict";

const wrapper = document.querySelector(".wrapper");

for(let i = 0; i < 100; i++ ){
      const el = document.createElement('div');
      el.innerHTML = `Пользователь id - ${i}`;
      /* 
      Симитируем удаление пользователя при клике по нему: 
      
      el.addEventListener('click', () => {
             
            При нажатии на поле user-a в консоли появиться 
            сообщение (но с экрана ничего не исчезнет) 
            
            console.log(`Deleted user with id - ${i}`);
      });

      И это не эффективно т.к. функций слушателей слишком много. 
      Лучше использовать делегирование слушания события.
      */

      /* Добавим атрибут и обратимся к нему в слушателе, см. ниже */
      el.setAttribute('data-id', i);
      wrapper.append(el);
}

wrapper.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id')
      console.log(id);
      /* Симулируем удаление */
      console.log(`Deleted user with id - ${id}`);
});

