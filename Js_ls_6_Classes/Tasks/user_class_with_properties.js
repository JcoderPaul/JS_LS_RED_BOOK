'use strict';

/*
Реализовать класс пользователя, со свойствами:
- логин;
- пароль;

Причем пароль при установке должен переворачиваться и в таком виде 
храниться. Пароль и логин после создания 'напрямую' изменить нельзя.

Добавить классу методы:
- Смены пароля (передаем старый и новый пароль);
- Сверки пароля;
*/

class User {
  #login; // У него есть только геттер
  #_pass; // У него есть и геттер и сеттер

  constructor(login, password) {
    this.#login = login;
    /* Передаем пароль в 'шифрующий метод', обращаясь к тому, как к свойству, через '.' */
    this.#setPass = password;
  }

  /* ...типа шифруем пароль */
  set #setPass(password) {
    this.#_pass = password.split('').reverse().join('');
  }
  /* ...типа дешифруем пароль и возвращаем */
  get #getPass() {
    return this.#_pass.split('').reverse().join('');
  }

  get getLogin() {
    return this.#login;
  }

  /* Проверяем старый пароль перед сменой */
  checkPassword(password) {
    return this.#getPass === password;
  }

  changePass(oldPass, newPass) {
    if (!this.checkPassword(oldPass)) {
      return false;
    } else {
      /* Обращаемся к методу, как к свойству */
      this.#setPass = newPass;
      return true;
    }
  }
}

/* ----- Тест ----- */
const userMalcolm = new User('m_stone@sw.de', '12345');

console.log(userMalcolm); // User {}
console.log(userMalcolm.getLogin); // m_stone@sw.de

console.log(userMalcolm.checkPassword('12345')); // true
console.log(userMalcolm.checkPassword('867655')); // false

console.log(userMalcolm.changePass('12345', '09876')); // true
console.log(userMalcolm.checkPassword('09876')); // true
