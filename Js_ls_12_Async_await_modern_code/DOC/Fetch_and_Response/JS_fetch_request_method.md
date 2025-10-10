Метод **`fetch`** в JavaScript — это современный API для выполнения HTTP-запросов (GET, POST, PUT, DELETE и т.д.) в браузере. 

Он возвращает промис, который разрешается в объект `Response`, представляющий ответ сервера. 

`fetch` заменил устаревший `XMLHttpRequest` благодаря более простому и гибкому интерфейсу, основанному на промисах. 

---

### 1. **Синтаксис и базовое использование**

```javascript
fetch(url, [options])
```
- **`url`**: Строка или объект `URL`, указывающий адрес ресурса.
- **`options`** (необязательный): Объект с настройками запроса (метод, заголовки, тело и т.д.).
- **Возвращает**: Промис, который разрешается в объект `Response`.

**Простой пример (GET-запрос):**

```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));
```

**С async/await:**

```javascript
async function getData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
getData();
```

---

### 2. **Параметры объекта `options`**
Объект `options` позволяет настроить запрос. Полный список опций:

| Параметр             | Описание                                                                 | Пример значения                                |
|----------------------|--------------------------------------------------------------------------|-----------------------------------------------|
| `method`            | HTTP-метод запроса (GET, POST, PUT, DELETE, etc.). По умолчанию: `GET`.   | `'POST'`                                      |
| `headers`           | Заголовки запроса (объект или `Headers`).                                | `{ 'Content-Type': 'application/json' }`       |
| `body`              | Тело запроса (для POST, PUT и т.д.). Не используется с GET/HEAD.          | `JSON.stringify({ key: 'value' })`            |
| `mode`              | Режим CORS: `cors`, `no-cors`, `same-origin`. По умолчанию: `cors`.       | `'cors'`                                      |
| `credentials`       | Учёт куки: `same-origin`, `include`, `omit`. По умолчанию: `same-origin`. | `'include'`                                   |
| `cache`             | Управление кэшем: `default`, `no-store`, `reload`, etc.                   | `'no-cache'`                                  |
| `redirect`          | Обработка редиректов: `follow`, `error`, `manual`. По умолчанию: `follow`.| `'follow'`                                    |
| `referrer`          | Значение заголовка `Referer`.                                             | `'https://example.com'`                       |
| `referrerPolicy`    | Политика реферера: `no-referrer`, `origin`, etc.                         | `'no-referrer-when-downgrade'`                |
| `integrity`         | Проверка целостности ресурса (subresource integrity).                     | `'sha256-...'`                               |
| `keepalive`         | Разрешает отправку запроса при закрытии страницы. По умолчанию: `false`.  | `true`                                        |
| `signal`            | Объект `AbortSignal` для отмены запроса.                                 | `new AbortController().signal`                |

**Пример с настройками:**

```javascript
async function postData() {
    try {
        const response = await fetch('https://api.example.com/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token123'
            },
            body: JSON.stringify({ name: 'John', age: 30 }),
            credentials: 'include',
            mode: 'cors',
            cache: 'no-cache'
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
postData();
```

---

### 3. **Объект `Response`**:

`fetch` возвращает промис, который разрешается в объект `Response`. Его основные свойства и методы:

| Свойство/Метод      | Описание                                                                 |
|---------------------|--------------------------------------------------------------------------|
| `ok`                | Булево, `true`, если статус ответа 200–299.                              |
| `status`            | HTTP-статус ответа (например, 200, 404).                                  |
| `statusText`        | Текстовое описание статуса (например, 'OK', 'Not Found').                 |
| `headers`           | Объект `Headers` с заголовками ответа.                                   |
| `url`               | URL запроса.                                                             |
| `json()`            | Парсит тело ответа как JSON, возвращает промис.                          |
| `text()`            | Возвращает тело ответа как текст, возвращает промис.                     |
| `blob()`            | Возвращает тело ответа как `Blob` (для файлов), возвращает промис.       |
| `arrayBuffer()`     | Возвращает тело ответа как `ArrayBuffer`, возвращает промис.             |
| `formData()`        | Парсит тело ответа как `FormData`, возвращает промис.                    |
| `body`              | Поток `ReadableStream` для чтения тела ответа по частям.                 |
| `bodyUsed`          | Булево, указывает, было ли тело ответа уже прочитано.                    |
| `clone()`           | Создаёт копию объекта `Response` для многократного чтения тела.          |

