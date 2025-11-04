/*
- export default используется для одного основного экспорта.
- При импорте можно использовать любое имя (без {}), так как это дефолтный экспорт.
*/
'use strict';

export default function greet(name) {
  return `Hello, ${name}!`;
}