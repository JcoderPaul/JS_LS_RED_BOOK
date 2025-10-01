'use strict';

class Car {
        #vin; // Приватное поле
        speed; // Открытое поле

        #chageVin(vin){
                this.#vin = vin;
                console.log('Canged!')
        }

        set setVin(vin){
                // Некая проверка...
                this.#chageVin(vin);
        }

        get getVin(){
                return this.#vin;
        }
}

const myCar = new Car();
myCar.speed = 10; // Свободный доступ
console.log(myCar.speed);

myCar.vin = 1234441341; // Но это не приватный #vin, а свойство конкретного экземпляра myCar 
console.log(myCar.vin);

/* 
car.#vin - Property '#vin' is not accessible outside class 'Car' because it has a private identifier.  
*/

console.log(myCar.getVin); // undefined
myCar.setVin = '4523131345314'; // Canged!
console.log(myCar.getVin); // 4523131345314