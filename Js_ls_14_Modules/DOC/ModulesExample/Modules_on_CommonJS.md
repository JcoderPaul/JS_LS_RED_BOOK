### Создание модулей на CommonJS

CommonJS (CJS) — это система модулей, широко используемая в Node.js для создания изолированных, переиспользуемых единиц кода. 

Модули в CommonJS позволяют экспортировать функции, объекты или значения через `module.exports` или `exports` и импортировать их с помощью `require()`. 

Каждый файл в CommonJS является модулем с собственной областью видимости, что предотвращает загрязнение глобального пространства имен.

#### Основы создания модулей:

- **Экспорт:** Модуль определяет, что экспортировать, через `module.exports` (основной объект экспорта) или `exports` (алиас для `module.exports`).
- **Импорт:** Функция `require(path)` синхронно загружает модуль по указанному пути (относительному, абсолютному или имени npm-пакета).
- **Особенности:**
  - Модули кэшируются: повторный `require()` возвращает тот же объект.
  - Переменные, не экспортированные, остаются приватными.
  - Расширения файлов (`.js`) можно опускать в `require()`.
- **Использование:** Подходит для серверных приложений Node.js, но требует бандлеров (например, Webpack) для работы в браузерах.

#### Примеры создания и использования модулей:

Ниже приведены примеры, демонстрирующие различные способы создания модулей на CommonJS, включая экспорт функций, объектов, классов и работу с npm-пакетами.

##### Пример 1: Экспорт функций (math.js):

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Экспорт через module.exports
module.exports = {
  add,
  subtract
};

// Альтернативный синтаксис через exports
// exports.add = add;
// exports.subtract = subtract;
```

**Импорт и использование (app.js):**

```javascript
// app.js
const math = require('./math');

console.log(math.add(5, 3));      // 8
console.log(math.subtract(5, 3)); // 2
```

**Особенности:**
- Экспортируется объект с двумя функциями.
- `require('./math')` загружает модуль по относительному пути.
- Расширение `.js` опущено, так как Node.js автоматически его подразумевает.

##### Пример 2: Экспорт одной функции:

```javascript
// greet.js
module.exports = function greet(name) {
  return `Hello, ${name}!`;
};
```

**Импорт и использование:**

```javascript
// app.js
const greet = require('./greet');

console.log(greet('Alice')); // Hello, Alice!
```

**Особенности:**
- `module.exports` перезаписан одной функцией, которая становится основным экспортом.
- Импортируемая функция вызывается напрямую.

##### Пример 3: Модуль с приватными данными (counter.js):

```javascript
// counter.js
let count = 0; // Приватная переменная

module.exports = {
  increment: function(step = 1) {
    count += step;
    return count;
  },
  getCount: function() {
    return count;
  }
};
```

**Импорт и использование:**

```javascript
// app.js
const counter = require('./counter');

console.log(counter.getCount());    // 0
console.log(counter.increment(2));  // 2
console.log(counter.getCount());    // 2
// console.log(counter.count);      // undefined (count приватна)
```

**Особенности:**
- `count` недоступна снаружи, обеспечивая инкапсуляцию.
- Публичный API предоставляет методы для работы с приватным состоянием.

##### Пример 4: Экспорт класса:

```javascript
// user.js
class User {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

module.exports = User;
```

**Импорт и использование:**
```javascript
// app.js
const User = require('./user');

const user = new User('Bob');
console.log(user.getName()); // Bob
```

**Особенности:**
- Класс экспортируется как единый объект.
- Импортируется и используется как конструктор.

##### Пример 5: Работа с npm-модулем:

```javascript
// utils.js
const _ = require('lodash'); // Импорт npm-пакета lodash

module.exports = {
  capitalize: function(str) {
    return _.capitalize(str);
  },
  unique: function(arr) {
    return _.uniq(arr);
  }
};
```

**Импорт и использование:**

```javascript
// app.js
const utils = require('./utils');

console.log(utils.capitalize('hello')); // Hello
console.log(utils.unique([1, 2, 2, 3])); // [1, 2, 3]
```

**Особенности:**
- Внешний npm-пакет (`lodash`) импортируется через `require`.
- Модуль предоставляет обертку над функциями библиотеки.

##### Пример 6: Реэкспорт нескольких модулей (index.js):

```javascript
// folder/index.js
module.exports = {
  math: require('./math'),
  counter: require('./counter')
};
```

**Импорт и использование:**

```javascript
// app.js
const { math, counter } = require('./folder');

console.log(math.add(10, 5));       // 15
console.log(counter.increment(1));  // 1
```

**Особенности:**
- `index.js` выступает как агрегатор, упрощая импорт из папки.
- Используется для группировки связанных модулей.

#### Best practices для CommonJS:

- **Используйте `module.exports`:** Предпочитайте `module.exports` вместо `exports`, чтобы избежать ошибок при перезаписи (`exports = {}` ломает связь с `module.exports`).
- **Инкапсуляция:** Скрывайте внутренние данные, экспортируя только публичный API.
- **Ясные имена:** Называйте экспортируемые функции и переменные понятно (например, `add` вместо `fn1`).
- **Импорты в начале:** Размещайте `require()` в начале файла для предсказуемости.
- **Обработка ошибок:** Проверяйте наличие модуля для динамических путей:

  ```javascript
  let module;
  try {
    module = require('./optionalModule');
  } catch (e) {
    console.error('Module not found');
  }
  ```
- **Избегайте глобальных изменений:** Не модифицируйте `global` или `process` в модулях.
- **Организация:** Группируйте связанные функции в одном модуле. Используйте `index.js` для реэкспорта из папок.
- **Совместимость с ESM:** Если проект может перейти на ES Modules, планируйте миграцию, добавив `"type": "module"` в `package.json` или используя `.mjs`.
- **Документация:** Комментируйте публичный API модуля для удобства поддержки.

#### Пример полной структуры:

**Проект:**

```
project/
├── math.js
├── counter.js
├── index.js
├── app.js
└── package.json
```

**math.js:**

```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };
```

**counter.js:**

```javascript
let count = 0;

module.exports = {
  increment: function(step = 1) {
    count += step;
    return count;
  },
  getCount: function() {
    return count;
  }
};
```

**index.js:**

```javascript
module.exports = {
  math: require('./math'),
  counter: require('./counter')
};
```

**app.js:**

```javascript
const { math, counter } = require('./index');

console.log(math.add(5, 3));        // 8
console.log(math.subtract(5, 3));   // 2
console.log(counter.increment(2));  // 2
console.log(counter.getCount());    // 2
```

**package.json:**

```json
{
  "name": "cjs-example",
  "version": "1.0.0",
  "main": "app.js"
}
```

**Запуск:** Выполните `node app.js` в терминале.

#### Итог:

CommonJS — простая и надежная система для создания модулей в Node.js, особенно для серверных приложений. 

Она поддерживает синхронную загрузку, инкапсуляцию и работу с npm-пакетами. 

Однако в новых проектах рекомендуется переходить на ES Modules для стандартизации и оптимизаций (например, tree-shaking).