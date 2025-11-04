/*
- Класс экспортируется как именованный экспорт.
- Может быть также export default class User { ... }.
*/
export class User {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}