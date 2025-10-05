'use strict';

/* ----- Так не надо... ----- */
class badDB {
  // Логика подключения к конкретной БД      
  save(item) {
    // save
  }
}

class BadToDoList {
  items = [1, 2, 3];
  db = new badDB(); // Жесткая свыязка с конкретной БД

  saveToDb() {
    this.db.save(this.items);
  }
}

/* ----- Более верный вариант ----- */
class DB {
  save(item) {}
}

class MongoDB extends DB {
  save(item) {
    console.log(`Saved to Mongo: ${item}`); // save
  }
}

class PostgreSQL extends DB {
  save(item) {
    console.log(`Saved to PostgeSQL: ${item}`); // save
  }
}

class ToDoList {
  items = [1, 2, 3];
  db;

  constructor(db) {
    this.db = db;
  }

  saveToDb() {
    this.db.save(this.items);
  }

  set setDb(db){
        this.db = db;
  }
}

/* ----- Тест ----- */
const mDB = new MongoDB();
const pDB = new PostgreSQL();

const myTDList_1 = new ToDoList(mDB);
const myTDList_2 = new ToDoList(pDB);

myTDList_1.saveToDb(); // Saved to Mongo: 1,2,3
myTDList_2.saveToDb(); // Saved to PostgeSQL: 1,2,3

myTDList_1.setDb = pDB;
myTDList_1.saveToDb(); // Saved to PostgeSQL: 1,2,3

myTDList_2.setDb = mDB;
myTDList_2.saveToDb(); // Saved to Mongo: 1,2,3
