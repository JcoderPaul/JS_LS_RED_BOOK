'use strict';

/* Функция конструктор с параметрами*/
const DarthVader = function(email, pass) {
    this.email = email;
    this.pass = pass;
};

/* без */
const DarthMaul = function(name, password){

};

const uset_1 = new DarthVader('skywalker@mail.ru', '123');
const uset_2 = new DarthMaul('Rarigu', '321');

console.log(uset_1); // DarthVader { email: 'skywalker@mail.ru', pass: '123' }
console.log(uset_2); // DarthMaul {}, хотя данные вроде бы переданы как аргументы

/*
1 - создаем пустой объект
2 - вызываем DarthVader (DarthMaul) функцию
3 - this = пустой объект, заполняется переданными аргументами
4 - объект связывается с prototype
5 - возвращается объект
*/

console.log(uset_1 instanceof DarthVader); // true
console.log(uset_2 instanceof DarthMaul); // true