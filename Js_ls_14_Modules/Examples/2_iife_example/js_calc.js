'use strict';

const APP = {};

/* Изолируем данные, но скрипты в index.html должны сохранять порядок вызова */
(function () {
  const a = 1;

  function add(f, s) {
    return f + s;
  }

  function sub(f, s) {
    return f - s;
  }

  APP.calc = {
        add,
        sub
  }

  console.log(a); // 1
})();
