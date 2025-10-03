'use strict';

/*
        Сделать класс врага (нечто абстрактное) co здоровьем и методом получения урона.
        Сделать класс меча, который имеет силу и метод нанесения урона.
        Сделать класс орка (наследник от врага), который в 50% случаев не получает урона.

        Задача ударить орка.
*/

class Enemy {
  _health;
  constructor(health) {
    this._health = health;
  }

  recieveDamage(damage) {
    this._health = this._health - damage;
    console.log(this._health);
  }
}

class Sword {
  #damage;
  constructor(damage) {
    this.#damage = damage;
  }

  strike(enemy) {
    enemy.recieveDamage(this.#damage);
  }
}

/* ----- Тесты ----- */
const enemyMine = new Enemy(10);
const mySword = new Sword(3);
mySword.strike(enemyMine); // 7
mySword.strike(enemyMine); // 4
mySword.strike(enemyMine); // 1

/* ----- Продолжим ----- */
class Orc extends Enemy {
  constructor(health) {
    super(health);
  }

  recieveDamage(damage) {
    if(Math.random() > 0.5) {
        this._health = this._health - damage;
    }    
    console.log(this._health);
  }
}

/* ----- Тесты ----- */
const orcEnemy = new Orc(10);
mySword.strike(orcEnemy); // 7 еще тест 10 и т.д., т.е. орк получает повреждения согласно задаче 
mySword.strike(orcEnemy); // 7 еще тест 7 
mySword.strike(orcEnemy); // 4 еще тест 7

/* ----- Продолжим ----- */
class Troll extends Enemy{

}
/* ----- Тесты ----- */
const trollEnemy = new Troll(20);
mySword.strike(trollEnemy); // 17 
mySword.strike(trollEnemy); // 14
mySword.strike(trollEnemy); // 11