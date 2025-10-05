'use strict';

class Treasure {}

class Coin extends Treasure {}

class Crystal extends Treasure {}

/* 
Плохая реализация, т.к. работать оно будет, но в случае 
появления нового 'инвентаря', нам придется переписывать
реализацию класса (метода)
*/
class Inventory {
  #score = 0;
  pick(treasure) {
    if (treasure instanceof Coin) {
      this.#score += 1;
    }
    if (treasure instanceof Crystal) {
      this.#score += 10;
    }
  }
}

/* 
Новый инвентарь, но для того, чтобы учесть его в наборе 
всего инвентаря персонажа, нужно переписать Inventory
*/
class Spice extends Treasure {

}

/* 
Что-то типа: 

class Inventory {
  #score = 0;
  pick(treasure) {
    if (treasure instanceof Coin) {
      this.#score += 1;
    }
    if (treasure instanceof Crystal) {
      this.#score += 10;
    }
    if (treasure instanceof Spice) {
      this.#score += 100;
    }  
  }
}
*/

/* ----- Чуть более правильная реализация ----- */

class Coolysh {
  value = 0;
}

class Yurk extends Coolysh {
  value = 1;
}

class Dattam extends Coolysh {
  value = 10;
}

class Bacu extends Coolysh {
  value = 100;
}

class BigBag {
  #bag = 0;
  pic(cool) {
    this.#bag += cool.value;
  }
}