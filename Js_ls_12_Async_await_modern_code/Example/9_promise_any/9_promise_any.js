'use strict';

async function getAllProducts() {
  const resp = await fetch('https://dummyjson.com/products');
  return resp.json();
}

async function getOneProduct(id) {
  const resp = await fetch('https://dummyjson.com/product/' + id);
  if(!resp.ok){
    throw new Error('Wrong id');
  }
  return resp.json();
}

/* ----- Вариант параллельного запроса и вывода данных ----- */
async function mainParallel() {
  /* Принимает и обрабатывает массив промисов, не боится ошибок, возвращает самый шустрый */
  const anyRes = await Promise.any([
    getOneProduct(-3),
    getOneProduct(-14),
    getOneProduct(2),
    getOneProduct(-3),
  ]);
  console.log(anyRes); 
  /* {id: 2, title: 'Eyeshadow Palette with Mirror',…} */
}

mainParallel();