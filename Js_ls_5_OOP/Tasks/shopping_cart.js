'use strict';

/*
    Реализовать на функциях и прототипахкорзину товаров с методами:
    - добавить товар;
    - увеличить число товаров;
    - уменьшить число товаров;   
*/

const bread = {
  id: 1,
  name: "bread",
  count: 0,
};

const milk = {
  id: 2,
  name: "milk",
  count: 0,
};

const Cart = function () {
  this.prodacts = []; // пока карзина пуста
};

Cart.prototype.addProduct = function (product) {
  if (this.prodacts.find((prod) => prod.id === product.id)) {
    return;
  }
  product.count = 1;
  this.prodacts.push(product);
};

Cart.prototype.increaseAmount = function (id) {
  this.prodacts = this.prodacts.map((prod) => {
    if (prod.id === id) {
      prod.count++;
      return prod;
    }
    return prod;
  });
};

Cart.prototype.decreaseAmount = function (id) {
  this.prodacts = this.prodacts.map((prod) => {
      if (prod.id === id) {
        prod.count--;
        return prod;
      }
      return prod;
    }).filter((prod) => prod.count > 0);
};

const shopCart = new Cart();
shopCart.addProduct(bread);
shopCart.addProduct(milk);
console.log(shopCart.prodacts);
/*
[
  { id: 1, name: 'bread', count: 1 },
  { id: 2, name: 'milk', count: 1 }
]
*/
console.log("_________________________________________________");

shopCart.increaseAmount(bread.id);
shopCart.increaseAmount(milk.id);
shopCart.increaseAmount(milk.id);
console.log(shopCart.prodacts);
console.log(bread);
console.log(milk);
/*
[
  { id: 1, name: 'bread', count: 2 },
  { id: 2, name: 'milk', count: 3 }
]

{ id: 1, name: 'bread', count: 2 }
{ id: 2, name: 'milk', count: 3 }
*/
console.log("_________________________________________________");

shopCart.decreaseAmount(milk.id);
shopCart.decreaseAmount(milk.id);
shopCart.decreaseAmount(milk.id);
shopCart.decreaseAmount(milk.id);
console.log(shopCart.prodacts);
console.log(bread);
console.log(milk);
/*
[ { id: 1, name: 'bread', count: 2 } ]

{ id: 1, name: 'bread', count: 2 }
{ id: 2, name: 'milk', count: 0 }
*/
console.log("_________________________________________________");

shopCart.increaseAmount(milk.id);
console.log(shopCart.prodacts);
console.log(bread);
console.log(milk);
/*
[ { id: 1, name: 'bread', count: 2 } ]

{ id: 1, name: 'bread', count: 2 }
{ id: 2, name: 'milk', count: 0 }

В карзине нет продукта 'milk' и 'инкризить' нечего,
нужно сначала добавить продукт в карзину.
*/
console.log("_________________________________________________");

shopCart.addProduct(milk);
shopCart.increaseAmount(milk.id);
console.log(shopCart.prodacts);
console.log(bread);
console.log(milk);
/*
[
  { id: 1, name: 'bread', count: 2 },
  { id: 2, name: 'milk', count: 2 }
]
  
{ id: 1, name: 'bread', count: 2 }
{ id: 2, name: 'milk', count: 2 }
*/