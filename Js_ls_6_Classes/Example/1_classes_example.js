'use strict';

class BookClass {
        constructor(title, author){
                this.title = title;
                this.author = author;
        }

        isRead = false;

        read() {
                this.isRead = true;
        }
}

const breathOfTheAbyss = new BookClass('The price of talent','P.Poloz');

console.log(breathOfTheAbyss);
/*
BookClass {
  isRead: false,
  title: 'The price of talent',
  author: 'P.Poloz'
}
*/
console.log(breathOfTheAbyss instanceof BookClass); // true