'use strict';

const promWithoutError = new Promise((resolve, reject) => {
  resolve('Success'); 
});

/* В data попадает, то что передается в аргумент resolve → 'Success' */
promWithoutError
  .then(data => console.log(data)) // Success - из resolve и мы видим это

const promWithError = new Promise((resolve, reject) => {
  if (new Date() < new Date("01/01/2056")) {
    reject(new Error('Wah wah - Error!'));
  }
  resolve("Success but not visible");
});

promWithError
  .then((data) => console.log(data)) // Success - из resolve
  .catch((err) => console.log(err)); // Error: Wah wah - Error! - из reject и мы види именно это