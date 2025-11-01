### Использование `await` на верхнем уровне в ES Modules

Начиная с ECMAScript 2020, JavaScript поддерживает использование `await` на верхнем уровне (top-level `await`) в **ES Modules** (ESM). 

Это позволяет выполнять асинхронные операции непосредственно в теле модуля, без необходимости оборачивать код в асинхронную функцию (`async function`). 

Top-level `await` упрощает работу с асинхронным кодом, особенно при инициализации модулей, загрузке данных или динамическом импорте.

#### Когда применяется:

Top-level `await` используется в следующих случаях:
- **Инициализация модуля:** Загрузка данных (например, из API или файла) при старте модуля.
- **Динамический импорт:** Асинхронная загрузка других модулей на основе условий.
- **Упрощение кода:** Избежание лишних `async` функций для простых асинхронных операций.
- **Сценарии, где важен порядок выполнения:** Когда модуль должен завершить асинхронную операцию перед экспортом.

Top-level `await` работает **только в ES Modules** (файлы с расширением `.mjs` или с `"type": "module"` в `package.json` для Node.js, либо в `<script type="module">` в браузере). 

В CommonJS или скриптах без модулей он вызовет синтаксическую ошибку.

#### Как применяется:

- `await` можно использовать прямо в теле модуля, если он является ESM.
- Модуль становится асинхронным, и его импорт блокирует выполнение до завершения всех top-level `await`.
- Экспорты становятся доступны только после выполнения всех асинхронных операций.
- В Node.js требуется `"type": "module"` в `package.json` или расширение `.mjs`.

#### Примеры:

##### Пример 1: Загрузка данных из API

```javascript
const response = await fetch('https://api.example.com/data');
const data = await response.json();

export const processedData = data.map(item => item.name);
```

**Импорт и использование:**

```javascript
import { processedData } from './data.js';

console.log(processedData); // Список имен из API
```

**Особенности:**
- `fetch` выполняется на верхнем уровне, и `processedData` экспортируется только после получения данных.
- Импортирующий модуль (`app.js`) ждет завершения `await` в `data.js`.

##### Пример 2: Динамический импорт модуля:

```javascript
const condition = true;

const module = await import(condition ? './math.js' : './utils.js');
export const result = module.add ? module.add(2, 3) : module.someUtil();
```

**math.js:**

```javascript
export function add(a, b) {
  return a + b;
}
```

**Импорт и использование:**

```javascript
import { result } from './dynamic.js';

console.log(result); // 5 (результат add(2, 3))
```

**Особенности:**
- Динамический `import()` на верхнем уровне выбирает модуль в зависимости от условия.
- `result` экспортируется после загрузки модуля.

##### Пример 3: Инициализация с приватными данными:

```javascript
const response = await fetch('https://api.example.com/config');
const config = await response.json();

export function getConfig(key) {
  return config[key] || null;
}
```

**Импорт и использование:**

```javascript
import { getConfig } from './config.js';

console.log(getConfig('apiKey')); // Значение из API
```

**Особенности:**
- `config` приватна, так как не экспортируется.
- Модуль завершает загрузку данных перед экспортом функции.

##### Пример 4: Top-level `await` в браузере:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Top-Level Await</title>
</head>
<body>
  <script type="module">
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  </script>
</body>
</html>
```

**Особенности:**
- Требуется `<script type="module">` для ESM.
- Запускайте через локальный сервер (например, `npx serve`) для избежания CORS-ошибок.

#### Особенности:

- **Асинхронность:** Top-level `await` делает модуль асинхронным. Импортирующие модули ждут завершения всех `await` в импортируемом модуле.
- **Ограничение:** Работает только в ESM. В CommonJS или обычных скриптах вызовет ошибку: `SyntaxError: await is only valid in async function`.
- **Зависимости:** Если модуль A использует top-level `await`, модуль B, импортирующий A, не выполнится, пока A не завершит свои асинхронные операции.
- **Ошибки:** Обрабатывайте ошибки с `try/catch`:

  ```javascript
  try {
    const data = await fetch('https://api.example.com/data');
    export const result = await data.json();
  } catch (e) {
    console.error('Failed to load data:', e);
  }
  ```
- **Совместимость:** Поддерживается в Node.js 14+ и современных браузерах (Chrome 89+, Firefox 89+, Safari 15+). Для старых окружений используйте транспиляцию (Babel).

#### Best practices:

- **Используйте в ESM:** Убедитесь, что проект настроен на ES Modules (`"type": "module"` в `package.json` или `.mjs`).
- **Обрабатывайте ошибки:** Всегда используйте `try/catch` для асинхронных операций, чтобы избежать необработанных исключений.
- **Минимизируйте задержки:** Избегайте долгих операций на верхнем уровне, чтобы не блокировать импорт других модулей.
- **Приватность:** Храните данные, полученные через `await`, как приватные, экспортируя только необходимые функции:

  ```javascript
  const data = await fetchData();
  export const getData = () => data;
  ```
- **Динамический импорт:** Если загрузка модуля зависит от условий, используйте `import()` вместо top-level `await`:

  ```javascript
  if (condition) {
    const { fn } = await import('./module.js');
  }
  ```
- **Оптимизация:** Убедитесь, что бандлер (Webpack, Rollup) настроен на `"production"` для tree-shaking.
- **CORS в браузере:** Для `fetch` в браузере настройте сервер с правильными заголовками CORS или используйте прокси.
- **Документация:** Комментируйте асинхронные операции, чтобы объяснить их цель:

  ```javascript
  // Загружаем конфигурацию при инициализации модуля
  const config = await fetchConfig();
  ```

#### Ограничения:

- **Блокировка:** Top-level `await` может замедлить загрузку модуля, если асинхронная операция длительная.
- **Совместимость с CommonJS:** Нельзя использовать top-level `await` в CJS. Для смешанных проектов транспилируйте ESM в CJS через Babel.
- **Тестирование:** Тестирование модулей с top-level `await` сложнее, так как требуется асинхронный импорт. Используйте `await import()` в тестах.

#### Итог:

Top-level `await` упрощает асинхронные операции в ES Modules, позволяя загружать данные или модули на верхнем уровне без обертки в `async` функции. Это особенно удобно для инициализации, но требует осторожности, чтобы не блокировать выполнение.