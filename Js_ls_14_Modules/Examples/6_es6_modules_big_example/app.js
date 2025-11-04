import brLine from './br_line.js';

'use strict';

import { add, subtract, PI as piValue } from './math.js';
import greet from './greet.js';
import { increment, getCount } from './counter_with_private.js';
import { User } from './user.js';

brLine('math.js');
console.log(add(5, 3));      // 8
console.log(subtract(5, 3)); // 2
console.log(piValue);        // 3.14159

brLine('greet.js');
console.log(greet('Alice')); // Hello, Alice!

brLine('counter_with_private.js');
console.log(getCount());    // 0
console.log(increment(2)); // 2
console.log(getCount());   // 2

brLine('user.js');
const user = new User('Malcolm');
console.log(user.getName()); // Malcolm
