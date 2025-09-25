'use strict'

const date = new Date();

const formatter = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'full',
    timeStyle: 'short'
});
console.log(formatter.format(date)); // "вторник, 9 сентября 2025 г. в 17:14"

const formatter2 = new Intl.DateTimeFormat('ru-RU').format(date);
console.log(formatter2); // 09.09.2025

const opt_1 = {
    hour: 'numeric',
    minute: 'numeric'
}
console.log(new Intl.DateTimeFormat('ru-RU', opt_1).format(date)); // 17:23
console.log(new Intl.DateTimeFormat('en-US', opt_1).format(date)); // 5:24 PM

const opt_2 = {
    hour: 'numeric',
    minute: 'numeric',
    month: 'long'
}

console.log(new Intl.DateTimeFormat('ru-RU', opt_2).format(date)); // сентябрь в 17:25
console.log(new Intl.DateTimeFormat('en-US', opt_2).format(date)); // September at 5:25 PM

const opt_3 = {
    hour: 'numeric',
    minute: 'numeric',
    month: 'long',
    weekday: 'short',
    year: '2-digit'
}

console.log(new Intl.DateTimeFormat('ru-RU', opt_3).format(date)); // сентябрь 25 г. вт в 17:27
console.log(new Intl.DateTimeFormat('en-US', opt_3).format(date)); // September 25 Tue at 5:27 PM