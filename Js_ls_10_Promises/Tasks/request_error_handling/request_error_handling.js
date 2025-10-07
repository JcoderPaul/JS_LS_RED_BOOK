'use strict';

/*
Сделать функцию, которая принимает строку и текст ошибки
и возвращает Promise с JSON из тела запроса
*/

function getData(url, errorMessage) {
  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw new Error(`${errorMessage} => status: ${resp.status}`);
    }
    return resp.json();
  });
}

/* Вносим ошибку см. что получилось */
getData('https://dummyjson.com/productss', 'Can not get product list!')
.then(({ products }) => {
  return getData('https://dummyjson.com/products/' + products[0].id, 'Can not find product!')
})
.then(data => console.log(data))
.catch(error => {
  const errElem = document.querySelector('.erMsg');
  errElem.innerHTML = error.message;
});