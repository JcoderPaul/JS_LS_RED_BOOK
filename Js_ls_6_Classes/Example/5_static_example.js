'use strict';

class Test {
  print;      
  static prp = "Bye";      
  static hello() {
    console.log("Hello from static!");
  }

  static {
       console.log('Мы в статическом блоке!'); 
       this.print = this.prp + ' это еще не конец!';
  }
}

Test.hello(); // Hello!
console.log(Test.prp);
console.log(Test.print);

/* 
Вывод в консоль:

Мы в статическом блоке!
Hello from static!
Bye
Bye это еще не конец!
Hello from function!
*/

/* ----- Под капотом ----- */
const Test2 = function() {

}

/* 
Мы не объявляем на прототипе: 

Test2.prototype.hello = function() {
        console.log('Hello!')
};

const myTest = new Test2;
myTest.hello();

а добавляем как свойство:
*/

Test2.hello = function(){
        console.log('Hello from function!');
}
      
Test2.hello();