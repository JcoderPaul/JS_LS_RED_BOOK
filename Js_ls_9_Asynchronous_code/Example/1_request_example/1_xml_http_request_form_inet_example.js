/* См. и запускать в браузере в LiveServer */

'use strict';

console.log("Start script.");

function req(id) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://dummyjson.com/products/${id}`);
  request.send();

  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    console.log(data);
  });
}

req(1);
req(2);

console.log("Stop script.");