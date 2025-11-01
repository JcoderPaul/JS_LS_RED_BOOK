'use strict';

let count = 0;

module.exports = {
  increment: function(step = 1) {
    count += step;
    return count;
  },
  getCount: function() {
    return count;
  }
};