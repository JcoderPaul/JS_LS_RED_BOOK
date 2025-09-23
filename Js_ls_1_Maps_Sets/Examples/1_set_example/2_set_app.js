import brLine from "./../brLine.js";

'use strict';

const userNameArr = ['Malcolm', 'Sanara', 'Douglas', 'Malcolm', 'Douglas', 'Tyimus'];
const originalNameSet = new Set(userNameArr);

for(const name of originalNameSet){
        console.log(name);
}
brLine();

/* Превращение set в array */

const originalArray = [...originalNameSet];
console.log(originalArray);
console.log(originalArray.length);

/* Объекты коллекционируются по ссылке */

const objectSet = new Set ([{name: 'Malcolm'}, {name: 'Malcolm'}, {name: 'Malcolm'}]);
console.log(objectSet.size); // 3
console.log(objectSet);
/*
Set(3) {
  { name: 'Malcolm' },
  { name: 'Malcolm' },
  { name: 'Malcolm' }
}
*/
brLine();

/* Перевести в set можно только итерируемые данные */

const strSet = new Set('London');
console.log(strSet); // Set(4) { 'L', 'o', 'n', 'd' }