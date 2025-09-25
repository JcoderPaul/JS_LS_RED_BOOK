'use strict'

const date_1 = new Date(2023,10,15);
const date_2 = new Date(2023,11,15);

console.log(date_1); // 2023-11-14T19:00:00.000Z
console.log(date_2); // 2023-12-14T19:00:00.000Z
console.log(date_2 - date_1); // 2592000000 - это мс.


function countDayBetweenDates(dayFirst, daySecond){
        return (daySecond - dayFirst) / (1000 * 60 * 60 * 24)
}

console.log(countDayBetweenDates(date_1, date_2)); // 30 дн.

