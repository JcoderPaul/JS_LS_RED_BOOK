### Создание модулей на ES6 (ES Modules)

ES Modules (ESM) — это стандартная система модулей, введенная в ECMAScript 2015 (ES6), для организации кода в JavaScript. 

ESM позволяет создавать изолированные, переиспользуемые модули с использованием ключевых слов `export` и `import`. 

Она поддерживается в современных браузерах и Node.js (с версии 12+), обеспечивая статический анализ, tree-shaking (удаление неиспользуемого кода) и асинхронную загрузку. 

ESM предпочтительна для новых проектов благодаря стандартизации и оптимизациям.

#### Основы создания модулей:

- **Экспорт:** Используйте `export` для именованных экспортов (функций, объектов, классов) или `export default` для основного экспорта модуля.
- **Импорт:** Используйте `import` для статического импорта (в начале файла) или динамический `import()` для асинхронной загрузки.
- **Особенности:**
  - Каждый файл — модуль с собственной областью видимости; неэкспортированные переменные приватны.
  - Импорты read-only и "живые" (live bindings): изменения в экспортируемом модуле отражаются в импортирующем.
  - В Node.js требуется расширение `.js` (или `.mjs`) в путях импорта и настройка `"type": "module"` в `package.json`.
  - В браузерах модули подключаются через `<script type="module">` и подчиняются CORS.
  - Модули автоматически работают в `"use strict"`.
- **Кэширование:** Модули загружаются один раз и кэшируются (singleton-поведение).

#### Примеры создания и использования модулей:

##### Пример 1: Экспорт функций (math.js):

```javascript
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;
```

**Импорт и использование (app.js):**

```javascript
import { add, subtract, PI as piValue } from './math.js';

console.log(add(5, 3));      // 8
console.log(subtract(5, 3)); // 2
console.log(piValue);        // 3.14159
```

**Особенности:**
- Именованные экспорты (`add`, `subtract`, `PI`) позволяют импортировать только нужные элементы.
- Переименование через `as` (`PI as piValue`) избегает конфликтов имен.
- Полное расширение `./math.js` обязательно в Node.js.

##### Пример 2: Экспорт по умолчанию (greet.js):

```javascript
export default function greet(name) {
  return `Hello, ${name}!`;
}
```

**Импорт и использование:**

```javascript
import greet from './greet.js';

console.log(greet('Alice')); // Hello, Alice!
```

**Особенности:**
- `export default` используется для одного основного экспорта.
- При импорте можно использовать любое имя (без `{}`), так как это дефолтный экспорт.

##### Пример 3: Модуль с приватными данными (counter.js):

```javascript
let count = 0; // Приватная переменная

export const increment = (step = 1) => {
  count += step;
  return count;
};

export const getCount = () => count;
```

**Импорт и использование:**

```javascript
import { increment, getCount } from './counter.js';

console.log(getCount());    // 0
console.log(increment(2)); // 2
console.log(getCount());   // 2
```

**Особенности:**
- `count` приватна, так как не экспортируется.
- Стрелочные функции используются для краткости.
- Live binding: изменения `count` отражаются во всех импортах.

##### Пример 4: Экспорт класса (user.js):

```javascript
export class User {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}
```

**Импорт и использование:**

```javascript
import { User } from './user.js';

const user = new User('Bob');
console.log(user.getName()); // Bob
```

**Особенности:**
- Класс экспортируется как именованный экспорт.
- Может быть также `export default class User { ... }`.

##### Пример 5: Динамический импорт:

```javascript
async function loadMath() {
  const { add } = await import('./math.js');
  console.log(add(1, 2)); // 3
}

loadMath();
```

**Особенности:**
- `import()` возвращает Promise, позволяя загружать модули асинхронно.
- Полезно для lazy loading (например, загрузка модуля по событию).

##### Пример 6: Реэкспорт (index.js):

```javascript
export * from './math.js'; // Реэкспорт всех именованных экспортов
export { increment } from './counter.js';
```

**Импорт и использование:**

```javascript
import { add, increment } from './index.js';

console.log(add(5, 3));     // 8
console.log(increment(2));  // 2
```

**Особенности:**
- `index.js` упрощает импорт из папки, объединяя экспорты.
- `export *` реэкспортирует все именованные экспорты из указанного модуля.

##### Пример 7: Работа в браузере (index.html):

```html
<!DOCTYPE html>
<html>
<head>
  <title>ESM Example</title>
</head>
<body>
  <script type="module">
    import { add } from './math.js';
    console.log(add(2, 3)); // 5
  </script>
</body>
</html>
```

**Особенности:**
- Тег `<script type="module">` включает поддержку ESM в браузере.
- Требуется локальный сервер (например, `live-server`) для избежания CORS-ошибок.

#### Настройка для Node.js:

Для использования ESM в Node.js добавьте в `package.json`:

```json
{
  "type": "module"
}
```
Или используйте расширение `.mjs` для файлов.

#### Best practices:

- **Именованные экспорты:** Предпочитайте `export { name }` для нескольких значений, используйте `export default` только для основного экспорта.
- **Явные пути:** Указывайте расширения (например, `./math.js`) в Node.js для консистентности.
- **Приватность:** Не экспортируйте внутренние данные, оставляя их приватными:

  ```javascript
  const privateData = 'secret'; // Не экспортируется
  export const getData = () => privateData;
  ```
- **Импорты в начале:** Размещайте `import` в начале файла, группируя по типу:

  ```javascript
  import fs from 'fs'; // Встроенные
  import _ from 'lodash'; // Внешние
  import { add } from './math.js'; // Локальные
  ```
- **Динамический импорт:** Используйте `import()` для условной или отложенной загрузки:

  ```javascript
  if (condition) {
    const { feature } = await import('./feature.js');
  }
  ```
- **Реэкспорт:** Используйте `index.js` для упрощения импорта из папок.
- **Tree-shaking:** Убедитесь, что бандлер настроен на `"production"` для оптимизации.
- **Совместимость:** Для работы с CommonJS-модулями импортируйте через `default`:

  ```javascript
  import _ from 'lodash'; // CJS-модуль
  ```
- **CORS в браузере:** Запускайте через локальный сервер (например, `npx serve`) для избежания ошибок `file://`.

#### Итог:

ES Modules — современный стандарт для создания модулей, обеспечивающий изоляцию, tree-shaking и асинхронную загрузку. 

Приведенные примеры показывают, как экспортировать функции, классы, объекты и использовать реэкспорт или динамический импорт. 

Для новых проектов используйте ESM, но учитывайте совместимость с CommonJS в Node.js или legacy-коде.