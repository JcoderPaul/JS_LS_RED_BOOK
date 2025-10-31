'use strict';

/* Изолируем данные, но скрипты в index.html должны сохранять порядок вызова */
(function () {
  const a = 3;

  const resAdd = APP.calc.add(8, 3);
  const resSub = APP.calc.sub(8, 3);

  console.log(resAdd); // 11
  console.log(resSub); // 5
  console.log(a); // 3
})();

/*
Порядок вывода в консоли:

1
11
5
3

*/