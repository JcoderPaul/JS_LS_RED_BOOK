'use strict';

/* ----- Так не надо делать - класс не должен реализовывать ненужный метод ----- */
class Weapon {
  strike() {}

  shoot() {}
}

class Rifle extends Weapon {
  strike() {
    // Бить - не эффективен на дальней дистанции
  }

  shoot() {
    // Для этого и сделан
  }
}

class Sword extends Weapon {
  strike() {
    // Эффективен в ближнем бою
  }

  shoot() {
    // Вообще не умеет - т.е. тут этот метод лишний
  }
}

/* ----- Более верное ----- */
class Weapon {
  repairWeapon() {}
  dealDamage() {}
}

class Rifle extends Weapon {
  useWeapon() {/* some logic*/}
}

class Sword extends Weapon {
  useWeapon() {/* some logic*/}
}

class Knife extends Weapon {
  useWeapon() {/* some logic*/}
}
