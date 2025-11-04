/*
- Именованные экспорты (add, subtract, PI) позволяют импортировать только нужные элементы.
- Переименование через as (PI as piValue) избегает конфликтов имен.
- Полное расширение ./math.js обязательно в Node.js.
*/
'use struict';

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;