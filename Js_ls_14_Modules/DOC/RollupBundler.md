### Rollup: Сборка модулей в JavaScript

**Rollup** — это современный бандлер для JavaScript, предназначенный для сборки модульного кода (в первую очередь ES Modules, но также поддерживает CommonJS) в единый файл или несколько файлов, оптимизированных для выполнения в браузере или Node.js. 

Rollup особенно популярен для создания библиотек и приложений благодаря эффективному **tree-shaking** (удалению неиспользуемого кода) и компактному выходному коду. 

Он конкурирует с Webpack, но ориентирован на более простую конфигурацию и меньший размер бандлов.

#### Когда использовать Rollup:

Rollup подходит для:
- **Создания библиотек:** Компактный код и поддержка форматов (ESM, CJS, UMD) делают Rollup идеальным для npm-пакетов.
- **Проектов с ES Modules:** Максимальная эффективность tree-shaking работает с ESM.
- **Оптимизации размера:** Когда важен минимальный размер бандла (например, для браузеров).
- **Простых приложений:** Если не нужны сложные функции Webpack (например, hot module replacement).

Rollup менее подходит для:
- Сложных веб-приложений с динамической загрузкой ресурсов (Webpack или Vite лучше).
- Проектов, сильно зависящих от CommonJS, где требуется сложная совместимость.

#### Основные возможности:

- **Tree-shaking:** Удаляет неиспользуемый код, основываясь на статическом анализе ESM.
- **Форматы вывода:** Поддерживает ESM, CommonJS, UMD, IIFE, AMD и другие.
- **Плагины:** Расширяют функциональность (например, поддержка TypeScript, CSS, JSON).
- **Модульность:** Обрабатывает ES Modules нативно, CommonJS — через плагины.
- **Source maps:** Упрощают отладку в браузере.
- **Code splitting:** Поддерживает разделение кода для асинхронной загрузки.

#### Процесс сборки с Rollup:

1. **Установка зависимостей:** Определите точку входа (`input`) и выходной файл (`output`).
2. **Анализ зависимостей:** Rollup строит граф зависимостей, начиная с `import`/`require`.
3. **Трансформация:** Плагины преобразуют код (например, Babel для ES5, TypeScript в JS).
4. **Tree-shaking:** Удаление неиспользуемого кода (только для ESM).
5. **Оптимизация:** Минификация через плагины (например, `@rollup/plugin-terser`).
6. **Генерация бандла:** Создание выходного файла в указанном формате.

#### Примеры:

##### Пример 1: Сборка ESM-модуля:
**Проект:**

```
project/
├── src/
│   ├── index.js
│   ├── math.js
├── package.json
├── rollup.config.js
```

**math.js:**

```javascript
export function add(a, b) {
  return a + b;
}

export function unused() {
  return 'This will be removed';
}
```

**index.js:**

```javascript
import { add } from './math.js';
console.log(add(2, 3));
```

**package.json:**

```json
{
  "name": "rollup-esm-example",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "rollup -c"
  },
  "devDependencies": {
    "rollup": "^3.2.5",
    "@rollup/plugin-terser": "^0.4.0"
  }
}
```

**rollup.config.js:**

```javascript
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife', // Для браузеров
    name: 'MyApp', // Глобальное имя для IIFE
    sourcemap: true
  },
  plugins: [terser()] // Минификация
};
```

**Команда для сборки:**

```bash
npm install
npm run build
```

**Результат:** `dist/bundle.js` содержит минифицированный код с удаленной функцией `unused` (благодаря tree-shaking).

**Использование в HTML:**

```javascript
<!DOCTYPE html>
<html>
<head>
  <title>Rollup ESM</title>
</head>
<body>
  <script src="dist/bundle.js"></script>
</body>
</html>
```

##### Пример 2: Сборка CommonJS-модуля:

**Проект:**

