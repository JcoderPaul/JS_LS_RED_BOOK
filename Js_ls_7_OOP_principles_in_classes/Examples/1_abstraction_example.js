'use strict';

/* Абстрагируем фильм*/
class Film {
        /* Инкапсулируем (приват поля) некоторые свойства */
        #name;
        #author;
        rating;
        #length;

        constructor(name, author, length){
                this.#name = name;
                this.#author = author;
                this.#length = length;
        }

        /* Доступ только через геттеры */
        get name(){
                return this.#name;
        }

        get author() {
                return this.#author;
        }

        get length() {
                return this.#length;
        }
}

const film = new Film('The Green Mile', 'Ferenc Darabont', 190);

console.log(film.name); // The Green Mile
console.log(film.author); // Ferenc Darabont
console.log(film.length); // 190