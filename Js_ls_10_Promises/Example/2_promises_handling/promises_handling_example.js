'use strict';

/* Запускаем LiveServer в index.html */
fetch("https://dummyjson.com/products/1")
  .then((response) => {
    console.log(response);
    return response.json();
  }) // Response {type: 'cors', url: 'https://dummyjson.com/products/1', redirected: false, status: 200, ok: true, …}
  .then((data) => {
    console.log(data);
  }); // {id: 1, title: 'Essence Mascara Lash Princess', …}
