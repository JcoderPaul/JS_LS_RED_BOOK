'use strict';

class Task {
        _dueDate;

        constructor (title, dueDate){
                this.title = title;
                this.dueDate = dueDate;
        }
        
        get isOverdue() {
                return this.dueDate < new Date();
        }

        set dueDate(date){
                if (date < new Date){
                        return;
                }
                this._dueDate = date
        }
}

const myTask = new Task('Task_3', new Date('2026/01/01'));
console.log(myTask.isOverdue); // false

const myTask2 = new Task();
myTask2.title = 'Task_4';
myTask2.dueDate = new Date('2022/2/4'); // Сеттер не пропустит и будет undefined
console.log(myTask2); // Task { _dueDate: undefined, title: 'Task_4' }
console.log(myTask2.isOverdue); // false

myTask2.dueDate = new Date('2026/2/4');
console.log(myTask2); // Task { _dueDate: 2026-02-03T19:00:00.000Z, title: 'Task_4' }
console.log(myTask2.isOverdue); // false
