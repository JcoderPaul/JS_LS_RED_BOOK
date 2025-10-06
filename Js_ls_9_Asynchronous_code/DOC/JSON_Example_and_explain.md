Пример сложного JSON, который может быть использован в реальном JavaScript-приложении (например, в API интернет-магазина). 

Рассмотрим, как работать с ним в JavaScript с использованием `fetch`, `Axios` и Insomnia. 

Сложный JSON будет содержать вложенные объекты, массивы, различные типы данных и реалистичные структуры. 
---

### 1. **Пример сложного JSON:**

Ниже приведён пример JSON, представляющего данные интернет-магазина с информацией о заказе, пользователе, продуктах и доставке.

```json
{
  "orderId": "ORD123456789",
  "status": "processing",
  "createdAt": "2025-09-12T12:00:00Z",
  "updatedAt": "2025-09-12T12:05:00Z",
  "customer": {
    "id": "CUST98765",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-123-4567",
    "address": {
      "street": "123 Main St",
      "city": "Boston",
      "state": "MA",
      "postalCode": "02108",
      "country": "USA",
      "coordinates": {
        "latitude": 42.3601,
        "longitude": -71.0589
      }
    },
    "loyaltyPoints": 1500,
    "isVerified": true
  },
  "items": [
    {
      "productId": "PROD001",
      "name": "Laptop Pro 16\"",
      "sku": "LAPPRO16-2025",
      "quantity": 1,
      "price": 1299.99,
      "discount": {
        "type": "percentage",
        "value": 10,
        "amount": 129.999
      },
      "attributes": {
        "color": "Space Gray",
        "storage": "512GB",
        "ram": "16GB"
      }
    },
    {
      "productId": "PROD002",
      "name": "Wireless Mouse",
      "sku": "MOUSE-WL-2025",
      "quantity": 2,
      "price": 49.99,
      "discount": null,
      "attributes": {
        "color": "Black"
      }
    }
  ],
  "total": {
    "subtotal": 1399.97,
    "tax": {
      "rate": 0.08,
      "amount": 111.998
    },
    "shipping": 15.00,
    "grandTotal": 1526.968
  },
  "shipping": {
    "method": "express",
    "carrier": "FedEx",
    "trackingNumber": "TRACK789101112",
    "estimatedDelivery": "2025-09-15T18:00:00Z"
  },
  "payment": {
    "method": "credit_card",
    "status": "paid",
    "transactionId": "TXN456789",
    "lastFour": "1234",
    "amount": 1526.968,
    "currency": "USD"
  },
  "metadata": {
    "source": "web",
    "device": "desktop",
    "utm": {
      "campaign": "summer_sale_2025",
      "source": "google_ads"
    }
  }
}
```

**Особенности этого JSON:**

- **Вложенные объекты**: `customer.address.coordinates`, `items[].attributes`, `total.tax`.
- **Массивы**: `items` содержит список продуктов.
- **Разнообразие типов**: строки, числа, булевы значения, `null` (например, `discount` у второго продукта).
- **Реалистичность**: Структура имитирует данные, которые могут возвращаться из API e-commerce (заказы, продукты, доставка).

---

### 2. **Работа с JSON в JavaScript**

#### a) **Получение JSON с помощью `fetch`**
Предположим, этот JSON возвращается по GET-запросу к `https://api.example.com/orders/ORD123456789`.

```javascript
async function getOrder() {
  try {
    const response = await fetch("https://api.example.com/orders/ORD123456789", {
      headers: {
        "Authorization": "Bearer token123",
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ошибка: ${response.status}`);
    }

    const order = await response.json();

    // Обработка данных
    console.log("Заказ:", order.orderId);
    console.log("Имя клиента:", order.customer.name);
    console.log("Общая сумма:", order.total.grandTotal);

    // Вывод списка продуктов
    order.items.forEach(item => {
      console.log(`Продукт: ${item.name}, Цена: $${item.price}, Количество: ${item.quantity}`);
    });

    // Проверка скидки
    order.items.forEach(item => {
      if (item.discount) {
        console.log(`Скидка на ${item.name}: ${item.discount.amount}$`);
      }
    });

    // Отображение на странице
    const orderDiv = document.getElementById("orderDetails");
    orderDiv.innerHTML = `
      <h2>Заказ #${order.orderId}</h2>
      <p>Клиент: ${order.customer.name}</p>
      <p>Сумма: $${order.total.grandTotal}</p>
      <ul>${order.items.map(item => `<li>${item.name} (x${item.quantity})</li>`).join("")}</ul>
    `;
  } catch (error) {
    console.error("Ошибка получения заказа:", error.message);
  }
}

getOrder();
```

**HTML:**

```html
<div id="orderDetails"></div>
```

**Объяснение:**

- `response.json()` парсит JSON в объект.
- Доступ к данным через точечную нотацию (`order.customer.name`) или индексы для массивов (`order.items[0]`).
- Обработка массивов с помощью `.forEach` или `.map`.
- Проверка наличия необязательных полей (например, `item.discount`).

#### b) **Отправка JSON с помощью `fetch` (POST)**
Создание нового заказа с отправкой JSON:

```javascript
async function createOrder() {
  const newOrder = {
    customer: {
      id: "CUST98766",
      name: "Jane Smith",
      email: "jane@example.com"
    },
    items: [
      {
        productId: "PROD003",
        name: "Headphones",
        sku: "HEAD-WL-2025",
        quantity: 1,
        price: 99.99
      }
    ],
    total: {
      subtotal: 99.99,
      tax: { rate: 0.08, amount: 8.0 },
      shipping: 10.0,
      grandTotal: 117.99
    }
  };

  try {
    const response = await fetch("https://api.example.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer token123"
      },
      body: JSON.stringify(newOrder) // Преобразуем объект в JSON
    });

    if (!response.ok) {
      throw new Error(`HTTP ошибка: ${response.status}`);
    }

    const createdOrder = await response.json();
    console.log("Создан заказ:", createdOrder);
  } catch (error) {
    console.error("Ошибка создания заказа:", error.message);
  }
}

