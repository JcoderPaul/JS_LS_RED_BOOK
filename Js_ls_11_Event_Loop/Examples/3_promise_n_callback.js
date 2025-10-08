'use strict';

function timeOut(sec) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000 * sec);
  });
}

const sec = 1;

timeOut(sec)
.then(() => {
        console.log(sec + " sec."); 
        return timeOut(sec); // Promise всегда обещает, что-то вернуть!!!
})
.then(() => {
        console.log(sec + " sec."); 
        return timeOut(sec);
});

/* Мы получаем цепочку callback функций на promis-ах, красиво и линейно */