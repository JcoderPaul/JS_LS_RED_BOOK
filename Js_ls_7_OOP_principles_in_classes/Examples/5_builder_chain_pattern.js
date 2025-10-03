'use strict';

const arr = [1, 3, -5, 2, 6];

/* Цепь вызовов */
const res = arr
  .map((el) => el * 2)
  .filter((el) => el > 0)
  .find((el) => el < 50);
console.log(res);

/* ----- Реализация ----- */

class Wallet {
  balance = 0;

  add(sum) {
    this.balance += sum;
    return this; // Возвращаем объект к которому снова можем обратиться и ...
  }

  remove(sum) {
    this.balance -= sum;
    return this; // ... снова можем обратиться и применить один из методов (построить цепочку)
  }
}

const myWallet = new Wallet();

const money = myWallet
.add(100)
.remove(30)
.add(15)
.remove(5)
.add(40);

console.log(money);