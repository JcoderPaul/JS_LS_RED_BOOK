'use strict';

/* Запускаем LiveServer в index.html */

/* Сделаем ошибку в url и → ERR_NAME_NOT_RESOLVED */
const res = fetch("https://pumijson.com/products/") // Failed to load resource: net::ERR_NAME_NOT_RESOLVED
  .then(response => response.json())
  .catch(error => console.log(error)) // TypeError: Failed to fetch
  .finally(() => console.log("Request finish")); // Request finish


const resTwo = fetch("https://dummyjson.com/products/") 
  .then(response => response.json())
  .catch(error => console.log(error)) 
  .finally(() => console.log("resTwo - Request finish")); // resTwo - Request finish