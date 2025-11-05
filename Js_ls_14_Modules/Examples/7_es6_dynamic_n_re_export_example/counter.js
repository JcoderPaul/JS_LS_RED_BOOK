'use strict';

let _count = 0; // Приватная переменная

export const increment = (step = 1) => {
  _count += step;
  return _count;
};

export const getCount = () => _count;