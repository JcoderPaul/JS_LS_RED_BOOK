'use strict';

/* ----- Вариант последовательного запроса и вывода данных ----- */
async function getAllProducts() {
  const resp = await fetch('https://dummyjson.com/products');
  return resp.json();
}

async function getOneProduct(id) {
  const resp = await fetch('https://dummyjson.com/product/' + id);
  return resp.json();
}

/* ----- Вариант параллельного запроса и вывода данных ----- */
async function mainParallel() {
  /* Принимает и обрабатывает массив промисов и БОИТСЯ ошибок */
  const resAll = await Promise.all([
    getOneProduct(1),
    getOneProduct(2),
    getOneProduct(-1), // Такого элемента нет - бросит ошибку и все ...
  ]);
  console.log(resAll); // GET https://dummyjson.com/product/-1 404 (Not Found)

  /* Принимает и обрабатывает массив промисов и не боится ошибок */
  const resAllSettled = await Promise.allSettled([
    getOneProduct(1),
    getOneProduct(2),
    getOneProduct(-1),
  ]);
  console.log(res); 
  /* 
  (3)[{…}, {…}, {…}]

  0: {id: 1, title: 'Essence Mascara Lash Princess', …}
  1: {id: 2, title: 'Eyeshadow Palette with Mirror', …}
  2: {message: "Product with id '-1' not found"}
  length: 3
  */
}

mainParallel();