**Пример обработки ответа:**

```javascript
async function fetchData() {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
        throw new Error(`HTTP ошибка: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Данные:', data);
    console.log('Заголовки:', response.headers.get('Content-Type'));
}
fetchData();
```

---

### 4. **Основные возможности и сценарии использования:**

#### 4.1. **GET-запросы**
- Используются для получения данных.
- Тело запроса (`body`) не требуется.

```javascript
fetch('https://api.example.com/users')
    .then(res => res.json())
    .then(users => console.log(users));
```

#### 4.2. **POST-запросы**
- Отправка данных на сервер (например, создание ресурса).
- Требуется указать `method: 'POST'` и `body`.

```javascript
fetch('https://api.example.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Alice', age: 25 })
})
    .then(res => res.json())
    .then(data => console.log(data));
```

#### 4.3. **Отправка FormData**
- Для отправки форм, включая файлы.

```javascript
const formData = new FormData();
formData.append('username', 'Alice');
formData.append('file', fileInput.files[0]);

fetch('https://api.example.com/upload', {
    method: 'POST',
    body: formData
})
    .then(res => res.json())
    .then(data => console.log(data));
```

#### 4.4. **Работа с файлами (Blob)**
- Получение и обработка файлов, например, изображений.

```javascript
async function fetchImage() {
    const response = await fetch('https://example.com/image.jpg');
    const blob = await response.blob();
    const img = document.createElement('img');
    img.src = URL.createObjectURL(blob);
    document.body.appendChild(img);
}
fetchImage();
```

#### 4.5. **Потоковая обработка (ReadableStream)**
- Позволяет читать тело ответа по частям (для больших данных).

```javascript
async function streamData() {
    const response = await fetch('https://api.example.com/large-data');
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value);
    }
    console.log('Получено:', result);
}
streamData();
```

#### 4.6. **Отмена запроса с AbortController**
- Позволяет отменить запрос, если он больше не нужен.

```javascript
const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/data', { signal })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => {
        if (error.name === 'AbortError') {
            console.log('Запрос отменён');
        } else {
            console.error('Ошибка:', error);
        }
    });

// Отменить запрос через 2 секунды
setTimeout(() => controller.abort(), 2000);
```

#### 4.7. **Работа с CORS**
- Управление CORS через опцию `mode`:
  - `cors`: Разрешает кросс-доменные запросы с учётом CORS.
  - `no-cors`: Запросы без CORS, но с ограничениями (нельзя читать ответ).
  - `same-origin`: Только для запросов в пределах того же домена.

```javascript
fetch('https://api.example.com/data', { mode: 'cors' })
    .then(res => res.json())
    .then(data => console.log(data));
```

#### 4.8. **Передача куки**
- Опция `credentials` управляет отправкой и получением куки:
  - `same-origin`: Отправляет куки только для того же домена.
  - `include`: Отправляет куки для кросс-доменных запросов.
  - `omit`: Не отправляет куки.

```javascript
fetch('https://api.example.com/data', { credentials: 'include' })
    .then(res => res.json())
    .then(data => console.log(data));
```

#### 4.9. **Кэширование**
- Опция `cache` управляет кэшем браузера:
  - `default`: Использует стандартные правила кэширования.
  - `no-store`: Не использует кэш.
  - `reload`: Всегда загружает с сервера.

```javascript
fetch('https://api.example.com/data', { cache: 'no-cache' })
    .then(res => res.json())
    .then(data => console.log(data));
```

#### 4.10. **Обработка редиректов**
- Опция `redirect`:
  - `follow`: Следует за редиректами (по умолчанию).
  - `error`: Вызывает ошибку при редиректе.
  - `manual`: Возвращает ответ с редиректом для ручной обработки.

```javascript
fetch('https://api.example.com/redirect', { redirect: 'follow' })
    .then(res => console.log('Редирект обработан:', res.url));
