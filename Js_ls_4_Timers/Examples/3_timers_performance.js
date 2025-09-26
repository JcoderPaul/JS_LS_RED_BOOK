'use strict';

const start = performance.now();
let finish;

console.log(start);  // 26 - 46 мс.

function shift() {
        return performance.now();
}

setTimeout(() => finish = shift(), 1000); // Замерит через 1026 - 1048 мс., т.е. →

/* Значит значение можно получить и отобразить не раньше чем оно будет возвращено, даем задержку с запасом */
setTimeout(() => console.log(finish), 1100);

setTimeout(() => {
        const final = performance.now();
        console.log(final - start);
}, 1200);