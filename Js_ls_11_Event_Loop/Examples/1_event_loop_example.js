'use strict';

console.log("1 - Start program");

Promise.resolve()
  .then(() => console.log("2 - microtask from Promise_1"));

setTimeout(() => console.log("3 - setTimeout makro-task it log"), 0);

Promise.resolve()
  .then(() => console.log("4 - microtask from Promise_2\n"));

console.log("5 - Finish program \n");

/* 
Последовательность вывода в консоль:

1 - Start program
5 - Finish program

3 - microtask from Promise_1
4 - microtask from Promise_2

2 - setTimeout makro-task it log
*/