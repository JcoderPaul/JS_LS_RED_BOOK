'use strict';

const { math, counter } = require('./index');

console.log(math.add(5, 3));        // 8
console.log(math.subtract(5, 3));   // 2
console.log(counter.increment(2));  // 2
console.log(counter.getCount());    // 2