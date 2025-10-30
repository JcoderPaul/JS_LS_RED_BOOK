'use strict';

/* Если мы объявим переменную с одинаковым именем в обоих файлах то будет ошибка: */
const a = 1; // Identifier 'a' has already been declared (at js_script.js:1:1)

function add(f, s){
        return f + s;
}

function sub(f, s){
        return f - s;
}