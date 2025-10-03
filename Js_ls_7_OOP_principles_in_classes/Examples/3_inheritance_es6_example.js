function brLine() {
        console.log("_____________________________________");
}

'use strict';

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
  
  buy() {
    console.log("Buy");
  }
}


class AudioBook extends Book {
  constructor(title, author, lenMin) {
    super(title, author);
    this.lenMin = lenMin;
  }
  
  log() {
    console.log(`${this.title} - ${this.lenMin}`);
  }
}


/* ----- Тест ----- */

const book = new AudioBook('Lord of the rings', 'Tolkien', 240);
book.log(); // Lord of the rings - 240
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
console.log(book instanceof Book); // true