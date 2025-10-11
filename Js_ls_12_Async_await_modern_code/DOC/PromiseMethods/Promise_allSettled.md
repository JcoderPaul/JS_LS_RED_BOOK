**`Promise.allSettled`** — это метод в JavaScript, введённый в ES2020, предназначенный для параллельного выполнения нескольких промисов и ожидания их завершения, независимо от того, разрешились они успешно (fulfilled) или были отклонены (rejected). 

В отличие от `Promise.all`, который прерывается при первой ошибке, `Promise.allSettled` ждёт завершения **всех** промисов и возвращает результаты всех операций, включая успешные и неуспешные. 

Это делает его идеальным для сценариев, где важно получить результаты всех асинхронных операций, даже если некоторые из них завершились с ошибкой.

### Что такое `Promise.allSettled`?

`Promise.allSettled` — это статический метод объекта `Promise`, который принимает итерируемый объект (обычно массив) промисов и возвращает новый промис. Этот промис разрешается, когда **все** переданные промисы завершены (успешно или с ошибкой), возвращая массив объектов с информацией о статусе и результате каждого промиса.

### Синтаксис

```javascript
Promise.allSettled(iterable)
```
- `iterable`: Обычно массив промисов, но может быть любой итерируемый объект (например, `Set`).
- Возвращает: Промис, который разрешается массивом объектов, каждый из которых имеет свойства:
  - `{ status: 'fulfilled', value: результат }` — если промис разрешён успешно.
  - `{ status: 'rejected', reason: ошибка }` — если промис отклонён.

### Как работает?

1. **Параллельное выполнение**: Все промисы в массиве запускаются одновременно, что экономит время по сравнению с последовательным выполнением.
2. **Ожидание завершения**: `Promise.allSettled` ждёт, пока **все** промисы завершатся, независимо от их результата (успех или ошибка).
3. **Результат**: Возвращает массив объектов, описывающих статус и результат каждого промиса в том же порядке, что и входные промисы.

### Примеры:

#### 1. Простой пример с таймерами

```javascript
async function runSettled() {
    const promise1 = new Promise(resolve => setTimeout(() => resolve('Успех 1'), 1000));
    const promise2 = new Promise((_, reject) => setTimeout(() => reject('Ошибка 2'), 500));
    const promise3 = new Promise(resolve => setTimeout(() => resolve('Успех 3'), 1500));

    const results = await Promise.allSettled([promise1, promise2, promise3]);

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Промис ${index + 1}: Успех с результатом ${result.value}`);
        } else {
            console.log(`Промис ${index + 1}: Ошибка с причиной ${result.reason}`);
        }
    });
}

