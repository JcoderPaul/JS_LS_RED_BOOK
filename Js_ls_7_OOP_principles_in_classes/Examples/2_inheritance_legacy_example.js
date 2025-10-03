function brLine() {
        console.log("_____________________________________");
}

'use strict';

const Book = function(title, author){
        this.title = title;
        this.author = author;
}

Book.prototype.buy = function() {
        console.log('Buy');
}

const AudioBook = function(title, author, lenMin) {
        Book.call(this, title, author); // Привязка контекста, но не более, т.е. 'композиция'
        this.lenMin = lenMin;
}

AudioBook.prototype.log = function() {
        console.log(`${this.title} - ${this.lenMin}`);
}

/* ----- Тест ----- */

const book = new AudioBook('Lord of the rings', 'Tolkien', 240);
book.log();
console.log(book); 
/*
AudioBook {
  title: 'Lord of the rings',
  author: 'Tolkien',
  lenMin: 240
}
*/
brLine();
console.log(book instanceof AudioBook); // true 
console.log(book instanceof Book); // false 
/* 
И тогда: 
book.buy(); TypeError: book.buy is not a function 

все верно мы просто пере использовали контекст применив *.call()
поэтому нужно сделать цепочку наследования 'руками' см. ниже.
*/

/* Шаг 1 - Связываем прототип аудио книги с прототипом книги */
AudioBook.prototype = Object.create(Book.prototype);

brLine();
const book2 = new AudioBook('The price of talent', 'P.Poloz', 130);
book2.buy(); // Buy
console.log(book2); 
/* 
Мы видим: Book { title: 'The price of talent', author: 'P.Poloz', lenMin: 130 }
Вместо: AudioBook { title: 'The price of talent', author: 'P.Poloz', lenMin: 130 }
см. выше.
*/

brLine();
/* Шаг 2 - Добавляем конструктор и тогда... */
AudioBook.prototype.constructor = AudioBook;
console.log(book2); 
/*
AudioBook {
  title: 'The price of talent',
  author: 'P.Poloz',
  lenMin: 130
}

И теперь мы имеем полную цепочку:
*/

brLine();
console.log(book2 instanceof AudioBook); // true 
console.log(book2 instanceof Book); // true 