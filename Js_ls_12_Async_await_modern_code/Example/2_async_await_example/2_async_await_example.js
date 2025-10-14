'use strict';

async function getProductAsnc() {
        const productsResponse = await fetch('https://dummyjson.com/products');
        const productsRsp = await productsResponse.json(); // Получаем ответ и парсим (ответ содерэим массив 'products')
        const prdArr = productsRsp.products; // Извлекаем массив
        console.log(prdArr); // (30) [{…}, {…}, …]

        /* 
        Можно 3-и верхних строки заменить на деструктуризацию, 
        т.к. мы знаем имя массива в response:
        
        const { products } = await productsResponse.json();
        console.log(products);
        */

        /* 
        Можно конечно явно не извлекать массив и тогда запрос будет:
        
        const productResponse = await fetch('https://dummyjson.com/products/' + productsRsp.products[0].id);
        */
        const productResponse = await fetch('https://dummyjson.com/products/' + prdArr[0].id);
        
        /*
        И тогда запрос к одному товару будет:

        const productDestructuring = await fetch('https://dummyjson.com/products/' + products[0].id);
        */
        
        const product = await productResponse.json();
        console.log(product); // {id: 1, title: 'Essence Mascara Lash Princess', …}
}

getProductAsnc(); 
console.log('End async/await'); // End async/await