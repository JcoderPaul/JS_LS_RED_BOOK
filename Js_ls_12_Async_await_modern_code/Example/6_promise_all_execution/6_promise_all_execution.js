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

async function mainSequential() {
  const data = await getAllProducts();
  for(const product of data.products) {
    const res = await getOneProduct(product.id);
    console.log(res);
  }
}

 mainSequential();

/* ----- Вариант параллельного запроса и вывода данных ----- */
async function mainParallel() {
  const data = await getAllProducts();
  /* Принимает и обрабатывает массив промисов */
  const res = await Promise.all(data.products.map(product => getOneProduct(product.id)));
  console.log(res);
}

mainParallel();