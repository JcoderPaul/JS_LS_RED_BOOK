import brLine from "./../brLine.js";

'use strict';

const userNameArr = ['Malcolm', 'Sanara', 'Douglas', 'Malcolm', 'Douglas', 'Tyimus'];
const originalNameSet = new Set(userNameArr);

console.log(userNameArr.length); // 6
console.log(originalNameSet.size); // 4
brLine();

console.log(userNameArr.includes('Douglas')); // true
console.log(originalNameSet.has('Sanara')); // true
console.log(originalNameSet.has('Howard')); // false
brLine();

console.log(originalNameSet.has('Howard')); // false

console.log(originalNameSet.delete('Douglas')); // true
console.log(originalNameSet.has('Douglas')); // false
brLine();

console.log(originalNameSet.clear()); // false
console.log(originalNameSet.size); // false
brLine();

originalNameSet.add(false);
originalNameSet.add(1);
originalNameSet.add('Vey Su Po');
const setSize = originalNameSet.size;
console.log(setSize);