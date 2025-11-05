/*
- import() возвращает Promise, позволяя загружать модули асинхронно.
- Полезно для lazy loading (например, загрузка модуля по событию).
*/
'use strict';

async function loadMath() {
  const { add } = await import('./math.js');
  console.log(add(1, 2)); // 3
}

loadMath();