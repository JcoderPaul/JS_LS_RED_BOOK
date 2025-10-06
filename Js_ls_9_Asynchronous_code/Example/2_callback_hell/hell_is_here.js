'use strict';

/* 
Допустим мы получили только список идентификаторов,
и теперь нам нужно поэлементно вытаскивать данные 
из БД (API)
*/

const req = new XMLHttpRequest();
req.open('GET', `https://dummyjson.com/products`);
req.send();

req.addEventListener("load", function () {
  const { products } = JSON.parse(this.responseText);
  console.log(products); // Сначала получили список продуктов

  const req = new XMLHttpRequest();
  req.open("GET", `https://dummyjson.com/products/` + products[0].id); // Запросили по ID
  req.send();

  req.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    console.log(data);
    /* И так далее если нам нужны еще вложенные данные и код будет сползать вправо */
  });
});