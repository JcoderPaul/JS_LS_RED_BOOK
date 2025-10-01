'use strict';

const task = {
        title: 'Task_1',
        dueTo:new Date('2023/01/01'),

        /* Выглядит как функция, но обращаются к ней, как к свойству, см. ниже */
        get isOverdue() {
                return this.dueTo < new Date();
        },

        set isOverdue(isOverdueTask){
                if (!isOverdueTask){
                        this.dueTo = new Date();
                }
        }
}

console.log(task.isOverdue); // true

task.isOverdue = false;
console.log(task.isOverdue); // false