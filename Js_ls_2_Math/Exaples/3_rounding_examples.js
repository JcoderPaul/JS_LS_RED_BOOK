'use strict';

function brLine(){
        console.log("_________________________________________");
};

let value = 3.7;
console.log(Math.round(value)); // 4 - округляет до ближайшего целого числа
console.log(Math.floor(value)); // 3 - округление всегда вниз
console.log(Math.ceil(value)); // 4 - округление всегда вверх
brLine();

console.log(Math.round(3.65)); // 4
console.log(Math.round(3.42)); // 3
console.log(Math.round(-3.63)); // -4
console.log(Math.round(3.51)); // 4
brLine();

console.log(Math.round("abc")); // NaN
brLine();

console.log(Math.round(Infinity)); // Infinity
console.log(Math.round(-Infinity)); // -Infinity
console.log(Math.round(0)); // 0
console.log(Math.round(-0)); // -0
brLine();