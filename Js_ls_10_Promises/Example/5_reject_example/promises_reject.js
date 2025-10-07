'use strict';

/* Запускаем LiveServer в index.html */

/* Сделаем ошибку в url и → ERR_NAME_NOT_RESOLVED */
const res = fetch("https://pumijson.com/products") // GET https://pumijson.com/products net::ERR_NAME_NOT_RESOLVED
  .then(response => {
    response.json()
  }, 
  error => console.log(error) // TypeError: Failed to fetch
);

/* Чаще применяют catch */
const resTwo = fetch("https://pumijson.com/products") // GET https://pumijson.com/products net::ERR_NAME_NOT_RESOLVED
  .then(response => response.json())
  .then(({ products }) => {
    console.log(products);
    fetch('https://dummyjson.com/products/' + products[0].id);
  })
  .catch(error => console.log(error));
  /* 
  Тут мы тоже получим TypeError: Failed to fetch, но, после 
  первой ошибки - код сразу провалится в обработчик catch 
  */


