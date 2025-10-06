AJAX (Asynchronous JavaScript and XML) — это технология, которая позволяет отправлять и получать данные с сервера асинхронно, без перезагрузки страницы. 

В JavaScript для выполнения AJAX-запросов чаще всего используются **XMLHttpRequest**, **fetch API** или библиотеки, такие как **Axios**.

---

### 1. **XMLHttpRequest**

`XMLHttpRequest` — классический способ выполнения AJAX-запросов. Хотя он менее популярен сегодня из-за появления `fetch`, он всё ещё используется.

**Пример GET-запроса:**

```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data", true); // true — асинхронный запрос

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText)); // Обработка ответа
  } else if (xhr.readyState === 4) {
    console.error("Ошибка:", xhr.status);
  }
};

xhr.send();
```

**Пример POST-запроса:**

```javascript
const xhr = new XMLHttpRequest();
xhr.open("POST", "https://api.example.com/data", true);

xhr.setRequestHeader("Content-Type", "application/json");

const data = { name: "John", age: 30 };
xhr.send(JSON.stringify(data));

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 201) {
    console.log(JSON.parse(xhr.responseText));
  } else if (xhr.readyState === 4) {
    console.error("Ошибка:", xhr.status);
  }
};
```

**Особенности:**

- `readyState`: 0 (не инициализирован), 1 (открыт), 2 (отправлен), 3 (получается ответ), 4 (завершён).
- `status`: HTTP-код ответа (200 — успех, 404 — не найдено, 500 — ошибка сервера).
- Многословный синтаксис, поэтому часто предпочитают `fetch`.

---

### 2. **Fetch API**
`fetch` — современный и более удобный способ отправки AJAX-запросов, основанный на Promise. Поддерживается во всех современных браузерах.

**Пример GET-запроса:**

```javascript
fetch("https://api.example.com/data")
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
    return response.json(); // Парсинг JSON
  })
  .then(data => console.log(data))
  .catch(error => console.error("Ошибка:", error));
```

**Пример POST-запроса:**

```javascript
const data = { name: "John", age: 30 };

fetch("https://api.example.com/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("Ошибка:", error));
```

**Особенности:**

- Возвращает Promise, что упрощает работу с асинхронностью.
- `response.ok` проверяет, успешен ли запрос (статус 200–299).
- Необходимо вручную обрабатывать ошибки (например, 404 не вызывает `catch` автоматически).
- Поддерживает `response.json()`, `response.text()`, `response.blob()` и др.

**Async/Await с fetch:**

```javascript
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

getData();
```

---

### 3. **Axios**

`Axios` — популярная библиотека для выполнения HTTP-запросов, упрощающая работу по сравнению с `fetch`. 

Требует подключения (например, через CDN или npm).

**Подключение через CDN:**

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

**Пример GET-запроса:**

```javascript
axios.get("https://api.example.com/data")
  .then(response => console.log(response.data))
  .catch(error => console.error("Ошибка:", error));
```

**Пример POST-запроса:**

```javascript
const data = { name: "John", age: 30 };

axios.post("https://api.example.com/data", data)
  .then(response => console.log(response.data))
  .catch(error => console.error("Ошибка:", error));
```

**Async/Await с Axios:**

```javascript
async function postData() {
  try {
    const response = await axios.post("https://api.example.com/data", {
      name: "John",
      age: 30,
    });
    console.log(response.data);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

postData();
```

**Преимущества Axios:**

- Автоматический парсинг JSON (не нужно вызывать `.json()`).
- Автоматическая обработка ошибок (ошибки HTTP вызывают `catch`).
- Поддержка отмены запросов, перехватчиков (interceptors) и других функций.
- Более удобный API по сравнению с `fetch`.

---

### 4. **Основные типы HTTP-запросов:**

- **GET**: Получение данных (например, загрузка списка пользователей).
- **POST**: Отправка данных на сервер (например, создание записи).
- **PUT/PATCH**: Обновление данных.
- **DELETE**: Удаление данных.

**Пример параметров в GET-запросе:**

```javascript
fetch("https://api.example.com/data?userId=1&limit=10")
  .then(response => response.json())
  .then(data => console.log(data));
```

---

### 5. **Обработка заголовков и параметров**
- **Заголовки (Headers):**

  ```javascript
  fetch("https://api.example.com/data", {
    headers: {
      "Authorization": "Bearer token123",
      "Content-Type": "application/json",
    },
  });
  ```

- **Query-параметры:**

  ```javascript
  const params = new URLSearchParams({ userId: 1, limit: 10 });
  fetch(`https://api.example.com/data?${params}`)
    .then(response => response.json())
    .then(data => console.log(data));
  ```

---

### 6. **Обработка ошибок:**
- Проверяйте статус ответа (`response.ok` или `xhr.status`).
- Используйте `try/catch` с `async/await` или `.catch()` с Promise.
- Обрабатывайте сетевые ошибки (например, отсутствие интернета):
  
  ```javascript
  fetch("https://api.example.com/data")
    .catch(error => console.error("Сетевая ошибка:", error));
  ```

---

### 7. **Практический пример: загрузка данных**
Пример загрузки списка пользователей и отображения на странице:

```javascript
async function loadUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) throw new Error("Ошибка загрузки");
    const users = await response.json();
    const list = document.getElementById("userList");
    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = user.name;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

loadUsers();
```

**HTML:**

```html
<ul id="userList"></ul>
```

---

### 8. **Полезные советы:**

- **CORS**: Убедитесь, что сервер поддерживает CORS, если запросы отправляются на другой домен.
- **Таймауты**: Для `fetch` таймауты нужно реализовывать вручную (например, с `AbortController`):

  ```javascript
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 5000); // Таймаут 5 секунд
  fetch("https://api.example.com/data", { signal: controller.signal })
    .catch(error => console.error("Таймаут или ошибка:", error));
  ```
- **Кэширование**: Используйте заголовки `Cache-Control` или ETag для управления кэшем.
- **Безопасность**: Храните токены в безопасных местах (например, `localStorage` или `HttpOnly` cookies) и используйте HTTPS.

---

### 9. **Сравнение методов:**

| Метод          | Плюсы                              | Минусы                              |
|----------------|------------------------------------|-------------------------------------|
| **XMLHttpRequest** | Широкая поддержка, гибкость       | Многословный, устаревший синтаксис |
| **Fetch**      | Современный, Promise-based, простой| Нет встроенной отмены, ручная обработка ошибок |
| **Axios**      | Удобный API, автоматический JSON, перехватчики | Требует подключения библиотеки |