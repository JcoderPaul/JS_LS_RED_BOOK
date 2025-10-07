'use strict';

/* Запускаем LiveServer в index.html */
const res = fetch("https://dummyjson.com/products/1")
  .then((response) => {
    console.log(response);
    return response.json();
  }) // Response {type: 'cors', url: 'https://dummyjson.com/products/1', redirected: false, status: 200, ok: true, …}
  .then((data) => {
    console.log(data);
  }); // {id: 1, title: 'Essence Mascara Lash Princess', …}

/* 
Хотя, мы вроде бы, видим некий ответ в консоли браузера, но res - почему-то,
все еще ожидает ответа. Это происходит из-за линейности выполнения кода - код 
вывода в консоль отработал, в момент передачи запроса на выполнение - отсюда 
и статус. Нужно было немного подождать...
*/  
console.log(res); // Promise {<pending>}

/* Делаем второй запрос */
const resTwo = fetch("https://dummyjson.com/products/1")
  .then((response) => {
    console.log(response);
    return response.json();
  }); // Response {type: 'cors', url: 'https://dummyjson.com/products/1', redirected: false, status: 200, ok: true, …}

/* Но на этот раз запрос отобразим с паузой */  
setTimeout(() => console.log(resTwo), 500); // Promise {<fulfilled>: {…}}