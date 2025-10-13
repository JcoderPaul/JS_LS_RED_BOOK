'use strict';

/* Асинхронность на promise */
function getProductPrm() {
        fetch('https://dummyjson.com/products')
        .then(resp => resp.json())
        .then(data => console.log(data));
}

getProductPrm(); // {products: Array(30), total: 194, skip: 0, limit: 30}
console.log('End prm.'); // End prm.

/* Асинхронная функция на async/await */
async function getProductAsnc() {
        const resp = await fetch('https://dummyjson.com/products');
        const data = await resp.json();
        console.log(data);
}

getProductAsnc(); // {products: Array(30), total: 194, skip: 0, limit: 30}
console.log('End asnc.'); // End asnc.