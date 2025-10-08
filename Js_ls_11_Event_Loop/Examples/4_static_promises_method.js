'use strict';

Promise.resolve('Success').then(value => console.log(value)); // 'Success'
Promise.resolve(Promise.resolve('test'))
        .then(value => console.log(value)); // test

/* ----- Угадай последовательность вывода ----- */        
const prom = new Promise((resolve, reject) => {
   console.log('Start promise');
   setTimeout(() => {
        resolve('Timer');
   }, 1000);     
});
prom.then(vol => console.log(vol));

Promise.resolve('Instant').then(vol => console.log(vol));
/*
Последовательность будет:

Start promise
Instant
Timer
*/
