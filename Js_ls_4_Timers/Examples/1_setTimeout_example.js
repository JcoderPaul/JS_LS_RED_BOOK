'use strict'

setTimeout(() => console.log('boom'), 1000); // 'boom' в консоли через 1 сек. 

/* Передаем аргумент */
setTimeout((msg) => console.log(msg), 1500, 'Hello from timer!'); // 'Hello from timer!' в консоли через 1.5 сек. 

/* Передаем аргументы */
setTimeout((a, b) => console.log(a + b), 2000, 10, 15); // 25 в консоли через 2 сек.

const msgArr = ['Hello', 'world', '!'];
setTimeout((msg_1, msg_2, msg_3) => console.log(`${msg_1} ${msg_2}${msg_3}`), 2500, ...msgArr); // 'Hello world !' в консоли через 2.5 сек.

console.log(performance.now()); // 29 - 36 мс., при чем выводится сразу