'use strict';

/* Сделать функцию myFetch, которая выполняет внутри XMLHttpRequest */

function myFetch(url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("GET", url);
    req.send();

    req.addEventListener("load", function () {
      if(this.status > 400 ) {
        reject(new Error(this.status));
      }  
      resolve(this.responseText);
    });

    req.addEventListener("error", function () {
      reject(new Error(this.status));
    });

    req.addEventListener("timeout", function () {
      reject(new Error("Timeout"));
    });
  });
}

myFetch('https://dummyjson.com/products')
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

/* 
И если все хорошо, мы видим нераспарсеный ответ, если 
же мы внесем ошибку в url мы увидим обработанную ошибку 
в консоли (со статусом или по timeout-у).
*/