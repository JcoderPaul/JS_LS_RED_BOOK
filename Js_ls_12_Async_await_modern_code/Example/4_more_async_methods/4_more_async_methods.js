'use strict';

class ProductRepository {
  async getProduct() {
    const resp = await fetch("https://dummyjson.com/products");
    console.log(await resp.json());
  }
}

const repo = new ProductRepository();
repo.getProduct(); // {products: Array(30), total: 194, skip: 0, limit: 30}

/* ----- Асинхронная стрелочная функция ----- */
const asyncArrowFunction = async () => {
  const resp = await fetch("https://dummyjson.com/products");
  console.log(await resp.json());
};

asyncArrowFunction(); // {products: Array(30), total: 194, skip: 0, limit: 30}