'use strict';

class Building {
  house = {};

  addRoof() {
    this.house.roof = 'Roof';
    return this;
  }

  addFloor() {
    this.house.floor = 'Floor';
    return this;
  }

  insertWindow() {
    this.house.windows = 'Window';
    return this;
  }

  /* Обычно эту функцию именуют execute() */
  buildHouse(){
    return this.house;
  }
}

const swiftHouse = new Building().addRoof().addFloor().insertWindow();
console.log(swiftHouse); // Building { house: { roof: 'Roof', floor: 'Floor', windows: 'Window' } }
console.log(swiftHouse.buildHouse()); // { roof: 'Roof', floor: 'Floor', windows: 'Window' }