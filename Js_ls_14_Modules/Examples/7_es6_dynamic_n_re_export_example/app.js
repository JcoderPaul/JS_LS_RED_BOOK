/*
- index.js упрощает импорт из папки, объединяя экспорты.
- export * реэкспортирует все именованные экспорты из указанного модуля.
*/

'use strict';

import { add, increment } from './index.js';

console.log(add(5, 3));     // 8
console.log(increment(2));  // 2