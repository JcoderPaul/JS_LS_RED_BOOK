'use strict';

let curDate = new Date();

/*
Сделать функцию, которая принимает пользователя и проверяет, 
есть ли у него сегодня день рождения или нет.
*/

const user = {
        name: 'Malcolm',
        birthday: '12/23/2022'
}
console.log(user);

const fromTimestamp = curDate.setFullYear(curDate.getFullYear() - 25);

const userTwo = {
        name: 'Arum',
        birthday: new Date(fromTimestamp)
}
console.log(userTwo);

function isBirthdayNow(user) {
        const birthdayDate = new Date(user.birthday);
        const nowDay = new Date();
        
        if(birthdayDate.getMonth() !== nowDay.getMonth()){
                return false;
        }
        if(birthdayDate.getDate() !== nowDay.getDate()){
                return false;
        }
       
        return true;
}
console.log("_____________________________________");

console.log(isBirthdayNow(user)); // false если ДР не совподает с текущим днем
console.log(isBirthdayNow(userTwo)); // true если день и мес. совпадают