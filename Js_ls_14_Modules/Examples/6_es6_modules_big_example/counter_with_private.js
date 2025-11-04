/*
- _count приватна, так как не экспортируется.
- Стрелочные функции используются для краткости.
- Live binding: изменения count отражаются во всех импортах.
*/
'use strict';

let _count = 0; // Приватная переменная

export const increment = (step = 1) => {
  _count += step;
  return _count;
};

export const getCount = () => _count;