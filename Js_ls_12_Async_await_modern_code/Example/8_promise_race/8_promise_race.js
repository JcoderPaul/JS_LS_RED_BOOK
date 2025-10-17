'use strict';

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
  /* Принимает и обрабатывает массив промисов, не боится ошибок, возвращает самый шустрый */
  const res = await Promise.race([
    getOneProduct(3),
    getOneProduct(42),
    23,
    getOneProduct(72),
    getOneProduct(-3), // GET https://dummyjson.com/product/-3 404 (Not Found)
    getOneProduct(63),
  ]);
  console.log(res); 
  /* 
  23 будет первым
  */
}

mainParallel();