'use strict';

/* 
Еще раз повторим:

Шаг 1 - Класс с конструктором */
class Car {
        constructor(model, firm) {
                this.model = model;
                this.firm = firm;
        }
        
        getModel(){
                return this.model;
        }

        getFirm(){
                return this.firm;
        }
}

/* 
Шаг 2 - Создание ссылки на будущий пустой объект
Шаг 3 - Вызов конструктора 
Шаг 4 - Связывание с прототипом Car.prototype
*/
Car.prototype.color = 'green';

const ladaPontarez = new Car();
console.log(ladaPontarez); // Car { model: undefined, firm: undefined }
console.log(Object.getPrototypeOf(ladaPontarez) === Car.prototype); // true

ladaPontarez.speed = 360; // Добавляем свойство объекту ladaPontarez
console.log(ladaPontarez); // Car { model: undefined, firm: undefined, speed: 360 }

console.log(Object.hasOwn(ladaPontarez, 'speed')); // true - свойство объекта
console.log(ladaPontarez.color); // green - свойство прототипа
console.log(Object.hasOwn(ladaPontarez, 'color')); // false - свойство прототипа

ladaPontarez.model = 'Pontorez';
ladaPontarez.firm = 'VAZ';
console.log(ladaPontarez); // Car { model: 'Pontorez', firm: 'VAZ' }

console.log(Object.getPrototypeOf(ladaPontarez) === Car.prototype); // true

