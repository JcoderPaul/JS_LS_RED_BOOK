'use strict';

const asyncArrowFunction = async () => {
  try {
    const resp = await fetch("https://dummyjson.com/products");
    const data = await resp.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

/* Вариант последовательного вызована на основе знаний работы Event Loop */
console.log("1");
asyncArrowFunction()
  .then((vol) => {
    console.log(vol);
  })
  .catch((err) => console.error(err)) // Ловим проброшенную из функции ошибку
  .finally(() => console.log("2"));

/* 
1
{products: Array(30), total: 194, skip: 0, limit: 30}
2
*/

/* Применение мгновенного вызова */
(async () => {
  console.log('1');
  const result = await asyncArrowFunction();
  console.log(result);
  console.log('2');
})();

/* 
1
{products: Array(30), total: 194, skip: 0, limit: 30}
2
*/
