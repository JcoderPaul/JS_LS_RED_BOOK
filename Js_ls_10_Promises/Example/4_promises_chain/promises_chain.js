'use strict';

/* Запускаем LiveServer в index.html */
const res = fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(({ products }) => {
    console.log(products);
    /* Таких вещей лучше избегать! Ползем к 'callback-hell'*/
    fetch('https://dummyjson.com/products/' + products[0].id);
  }); // (30) [{…}, {…}, {…}, {…}, {…}, {…}, ...]

/* Так чуть лучше ↓ */
const resTwo = fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(({ products }) => fetch('https://dummyjson.com/products/' + products[0].id))
  .then(response => response.json())
  .then(data => console.log(data)); // {id: 1, title: 'Essence Mascara Lash Princess', …}


