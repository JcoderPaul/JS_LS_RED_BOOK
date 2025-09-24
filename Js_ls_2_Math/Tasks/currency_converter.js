'use strict';

/*
        Написать функцию, которая принимает 3-и параметра:
           - Сумма
           - Валюта исходная
           - Валюта в которую нужно сконвертировать
        И возвращает строку уже сконвертированной суммы с постфиксом
        валюты. 
        Если конвертация не удалась - null. 
        Для примера 3-и валюты.
*/

function currencyConverter(sum, fromCurrency, toCurrency){
        const allCurrencies = [
                {name: 'USD', mult: 1 },
                {name: 'RUB', mult: 1/60 },
                {name: 'EUR', mult: 1.1 },
        ];

        function currencyTest(forTestCur){
            const testCur = allCurrencies.find(cur => cur.name === forTestCur);
            if(testCur) { // undefined - false, но 'USD' - true 
                return testCur;
            } else {
                return false;
            }        
        }

        const fromCur = currencyTest(fromCurrency);
        const toCur = currencyTest(toCurrency);

        if(fromCur === false || toCur === false){
                return null
        } else {
                return new Intl
                        .NumberFormat('ru-RU', { style: 'currency', currency: toCur.name })
                        .format(sum * fromCur.mult / toCur.mult);
        }                
}

/* Test */

console.log(currencyConverter(10000, 'RUB', 'USD')); // 166,67 $
console.log(currencyConverter(10000, 'RUB', 'EUR')); // 151,52 €
console.log(currencyConverter(100, 'USD', 'RUB')); // 6 000,00 ₽
console.log(currencyConverter(100, 'USD', 'EUR')); // 90,91 €
console.log(currencyConverter(100, 'EUR', 'RUB')); // 6 600,00 ₽
console.log(currencyConverter(100, 'YN', 'USD')); // null
console.log(currencyConverter(100, 'RUB', 'FR')); // null