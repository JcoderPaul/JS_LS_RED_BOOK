import brLine from "../brLine.js";

/* WeakSet принимает в качестве ключей только объекты */
'use strict';

const myWeakSet = new WeakSet(); // Создание WeakMap

let objKey = { name: 'Malcolm'};
let objKeyTwo = { name: 'Sanarita'};
let objKeyThree;

myWeakSet
        .add(objKey)
        .add(objKeyTwo);

console.log(myWeakSet.has(objKey)); // true
console.log(myWeakSet.has(objKeyThree)); // false
brLine();

/* Чистим SET через 'обнуление' ссылки */
objKeyTwo = null;
setTimeout(() => console.log(myWeakSet.has(objKeyTwo)), 1000); // false
