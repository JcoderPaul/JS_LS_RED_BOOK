'use strict';

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
  
  buy() {
    console.log("Buy");
  }

  info() {
    console.log(`${this.title} - ${this.author}`);
  }
}

const book = new Book('The price of talent', 'P.Poloz');
book.info(); // The price of talent - P.Poloz
book.buy(); // Buy

class E_Book extends Book {
  constructor(title, author, pages) {
    super(title, author);
    this.pages = pages;
  }

  info() {
    console.log(`${this.title} - ${this.author} - ${this.pages}`);
  }
}

const book2 = new E_Book('Black dunes', 'P.Poloz', 150);
book2.info(); // Black dunes - P.Poloz - 150
book2.buy(); // Buy

