'use strict';

/*
        Получить среднюю цену 30 товаров из запроса API
        https://dummyjson.com/products/
*/

const req = new XMLHttpRequest();
req.open('GET', `https://dummyjson.com/products`);
req.send();

req.addEventListener('load', function() {
        const{ products } = JSON.parse(this.responseText);
        console.log(products);
        const sum = products.reduce((acc, p) => acc += p.price, 0);
        console.log(sum / products.length); // 219.24999999999986
});