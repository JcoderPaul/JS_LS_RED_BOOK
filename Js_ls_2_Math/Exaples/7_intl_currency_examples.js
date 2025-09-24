'use strict';

const optionsRU = {
        style: 'currency',
        currency: 'RUB'
}

const optionsUS = {
        style: 'currency',
        currency: 'USD'
}


console.log(new Intl.NumberFormat('ru-RU', optionsRU).format(54000)); // 54 000,00 ₽
console.log(new Intl.NumberFormat('ru-RU', optionsUS).format(54000)); // 54 000,00 $

console.log(new Intl.NumberFormat('en-US', optionsUS).format(54000)); // $54,000.00
console.log(new Intl.NumberFormat('en-US', optionsRU).format(54000)); // RUB 54,000.00