createOrder();
```

---

#### c) **Работа с `Axios`**
`Axios` упрощает работу с JSON, так как автоматически парсит ответы и преобразует тело запроса.

**GET-запрос:**

```javascript
async function getOrder() {
  try {
    const response = await axios.get("https://api.example.com/orders/ORD123456789", {
      headers: { "Authorization": "Bearer token123" }
    });
    
    const order = response.data; // JSON уже распарсен
    console.log("Заказ:", order.orderId);
    console.log("Продукты:", order.items.map(item => item.name));
  } catch (error) {
    console.error("Ошибка:", error.response?.data || error.message);
  }
}

getOrder();
```

**POST-запрос:**

```javascript
async function createOrder() {
  const newOrder = {
    customer: { id: "CUST98766", name: "Jane Smith", email: "jane@example.com" },
    items: [{ productId: "PROD003", name: "Headphones", sku: "HEAD-WL-2025", quantity: 1, price: 99.99 }],
    total: { subtotal: 99.99, tax: { rate: 0.08, amount: 8.0 }, shipping: 10.0, grandTotal: 117.99 }
  };

  try {
    const response = await axios.post("https://api.example.com/orders", newOrder, {
      headers: { "Authorization": "Bearer token123" }
    });
    console.log("Создан заказ:", response.data);
  } catch (error) {
    console.error("Ошибка:", error.response?.data || error.message);
  }
}

createOrder();
```

---

### 3. **Тестирование сложного JSON в Insomnia:**
Insomnia идеально подходит для работы со сложными JSON-структурами, так как поддерживает подсветку синтаксиса, автодополнение и тестирование.

**Шаги:**

1. **Создание запроса**:
   - В Insomnia создайте GET-запрос: `https://api.example.com/orders/ORD123456789`.
   - Или POST-запрос: Body > JSON, вставьте JSON из раздела 1.
   - Headers: `Content-Type: application/json`, `Authorization: Bearer token123`.

2. **Проверка ответа**:
   - Отправьте запрос, Insomnia покажет JSON с подсветкой.
   - Используйте вкладку **Preview** для отображения в виде дерева.
   - Проверьте статус (200, 201) и headers.

3. **Тестирование JSON (JS-скрипт в Insomnia)**:
   Вкладка **Tests**:

   ```javascript
   const res = response;
   expect(res.status).to.equal(200);
   expect(res.json().orderId).to.equal("ORD123456789");
   expect(res.json().items).to.be.an("array").with.lengthOf(2);
   expect(res.json().customer.address.coordinates.latitude).to.be.a("number");
   expect(res.json().items[0].discount).to.not.be.null;
   ```

4. **Динамический JSON**:
   - Используйте Environment Variables:

     ```json
     {
       "customer": {
         "id": "{{env.customerId}}",
         "name": "{{faker.name}}"
       }
     }
     ```
   - Environment: `{"customerId": "CUST98766"}`.

5. **Плагин для JSON**:
   - Установите `insomnia-plugin-jsonpath` для извлечения данных:

     ```javascript
     // Template Tag
     {{ jsonpath(response, "$.total.grandTotal") }} // Извлечёт 1526.968
     ```

6. **Генерация JS-кода**:
   - Response > Copy as Code > `fetch`:

     ```javascript
     fetch("https://api.example.com/orders", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ ... }) // JSON из Body
     });
     ```

---

### 4. **Валидация сложного JSON в JavaScript**
Для проверки структуры JSON в JS используйте библиотеки вроде `zod` (TypeScript) или `yup`.

**Пример с `zod`:**

```javascript
import { z } from "zod";

const OrderSchema = z.object({
  orderId: z.string(),
  customer: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    address: z.object({
      coordinates: z.object({
        latitude: z.number(),
        longitude: z.number()
      })
    })
  }),
  items: z.array(
    z.object({
      productId: z.string(),
      name: z.string(),
      price: z.number(),
      discount: z.object({
        type: z.string(),
        value: z.number(),
        amount: z.number()
      }).nullable()
    })
  ),
  total: z.object({
    grandTotal: z.number()
  })
});

async function validateOrder() {
  try {
    const response = await fetch("https://api.example.com/orders/ORD123456789");
    const order = await response.json();
    
    const validatedOrder = OrderSchema.parse(order); // Валидация
    console.log("Валидный заказ:", validatedOrder);
  } catch (error) {
    console.error("Ошибка валидации:", error);
  }
}

validateOrder();
```

---

### 5. **Советы по работе со сложным JSON:**

- **Иерархия**: Используйте `map`, `filter`, `reduce` для обработки массивов и вложенных объектов.
- **Опциональные поля**: Проверяйте `null` или используйте `?.` (optional chaining).
- **Insomnia**: Используйте JSONPath и тесты для проверки структуры перед интеграцией.
- **Размер JSON**: Минимизируйте данные для оптимизации (например, уберите `metadata` для экономии трафика).
- **Безопасность**: Валидируйте JSON на клиенте и сервере, избегайте `eval()`.