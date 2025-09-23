import brLine from "./../brLine.js";

/* Ключ всегда должен быть иммутабельным */
'use strict';

const simpleMap = new Map(); // Создание map

simpleMap
  .set(1, 5)
  .set(true,'yes')
  .set(true,'yes')
  .set(false,'no');

/* 3 - при добавлении существующего ключа его value просто перезаписывается */
console.log(simpleMap.size); 

simpleMap
  .set([1, 3, 4], 'array')
  .set({a: 1}, {b: 3});

console.log(simpleMap);
/*
  Map(5) {
    1 => 5,
    true => 'yes',
    false => 'no',
    [ 1, 3, 4 ] => 'array',
    { a: 1 } => { b: 3 }
  }

но →
*/

console.log(simpleMap.get([1, 3, 4])); // undefined
console.log(simpleMap.get({a: 1})); // undefined
brLine();

/* Объекты и массивы доступны по явной ссылке */
const arrAsKey = [1, 3, 4];
const objAsKey = {a: 1};

simpleMap
  .set(arrAsKey, {name: "David"})
  .set(objAsKey, {age: 23, isBlocked: false})

console.log(simpleMap);
brLine();
/*
Map(7) {
  1 => 5,
  true => 'yes',
  false => 'no',
  [ 1, 3, 4 ] => 'array',
  { a: 1 } => { b: 3 },
  [ 1, 3, 4 ] => { name: 'David' },
  { a: 1 } => { age: 23, isBlocked: false }
}
*/
console.log(simpleMap.get(arrAsKey)); // { name: 'David' }
console.log(simpleMap.get(objAsKey)); // { age: 23, isBlocked: false }
