'use strict';

console.log(document); // #document - в консоли видим структуру нашей index.html

console.log(document.head); // head

const elem = document.querySelector('.wrapper');
console.log(elem); // <div class="wrapper">Хм.</div>

const elem_2 = document.querySelectorAll('.wrapper');
console.log(elem_2); // NodeList [div.wrapper] - и он один, т.к. уникален

const elem_3 = document.querySelectorAll('meta');
console.log(elem_3); // NodeList(3) [meta, meta, meta]

/* ----- Добавляем элемент ----- */

const button = document.createElement('button');
button.innerHTML = 'Test';

const button_2 = document.createElement('button');
button_2.innerHTML = 'Test_2_button';

const button_3 = document.createElement('button');
button_3.innerHTML = 'Test_3_button';

elem.append(button);
elem.prepend(button_2);
elem.after(button_3)

/* ----- Удаление элемента ----- */
function remove(){
        elem.remove();
}

