'use strict'

function brLine(){
        console.log("__________________________________________");
}

let bigInt = BigInt(123); // Корректно работает только до MAX_SAFE_INTEGER
console.log(typeof bigInt); // bigint

let bigIntLiteral = 123n; // Используя суффикс n
console.log(typeof bigIntLiteral); // bigint
brLine();

let bigIntFromString = BigInt("12345678901234567890"); // Из корректной строки
console.log(typeof bigIntFromString); // bigint
console.log(typeof 10n); // bigint
brLine();

console.log(123n + 1n); // 124n но если console.log(123n + 1); - бросит ошибку типов 
console.log(123n + BigInt(1)); // 124n
brLine();

/* Логика */
console.log(10n < 20); // true
console.log(10n == 10); // true
console.log(10n === 10); // !!! НО при строгом сравнении - false !!!