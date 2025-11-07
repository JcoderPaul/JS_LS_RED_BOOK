Управление зависимостями в NPM осуществляется с помощью команд, которые взаимодействуют с файлами `package.json` и `package-lock.json`. 

Эти команды позволяют устанавливать, обновлять, удалять и проверять зависимости в JavaScript/Node.js проектах. 

Ниже приведены основные команды для управления зависимостями с кратким описанием их назначения.

### Основные команды для управления зависимостями в NPM:

1. **Установка зависимостей**
   - **`npm install <package>`** (или `npm i <package>`):
     - Устанавливает пакет и добавляет его в `dependencies` в `package.json`.
     - Пример: `npm install express` добавляет `"express": "^4.18.2"`.
     - Создаёт/обновляет `package-lock.json` с точной версией.
   - **`npm install --save-dev <package>`** (или `npm i -D <package>`):
     - Устанавливает пакет как dev-зависимость и добавляет в `devDependencies`.
     - Пример: `npm install --save-dev jest`.
   - **`npm install <package>@<version>`**:
     - Устанавливает конкретную версию пакета.
     - Пример: `npm install express@4.18.2`.
   - **`npm install`** (без аргументов):
     - Устанавливает все зависимости из `package.json` и `package-lock.json` в `node_modules`.
     - Используется для инициализации проекта.
   - **`npm install --global <package>`** (или `npm i -g <package>`):
     - Устанавливает пакет глобально для использования в CLI.
     - Пример: `npm install -g typescript`.
   - **`npm ci`**:
     - Устанавливает зависимости строго по `package-lock.json`, игнорируя диапазоны версий в `package.json`.
     - Быстрее и надёжнее для CI/CD, требует наличия `package-lock.json`.
     - Пример: `npm ci` для воспроизводимой установки.

2. **Удаление зависимостей**
   - **`npm uninstall <package>`**:
     - Удаляет пакет из `package.json` (из `dependencies` или `devDependencies`) и из `node_modules`.
     - Обновляет `package-lock.json`.
     - Пример: `npm uninstall express`.
   - **`npm uninstall --save-dev <package>`**:
     - Удаляет пакет из `devDependencies`.
     - Пример: `npm uninstall --save-dev jest`.
   - **`npm prune`**:
     - Удаляет из `node_modules` пакеты, не указанные в `package.json`.
     - Полезно для очистки после ручного удаления зависимостей.

3. **Обновление зависимостей**
   - **`npm update`**:
     - Обновляет все зависимости до последних совместимых версий, указанных в `package.json` (с учётом диапазонов, например, `^4.18.2` до последней `4.x.x`).
     - Обновляет `package-lock.json`.
     - Пример: `npm update express`.
   - **`npm update <package>`**:
     - Обновляет конкретный пакет до последней совместимой версии.
     - Пример: `npm update express`.
   - **`npm install <package>@latest`**:
     - Устанавливает последнюю версию пакета, обновляя `package.json`.
     - Пример: `npm install express@latest`.

4. **Проверка зависимостей**
   - **`npm outdated`**:
     - Показывает устаревшие зависимости, сравнивая текущие версии с последними доступными.
     - Выводит таблицу с колонками: Current, Wanted, Latest.
     - Пример: `npm outdated`.
   - **`npm list`**:
     - Показывает дерево всех установленных зависимостей с их версиями.
     - Для верхнего уровня: `npm list --depth=0`.
     - Пример: `npm list --depth=0`.

5. **Аудит и безопасность**
   - **`npm audit`**:
     - Проверяет зависимости на известные уязвимости, используя данные из `package-lock.json`.
     - Выводит отчёт с описанием проблем и рекомендациями.
     - Пример: `npm audit`.
   - **`npm audit fix`**:
     - Автоматически исправляет уязвимости, устанавливая безопасные версии пакетов.
     - Может обновить `package.json` и `package-lock.json`.
     - Пример: `npm audit fix`.
   - **`npm audit fix --force`**:
     - Более агрессивное исправление, может обновить мажорные версии (осторожно, возможны breaking changes).
     - Пример: `npm audit fix --force`.

6. **Дополнительные команды**
   - **`npm dedupe`**:
     - Оптимизирует структуру `node_modules`, устраняя дублирующиеся зависимости.
     - Обновляет `package-lock.json`.
     - Пример: `npm dedupe`.
   - **`npm cache clean --force`**:
     - Очищает кэш NPM, полезно при проблемах с установкой.
     - Пример: `npm cache clean --force`.
   - **`npm install ./path/to/local-package`**:
     - Устанавливает локальный пакет (например, для тестирования).
     - Добавляет в `package.json` путь, например: `"local-package": "file:./path/to/local-package"`.

### Пример сценария работы с зависимостями:
1. Инициализация проекта:
   ```
   npm init -y
   ```
2. Установка зависимостей:
   ```
   npm install express
   npm install --save-dev jest
   ```
   - Создаётся `package.json` с `"express": "^4.18.2"` в `dependencies` и `"jest": "^29.7.0"` в `devDependencies`.
   - Генерируется `package-lock.json` с точными версиями.
3. Проверка устаревших пакетов:
   ```
   npm outdated
   ```
4. Обновление:
   ```
   npm update express
   ```
5. Проверка уязвимостей:
   ```
   npm audit
   npm audit fix
   ```
6. Удаление ненужного пакета:
   ```
   npm uninstall jest
   ```
7. Полная переустановка (для устранения проблем):
   ```
   rm -rf node_modules package-lock.json && npm install
   ```

### Полезные советы:

- **Коммитьте `package-lock.json`**: Всегда включайте его в репозиторий для воспроизводимости.
- **Используйте `npm ci` в CI/CD**: Для быстрой и точной установки зависимостей.
- **Диапазоны версий**:
  - `^4.18.2`: Обновления до `4.x.x` (минорные и патчи).
  - `~4.18.2`: Только патчи (`4.18.x`).
  - `4.18.2`: Точная версия.
- **Решение конфликтов**: При конфликтах в `package-lock.json` в Git выполните `npm install` для автоматического разрешения.
- **Очистка**: Если зависимости "сломались", удалите `node_modules` и `package-lock.json`, затем выполните `npm install`.
- **Избегайте глобальных установок**: Устанавливайте зависимости локально, если они нужны только в проекте.

Документация: [docs.npmjs.com](https://docs.npmjs.com/cli/v10/using-npm/dependency-management).