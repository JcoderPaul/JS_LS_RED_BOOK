'use strict';

async function getProductAsnc() {
  try {
    const productsResponse = await fetch("https://errorpage.com/products"); // Внесем ошибку
    const productsRsp = await productsResponse.json();
    console.log(productsRsp);

    const productResponse = await fetch(
      "https://dummyjson.com/products/" + productsRsp.products[0].id
    );

    const product = await productResponse.json();
    console.log(product);
  } catch (err) {
    console.log(err); // 3_try_catch_with_async_await.js:16 TypeError: Failed to fetch
  } finally {
        console.log('Exit and closed!'); // Exit and closed!
  }
}

getProductAsnc(); 
console.log('End async/await'); // End async/await