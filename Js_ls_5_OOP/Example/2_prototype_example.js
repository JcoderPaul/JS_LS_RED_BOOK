'use strict';

const Book = function(title, author) {
        this.author = author;
        this.title = title;
        this.isRead = false;
}

/* Мы дополняем исходный прототип из которого была создана Book */
Book.prototype.read = function() {
        this.isRead = true;
}

const lordOfTheRings = new Book('The Lord of the Rings','«J. R. R.» Tolkien');
console.log(lordOfTheRings);
/* 
        Book {
        author: '«J. R. R.» Tolkien',
        title: 'The Lord of the Rings',
        isRead: false
        }
*/
lordOfTheRings.read();
console.log(lordOfTheRings);
/*
        Book {
        author: '«J. R. R.» Tolkien',
        title: 'The Lord of the Rings',
        isRead: true ← уже, после обращения к функции *.read()
        }
*/

console.dir(lordOfTheRings.__proto__); 
console.dir(Object.getPrototypeOf(lordOfTheRings) === Book.prototype); // true 
console.log(lordOfTheRings.__proto__ === Book.prototype); // true

/* Добавим свойства в протатип */
Book.prototype.cover = "UabScin";
console.log(lordOfTheRings.hasOwnProperty('author')); // true - у экземпляра класса есть это свойство
console.log(lordOfTheRings.hasOwnProperty('cover')); // false - а это для него уже свойство протатипа

