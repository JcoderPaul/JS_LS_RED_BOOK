### Модульность в JavaScript

Модульность в JavaScript — это подход к организации кода, при котором программа разбивается на независимые, самодостаточные единицы (модули), каждая из которых содержит связанные функции, переменные и классы. 

Модули позволяют экспортировать только необходимые части кода и импортировать их в другие файлы, избегая загрязнения глобального пространства имен и повышая переиспользуемость кода.

#### Когда применяется:

Модульность особенно полезна в средних и крупных проектах, где codebase становится сложным. Она применяется для:
- Улучшения поддерживаемости и читаемости кода, особенно при разработке серверных приложений, игр или мобильных приложений.
- Избегания конфликтов имен и глобального scope pollution (когда переменные доступны везде и могут переопределяться).
- Упрощения тестирования, поскольку модули изолированы и могут тестироваться отдельно.
- Оптимизации производительности за счет lazy loading (загрузки по требованию) и tree shaking (удаления неиспользуемого кода в сборке).
- Управления зависимостями в проектах с использованием пакетных менеджеров вроде npm или Yarn.

Не стоит применять модули в простых скриптах, где весь код помещается в один файл, чтобы не усложнять структуру.

#### Как применяется:

В JavaScript есть два основных стандарта модулей:
- **CommonJS (CJS)**: Используется преимущественно в Node.js. Импорт через `require()`, экспорт через `module.exports` или `exports`. Синхронный, подходит для серверной стороны.
- **ES Modules (ESM)**: Современный стандарт (ES6+), работает в браузерах и Node.js. Импорт через `import`, экспорт через `export`. Асинхронный, статический (импорты/экспорты только на верхнем уровне). Для браузера добавьте `type="module"` в тег `<script>`, для Node.js укажите `"type": "module"` в `package.json` или используйте расширение `.mjs`.

Для динамической загрузки используйте `import()` — это возвращает Promise и позволяет загружать модули условно или по событию.

В продакшене применяйте бандлеры вроде Webpack или Rollup для сборки модулей в один файл, совместимый с браузерами.

#### Примеры:

**Пример с ESM (math.js — модуль для экспорта функций):**

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export const PI = 3.14159;

export default function multiply(a, b) {
  return a * b;
}
```

**Импорт в другом файле (main.js):**

```javascript
// main.js
import multiply, { add, PI as piValue } from './math.js';  // Переименование при импорте

console.log(add(2, 3));  // 5
console.log(multiply(4, 5));  // 20
console.log(piValue);  // 3.14159
```

**Пример с CommonJS (utils.js):**

```javascript
// utils.js
const version = '1.0';
function log(message) {
  console.log(message);
}

module.exports = { version, log };
```

**Импорт:**

```javascript
// app.js
const utils = require('./utils.js');
utils.log(`Version: ${utils.version}`);
```

**Динамический импорт:**

```javascript
async function loadModule() {
  const { add } = await import('./math.js');
  console.log(add(1, 2));  // 3
}
loadModule();
```
.

#### Особенности:

- **Scope и изоляция:** Переменные в модуле локальны, если не экспортированы. Импортированные значения — read-only и являются "живыми" связями (обновления в исходном модуле отражаются в импортирующем).
- **Strict mode:** Модули всегда в "use strict", что предотвращает ошибки вроде неявных глобальных переменных.
- **Singleton:** Модули кэшируются и исполняются один раз, что полезно для сервисов с состоянием.
- **CORS и пути:** В браузерах модули подчиняются CORS, импорты требуют относительных путей (с `./` или `../`).
- **import.meta:** Объект с метаданными модуля, например, URL.
- **Совместимость:** ESM — стандарт, но для старых браузеров нужен Babel. CJS синхронный, ESM асинхронный.

#### Best practices:

- **Предпочитайте ESM:** Для новых проектов используйте ES Modules за счет tree shaking и стандартизации.
- **Консистентность:** Не смешивайте CJS и ESM в одном проекте без настройки.
- **Экспорт только необходимого:** Используйте named exports для нескольких значений, default — для основного. Избегайте множества default-экспортов.
- **Переименование:** Используйте `as` для избежания конфликтов имен.
- **Организация:** Группируйте связанные функции в один модуль (например, утилиты в `utils.js`). Используйте aggregator-файлы для реэкспорта из нескольких модулей.
- **Бандлеры:** В продакшене применяйте Webpack для оптимизации, удаления dead code и поддержки старых браузеров. Настройте `mode: "production"` для минификации.
- **Локальная разработка:** Используйте локальный сервер (например, Live Server) для избежания CORS-ошибок.
- **Позиционирование:** Размещайте экспорты в конце файла для читаемости, импорты — в начале. Избегайте импортов внутри функций (кроме dynamic import).

См. источники:
- [The JavaScript Modules Handbook – Complete Guide to ES Modules and Module Bundlers](https://www.freecodecamp.org/news/javascript-es-modules-and-module-bundlers/)
- [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Best Practices for Using JavaScript Modules](https://medium.com/swlh/best-practices-for-using-javascript-modules-6d71ff496723)
- [Best Practice Tips for Writing Your JS Modules](https://dev.to/ndesmic/best-practice-tips-for-writing-your-js-modules-40o5)
- [Full Guide to JavaScript Modules: From Chaos to Clarity](https://billennium.com/full-guide-to-javascript-modules-from-chaos-to-clarity/)
- [Basics of Modular JavaScript](https://medium.com/@crohacz_86666/basics-of-modular-javascript-2395c82dd93a)
- [Best Practices for Modular Code Design](https://blog.pixelfreestudio.com/best-practices-for-modular-code-design/)
- [JavaScript Modules (ES6 Modules) Explained: Tutorial for Beginners](https://wpshout.com/javascript-modules-tutorial/)
- [Understanding JavaScript Modules: Explanations & Examples](https://www.turing.com/kb/javascript-modules)