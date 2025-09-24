'use strict';

const optionsDec = {
        style: 'decimal'
}

const optionsPer = {
        style: 'percent'
}

const optionsCel = {
        style: 'unit',
        unit: 'celsius'
}


console.log(new Intl.NumberFormat('ru-RU', optionsDec).format(54000)); // 54 000
console.log(new Intl.NumberFormat('ru-RU', optionsPer).format(54000)); // 5 400 000 %
console.log(new Intl.NumberFormat('ru-RU', optionsPer).format(0.5)); // 50 %

console.log(new Intl.NumberFormat('ru-RU', optionsCel).format(0.5)); // 0,5 °C

