'use strict';

const User = {
  log() {
    console.log("Log from log");
  },
};

const myUser = Object.create(User);
console.log(myUser); // {}
console.log(myUser.__proto__ === User); // true

myUser.log(); // Log from log