```
project/
├── src/
│   ├── index.js
│   ├── math.js
├── package.json
├── rollup.config.js
```

**math.js:**

```javascript
module.exports = {
  add: (a, b) => a + b
};
```

**index.js:**

```javascript
const { add } = require('./math');
console.log(add(2, 3));
```

**package.json:**

```json
{
  "name": "rollup-cjs-example",
  "version": "1.0.0",
  "scripts": {
    "build": "rollup -c"
  },
  "devDependencies": {
    "rollup": "^3.2.5",
    "@rollup/plugin-commonjs": "^22.0.2",
    "@rollup/plugin-terser": "^0.4.0"
  }
}
```

**rollup.config.js:**

```javascript
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs', // Для Node.js
    sourcemap: true
  },
  plugins: [commonjs(), terser()]
};
```

**Команда для сборки:**

```bash
npm install
npm run build
```

**Результат:** `dist/bundle.js` содержит преобразованный CommonJS-код, пригодный для Node.js.

##### Пример 3: Сборка библиотеки с несколькими форматами:

**rollup.config.js:**

```javascript
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/bundle.esm.js',
        format: 'es', // Для ESM
        sourcemap: true
      },
      {
        file: 'dist/bundle.umd.js',
        format: 'umd', // Для браузеров и Node.js
        name: 'MyLibrary',
        sourcemap: true
      }
    ],
    plugins: [terser()]
  }
];
```

**Особенности:**
- Создает два бандла: ESM (`bundle.esm.js`) и UMD (`bundle.umd.js`) для разных сред.
- UMD подходит для глобального использования в браузерах (например, через `<script>`).

#### Популярные плагины Rollup:

- `@rollup/plugin-commonjs`: Поддержка CommonJS-модулей.
- `@rollup/plugin-node-resolve`: Разрешение путей для npm-пакетов.
- `@rollup/plugin-babel`: Трансформация ES6+ в ES5.
- `@rollup/plugin-terser`: Минификация кода.
- `@rollup/plugin-json`: Импорт JSON-файлов.
- `@rollup/plugin-typescript`: Поддержка TypeScript.
- `rollup-plugin-postcss`: Обработка CSS.

#### Best practices:

- **Используйте ESM:** Предпочитайте ES Modules для tree-shaking и нативной поддержки.
- **Многократные выходы:** Создавайте разные форматы (ESM, UMD, CJS) для библиотек:
  
  ```json
  "main": "dist/bundle.cjs.js",
  "module": "dist/bundle.esm.js"
  ```
- **Source maps:** Включите `sourcemap: true` для отладки.
- **Минификация:** Используйте `@rollup/plugin-terser` для продакшена.
- **Плагины:** Добавляйте только необходимые плагины, чтобы не усложнять сборку.
- **Code splitting:** Используйте динамический `import()` для разделения кода:

  ```javascript
  const { fn } = await import('./module.js');
  ```
- **Совместимость:** Для старых браузеров используйте Babel с `@rollup/plugin-babel` и `browserslist`.
- **Чистота кода:** Убедитесь, что экспорты ESM статичны для эффективного tree-shaking.
- **Оптимизация:** Проверяйте размер бандла с помощью `rollup-plugin-analyzer`.

#### Rollup vs. Webpack:

- **Rollup:**
  - Лучше для библиотек и компактных бандлов.
  - Эффективный tree-shaking.
  - Простая конфигурация.
  - Меньше возможностей для сложных приложений.
- **Webpack:**
  - Универсальный, подходит для сложных веб-приложений.
  - Поддерживает hot module replacement и сложные лоадеры.
  - Более громоздкая конфигурация.

#### Итог:

Rollup — мощный и легкий бандлер, идеальный для создания библиотек и приложений с ES Modules. Он обеспечивает компактные бандлы благодаря tree-shaking и поддерживает CommonJS через плагины.

Для сложных приложений с динамической загрузкой рассмотрите Webpack или Vite.