runSettled();
// Вывод через ~1.5 сек:
// Промис 1: Успех с результатом Успех 1
// Промис 2: Ошибка с причиной Ошибка 2
// Промис 3: Успех с результатом Успех 3
```
- Все промисы выполняются параллельно, и результаты собираются, даже если второй промис завершился с ошибкой.

#### 2. Параллельные API-запросы

```javascript
async function fetchUsers() {
    const urls = [
        'https://api.example.com/user/1',
        'https://api.example.com/user/2', // Предположим, этот запрос не удался
        'https://api.example.com/user/3'
    ];

    const promises = urls.map(url => fetch(url).then(res => res.json()).catch(err => err));
    const results = await Promise.allSettled(promises);

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Пользователь ${index + 1}:`, result.value);
        } else {
            console.log(`Ошибка для пользователя ${index + 1}:`, result.reason);
        }
    });
}

fetchUsers();
// Пример вывода:
// Пользователь 1: { id: 1, name: "User 1" }
// Ошибка для пользователя 2: TypeError: Failed to fetch
// Пользователь 3: { id: 3, name: "User 3" }
```
- Даже если один запрос не удался, остальные результаты доступны.

#### 3. Обработка смешанных данных

```javascript
async function mixedPromises() {
    const promises = [
        Promise.resolve('Синхронный успех'),
        new Promise((_, reject) => setTimeout(() => reject('Асинхронная ошибка'), 1000)),
        42, // Не-промис автоматически разрешается
        Promise.resolve('Другой успех')
    ];

    const results = await Promise.allSettled(promises);
    console.log(results);
}

mixedPromises();
// Вывод:
// [
//   { status: 'fulfilled', value: 'Синхронный успех' },
//   { status: 'rejected', reason: 'Асинхронная ошибка' },
//   { status: 'fulfilled', value: 42 },
//   { status: 'fulfilled', value: 'Другой успех' }
// ]
```

### Где применяется?

`Promise.allSettled` используется, когда:
- Нужно выполнить несколько независимых асинхронных операций параллельно и получить результаты всех, даже если некоторые завершились с ошибкой.
- Частичные результаты важны (например, загрузка данных с нескольких API, где ошибка одного не должна прерывать обработку остальных).
- Примеры:
  - Загрузка данных с нескольких источников (API, файлы).
  - Параллельная обработка массива данных с возможными ошибками.
  - Логирование или мониторинг выполнения задач.

### Особенности:

1. **Устойчивость к ошибкам**: В отличие от `Promise.all`, который прерывается при первой ошибке, `Promise.allSettled` всегда ждёт завершения всех промисов.
2. **Параллельность**: Все промисы выполняются одновременно, общее время равно времени самого долгого промиса.
3. **Порядок результатов**: Результаты возвращаются в том же порядке, что и входные промисы, независимо от времени их завершения.
4. **Структура результата**: Каждый элемент массива — объект с полями `status` (`'fulfilled'` или `'rejected'`) и `value` или `reason`.
5. **Пустой массив**: Если передать пустой массив, `Promise.allSettled([])` немедленно разрешается с пустым массивом `[]`.
6. **Итерируемые объекты**: Принимает любой итерируемый объект, не только массивы:
   ```javascript
   const promises = new Set([Promise.resolve(1), Promise.reject('Ошибка')]);
   Promise.allSettled(promises).then(results => console.log(results));
   ```

### Best Practices:

1. **Обрабатывайте результаты индивидуально**:
   - Проверяйте `status` каждого результата, чтобы отделить успешные операции от ошибок:

     ```javascript
     const results = await Promise.allSettled(promises);
     const successes = results.filter(r => r.status === 'fulfilled').map(r => r.value);
     const errors = results.filter(r => r.status === 'rejected').map(r => r.reason);
     ```

2. **Используйте для ненадёжных операций**:
   - Применяйте `Promise.allSettled` для API или источников данных, где ошибки ожидаемы:

     ```javascript
     const promises = urls.map(url => fetch(url).then(res => res.json()));
     const results = await Promise.allSettled(promises);
     ```

3. **Комбинируйте с `map` для массивов**:
   - Используйте с `map` для обработки массивов данных параллельно:

     ```javascript
     const items = [1, 2, 3];
     const results = await Promise.allSettled(items.map(id => fetchData(id)));
     ```

4. **Ограничивайте параллелизм**:
   - Для большого числа промисов используйте библиотеки вроде `p-limit` для ограничения одновременных операций:

     ```javascript
     import pLimit from 'p-limit';

     const limit = pLimit(3); // Максимум 3 параллельных запроса
     const promises = urls.map(url => limit(() => fetch(url).then(res => res.json())));
     const results = await Promise.allSettled(promises);
     ```

5. **Добавляйте таймаут**:
   - Для защиты от долгих операций комбинируйте с `Promise.race` или оборачивайте промисы:

     ```javascript
     const withTimeout = (promise, ms) => 
         Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject('Таймаут'), ms))]);
     const promises = urls.map(url => withTimeout(fetch(url).then(res => res.json()), 5000));
     const results = await Promise.allSettled(promises);
     ```

6. **Логирование и мониторинг**:
   - Логируйте результаты для отладки, особенно при работе с ненадёжными источниками:

     ```javascript
     results.forEach((result, index) => {
         console.log(`Промис ${index + 1}: ${result.status}, ${JSON.stringify(result)}`);
     });
     ```

7. **Очистка ресурсов**:
   - Используйте `AbortController` для отмены ненужных запросов:

     ```javascript
     const controller = new AbortController();
     const promises = urls.map(url => fetch(url, { signal: controller.signal }).then(res => res.json()));
     const results = await Promise.allSettled(promises);
     // Если нужно, вызовите controller.abort()
     ```

### Сравнение с `Promise.all`:

| Характеристика            | `Promise.all`                          | `Promise.allSettled`                   |
|--------------------------|---------------------------------------|---------------------------------------|
| Условие завершения       | Все промисы успешны                  | Все промисы завершены (успех/ошибка) |
| Обработка ошибок         | Прерывается при первой ошибке        | Возвращает все результаты            |
| Результат                | Массив значений                     | Массив объектов `{status, value/reason}` |
| Использование            | Нужны все успешные результаты        | Нужны все результаты, включая ошибки |
| Введён                   | ES6 (2015)                          | ES2020                               |

### Ограничения:

- **Размер результата**: Возвращает больше данных (объекты вместо значений), что может быть избыточным для простых сценариев.
- **Ресурсы**: Параллельное выполнение множества промисов может перегрузить систему (например, сеть или сервер).
- **Отсутствие частичного результата**: Ждёт завершения всех промисов, даже если нужен только первый (в таких случаях используйте `Promise.race` или `Promise.any`).

### Заключение:

`Promise.allSettled` — идеальный выбор, когда нужно выполнить несколько асинхронных операций параллельно и получить результаты всех, даже если некоторые завершились с ошибкой. 

Он особенно полезен для работы с ненадёжными API, обработки массивов данных или мониторинга задач. Используйте его вместо `Promise.all`, если устойчивость к ошибкам важна.