```

---

### 5. **Особенности:**

1. **Промисы**: `fetch` возвращает промис, что делает его совместимым с `async/await` и методами вроде `Promise.all`.
2. **Не выбрасывает ошибку для HTTP-ошибок**: Статусы вроде 404 или 500 не приводят к отклонению промиса. Нужно проверять `response.ok`:
   ```javascript
   if (!response.ok) {
       throw new Error(`HTTP ошибка: ${response.status}`);
   }
   ```
3. **Однократное чтение тела**: Тело ответа можно прочитать только один раз (`bodyUsed: true`). Для многократного чтения используйте `response.clone()`:

   ```javascript
   const response = await fetch('https://api.example.com/data');
   const json = await response.clone().json();
   const text = await response.text();
   ```
4. **Совместимость**: Поддерживается во всех современных браузерах, но не в старых (IE). Для старых браузеров используйте полифиллы (например, `whatwg-fetch`).
5. **Кросс-доменные запросы**: Поддерживает CORS, но сервер должен разрешать такие запросы.

---

### 6. **Best Practices:**

1. **Проверяйте `response.ok`**:
   - Всегда проверяйте статус ответа, чтобы обработать HTTP-ошибки:

     ```javascript
     const response = await fetch(url);
     if (!response.ok) {
         throw new Error(`HTTP ошибка: ${response.status} ${response.statusText}`);
     }
     ```

2. **Обрабатывайте ошибки**:
   - Используйте `try/catch` для сетевых ошибок (например, отсутствие интернета):

     ```javascript
     try {
         const response = await fetch(url);
         const data = await response.json();
     } catch (error) {
         console.error('Сетевая ошибка:', error);
     }
     ```

3. **Используйте `AbortController`**:
   - Отменяйте запросы, чтобы избежать ненужных операций:

     ```javascript
     const controller = new AbortController();
     setTimeout(() => controller.abort(), 5000); // Отмена через 5 сек
     await fetch(url, { signal: controller.signal });
     ```

4. **Ограничивайте параллельные запросы**:
   - Для множества запросов используйте `Promise.all` или библиотеки вроде `p-limit`:

     ```javascript
     import pLimit from 'p-limit';

     const limit = pLimit(3); // 3 одновременных запроса
     const promises = urls.map(url => limit(() => fetch(url).then(res => res.json())));
     const results = await Promise.all(promises);
     ```

5. **Указывайте заголовки**:
   - Всегда задавайте `Content-Type` для POST-запросов:

     ```javascript
     fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
     });
     ```

6. **Оптимизируйте для больших данных**:
   - Используйте `ReadableStream` для потоковой обработки больших файлов:

     ```javascript
     const reader = response.body.getReader();
     ```

7. **Кэширование и производительность**:
   - Используйте `cache: 'no-cache'` или `reload` для актуальных данных.
   - Для статических ресурсов применяйте `cache: 'default'` или `force-cache`.

8. **Тестирование**:
   - Тестируйте с моком API (например, `msw` или `nock`) для проверки обработки ответов и ошибок.

---

### 7. **Примеры реальных сценариев**

#### 7.1. Загрузка нескольких ресурсов

```javascript
async function fetchMultiple() {
    const urls = [
        'https://api.example.com/data1',
        'https://api.example.com/data2'
    ];
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(res => res.json()));
    console.log(data);
}
fetchMultiple();
```

#### 7.2. Аутентификация с токеном

```javascript
async function fetchWithAuth() {
    const token = 'Bearer my-token';
    const response = await fetch('https://api.example.com/protected', {
        headers: { 'Authorization': token }
    });
    if (!response.ok) throw new Error('Неавторизован');
    return response.json();
}
```

#### 7.3. Загрузка файла с прогрессом

```javascript
async function uploadWithProgress(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://api.example.com/upload', {
        method: 'POST',
        body: formData
    });

    // Для прогресса загрузки используйте XMLHttpRequest или сторонние библиотеки
}
```
---

### 8. **Ограничения:**

- **HTTP-ошибки**: Не выбрасывает ошибку для статусов 4xx/5xx, нужно проверять `response.ok`.
- **Отсутствие встроенного прогресса**: Для отслеживания прогресса загрузки/выгрузки используйте `XMLHttpRequest` или библиотеки (например, `axios`).
- **Кросс-доменные ограничения**: Требует поддержки CORS на сервере.
- **Однократное чтение**: Тело ответа читается один раз, нужно использовать `clone()` для повторного доступа.

---

**Заключение:**

`fetch` — мощный и гибкий API для выполнения HTTP-запросов, поддерживающий все стандартные сценарии: GET, POST, работа с файлами, потоками, аутентификацией и т.д. Он интегрируется с промисами и `async/await`, что делает его удобным для современного JavaScript. 

Используйте `AbortController` для отмены запросов, проверяйте `response.ok` для обработки HTTP-ошибок и комбинируйте с `Promise.all` для параллельных операций.