import brLine from "../brLine.js";

/* WeakMap принимает в качестве ключей только объекты */
'use strict';

const myWeakMap = new WeakMap(); // Создание WeakMap

let onlyObjKey = { boolean: true}
let onlyObjKeyTwo = { boolean: false}
myWeakMap.set(onlyObjKey, 'test_value');

console.log(myWeakMap.has(onlyObjKey)); // true
brLine();

console.log(myWeakMap.get(onlyObjKey)); // test_value
console.log(myWeakMap.has(onlyObjKey)); // true
console.log(myWeakMap.delete(onlyObjKey)); // true
brLine();

myWeakMap
        .set(onlyObjKey, 'test_A')
        .set(onlyObjKeyTwo, 'test_B');

console.log(myWeakMap.has(onlyObjKey)); // true        
console.log(myWeakMap.has(onlyObjKeyTwo));  // true
brLine();

/* 'Обнулим' один из ключевых объектов */
onlyObjKey = null;

/* 
Мы через методы ничего не удалял, но обнулив ссылку, мы 'отдали' 
ключевой объект сборщику мусора, а значит ключ удалит он. Нет 
ключа - нет доступа к value под этим ключом.
*/
setTimeout(() => {console.log(myWeakMap.has(onlyObjKey))}, 1000); // false


/* Пример WeakMap как кэша */
let cache = new WeakMap();

function getValue(obj) {
        if(!cache.has(obj)) {
                const res = 'Мы считали, долго и упорно, закешируем результат расчетов';
                cache.set(obj, res);
        }
        return cache.get(obj);
}

/* Результат сидит в 'кеше' и его мы можем получить, пока ключ не обнулен */
const resMath = getValue(onlyObjKeyTwo);
console.log(resMath); // "Мы считали, долго и упорно, закешируем результат расчетов"

const resMathTwo = getValue(onlyObjKeyTwo);
console.log(resMathTwo); // "Мы считали, долго и упорно, закешируем результат расчетов"

/* Чистим кэш */
onlyObjKeyTwo = null;
setTimeout(() => {console.log(cache.has(onlyObjKeyTwo))}, 1000); // false