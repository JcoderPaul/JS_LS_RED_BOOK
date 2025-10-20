Перемещение по DOM (Document Object Model) — это процесс навигации по дереву элементов HTML-документа с использованием методов и свойств **DOM API**. 

DOM представляет HTML-документ как иерархическое дерево узлов, где каждый узел (элемент, текст, комментарий и т.д.) связан с другими узлами (родителями, детьми, соседями). 

Перемещение по DOM позволяет находить и взаимодействовать с нужными узлами для чтения, изменения или управления структурой страницы.
---

### 1. Структура DOM-дерева:

HTML-документ представлен в виде дерева узлов, где:
- **Корень**: объект `document`.
- **Узлы**:
  - Элементы (например, `<div>`, `<p>`) — `Element` (nodeType: 1).
  - Текстовые узлы — `Text` (nodeType: 3).
  - Комментарии — `Comment` (nodeType: 8).
  - Другие (например, `DocumentType` для `<!DOCTYPE>`).
- **Связи**:
  - **Родитель** (parent): узел, содержащий текущий узел.
  - **Дети** (children): узлы, вложенные в текущий узел.
  - **Соседи** (siblings): узлы на том же уровне иерархии.

Пример HTML:

```html
<div id="parent">
  <p class="child">Текст</p>
  <span>Другой текст</span>
  <!-- Комментарий -->
</div>
```

DOM-дерево:
```
document
└── div#parent
    ├── p.child
    │   └── Text: "Текст"
    ├── span
    │   └── Text: "Другой текст"
    └── Comment: "Комментарий"
```

---

### 2. Основные свойства и методы для перемещения по DOM:

DOM API предоставляет свойства и методы для навигации по дереву. Они делятся на две категории: работа с **узлами** (nodes) и работа с **элементами** (elements). Узлы включают элементы, текст и комментарии, тогда как элементы — это только HTML-теги.

#### 2.1. Свойства для навигации по узлам

Эти свойства позволяют перемещаться по всем типам узлов (элементы, текст, комментарии).

- **`parentNode`**:
  - Возвращает родительский узел (любой тип узла).
  - Для корневого элемента `<html>` родителем является `document`, а для `document` — `null`.
  - **Пример**:

    ```javascript
    const child = document.querySelector('.child');
    console.log(child.parentNode); // <div id="parent">
    ```

- **`childNodes`**:
  - Возвращает коллекцию `NodeList` всех дочерних узлов (включая элементы, текст, комментарии).
  - **Примечание**: Пробелы и переносы строк в HTML создают текстовые узлы.
  - **Пример**:
  
    ```javascript
    const parent = document.querySelector('#parent');
    console.log(parent.childNodes); // NodeList: [Text, p, Text, span, Text, Comment]
    ```

- **`firstChild`**:
  - Возвращает первый дочерний узел (может быть текстом или комментарием).
  - **Пример**:
  
    ```javascript
    console.log(parent.firstChild); // Text (пробел перед <p>)
    ```

- **`lastChild`**:
  - Возвращает последний дочерний узел.
  - **Пример**:
  
    ```javascript
    console.log(parent.lastChild); // Comment: "Комментарий"
    ```

- **`nextSibling`**:
  - Возвращает следующий узел на том же уровне (может быть текстом или комментарием).
  - **Пример**:
  
    ```javascript
    const p = document.querySelector('.child');
    console.log(p.nextSibling); // Text (пробел между <p> и <span>)
    ```

- **`previousSibling`**:
  - Возвращает предыдущий узел на том же уровне.
  - **Пример**:
  
    ```javascript
    const span = document.querySelector('span');
    console.log(span.previousSibling); // Text (пробел между <p> и <span>)
    ```

#### 2.2. Свойства для навигации по элементам:

Эти свойства работают только с элементами (тегами), игнорируя текстовые узлы и комментарии.

- **`parentElement`**:
  - Возвращает родительский элемент (или `null`, если родитель — не элемент, например, `document`).
  - **Пример**:

    ```javascript
    const child = document.querySelector('.child');
    console.log(child.parentElement); // <div id="parent">
    console.log(document.documentElement.parentElement); // null
    ```

- **`children`**:
  - Возвращает коллекцию `HTMLCollection` только дочерних элементов (без текста и комментариев).
  - **Пример**:
  
    ```javascript
    const parent = document.querySelector('#parent');
    console.log(parent.children); // HTMLCollection: [p, span]
    ```

- **`firstElementChild`**:
  - Возвращает первый дочерний элемент (игнорирует текст и комментарии).
  - **Пример**:
  
    ```javascript
    console.log(parent.firstElementChild); // <p class="child">
    ```

- **`lastElementChild`**:
  - Возвращает последний дочерний элемент.
  - **Пример**:
  
    ```javascript
    console.log(parent.lastElementChild); // <span>
    ```

- **`nextElementSibling`**:
  - Возвращает следующий элемент на том же уровне.
  - **Пример**:
  
    ```javascript
    const p = document.querySelector('.child');
    console.log(p.nextElementSibling); // <span>
    ```

- **`previousElementSibling`**:
  - Возвращает предыдущий элемент на том же уровне.
  - **Пример**:
  
    ```javascript
    const span = document.querySelector('span');
    console.log(span.previousElementSibling); // <p class="child">
    ```

#### 2.3. Поиск элементов (не прямое перемещение, но часто используется):

Эти методы позволяют находить элементы, не проходя по дереву вручную:
- **`querySelector(selector)`**: Находит первый элемент, соответствующий CSS-селектору.
- **`querySelectorAll(selector)`**: Находит все элементы, соответствующие селектору (возвращает `NodeList`).
- **`getElementById(id)`**: Находит элемент по ID.
- **`getElementsByClassName(class)`**: Находит элементы по классу (возвращает `HTMLCollection`).
- **`closest(selector)`**: Ищет ближайший родительский элемент, соответствующий селектору.
  - **Пример**:

    ```javascript
    const child = document.querySelector('.child');
    console.log(child.closest('#parent')); // <div id="parent">
    ```

---

### 3. Практические примеры:

#### Пример 1: Перемещение по узлам

```html
<div id="parent">
  <p class="child">Текст</p>
  <span>Другой текст</span>
</div>
<script>
  const parent = document.querySelector('#parent');

  // Дочерние узлы
  console.log(parent.childNodes); // NodeList: [Text, p, Text, span, Text]

  // Первый и последний дочерний узел
  console.log(parent.firstChild); // Text (пробел)
  console.log(parent.lastChild); // Text (пробел)

  // Перемещение по соседям
  const p = document.querySelector('.child');
  console.log(p.nextSibling); // Text (пробел)
</script>
```

#### Пример 2: Перемещение по элементам:

```html
<div id="parent">
  <p class="child">Текст</p>
  <span>Другой текст</span>
</div>
<script>
  const parent = document.querySelector('#parent');

  // Дочерние элементы
  console.log(parent.children); // HTMLCollection: [p, span]

  // Первый и последний элемент
  console.log(parent.firstElementChild); // <p class="child">
  console.log(parent.lastElementChild); // <span>

  // Перемещение по соседним элементам
  const p = document.querySelector('.child');
  console.log(p.nextElementSibling); // <span>
  console.log(p.parentElement); // <div id="parent">
</script>
```

#### Пример 3: Комбинированное использование с `closest`:

```html
<div id="grandparent">
  <div id="parent">
    <button class="child">Кнопка</button>
  </div>
</div>
<script>
  const button = document.querySelector('.child');

  // Найти ближайшего родителя с ID
  console.log(button.closest('#grandparent')); // <div id="grandparent">

  // Перейти к родителю и найти его первый дочерний элемент
  console.log(button.parentElement.firstElementChild); // <button class="child">
</script>
```

#### Пример 4: Перемещение для изменения DOM:

```html
<ul id="list">
  <li>Элемент 1</li>
  <li>Элемент 2</li>
</ul>
<script>
  const list = document.querySelector('#list');
  const secondItem = list.children[1]; // Второй <li>
  console.log(secondItem.textContent); // "Элемент 2"

  // Добавить новый элемент перед вторым
  const newItem = document.createElement('li');
  newItem.textContent = 'Новый элемент';
  list.insertBefore(newItem, secondItem);
</script>
```

**Результат HTML**:

```html
<ul id="list">
  <li>Элемент 1</li>
  <li>Новый элемент</li>
  <li>Элемент 2</li>
</ul>
```

---

### 4. Особенности и рекомендации:

1. **Узлы vs. элементы**:
   - Используйте свойства `childNodes`, `firstChild`, `nextSibling` для работы с любыми узлами (включая текст и комментарии).
   - Используйте `children`, `firstElementChild`, `nextElementSibling` для работы только с элементами, чтобы избежать лишних текстовых узлов.

2. **Пробелы и текстовые узлы**:
   - Пробелы и переносы строк в HTML создают текстовые узлы, что может усложнить навигацию с `childNodes` или `firstChild`. Предпочитайте `children` или `firstElementChild` для работы с тегами.

3. **Производительность**:
   - Частые обращения к DOM (например, многократное использование `nextElementSibling`) могут быть затратными. Кэшируйте результаты в переменных.
   - Для поиска элементов предпочтительнее `querySelector` или `closest`, если структура сложная.

4. **Кроссбраузерность**:
   - Все перечисленные свойства (`parentNode`, `children`, `closest`, и т.д.) широко поддерживаются современными браузерами.
   - В старых браузерах (например, IE8) `firstElementChild`, `nextElementSibling` и `closest` могут отсутствовать. Используйте полифиллы или альтернативные методы (например, `childNodes` с фильтрацией).

5. **Проверка на `null`**:
   - Свойства, такие как `parentElement`, `nextElementSibling` или `closest`, могут вернуть `null`, если элемент не найден. Всегда проверяйте результат:

     ```javascript
     if (element.nextElementSibling) {
       console.log(element.nextElementSibling);
     }
     ```

6. **Динамические изменения**:
   - Если DOM изменяется (например, элементы добавляются или удаляются), свойства навигации (например, `nextSibling`) обновляются автоматически, так как DOM "живой".

---

### Итог:

Перемещение по DOM осуществляется с помощью свойств, таких как:
- **Узлы**: `parentNode`, `childNodes`, `firstChild`, `lastChild`, `nextSibling`, `previousSibling`.
- **Элементы**: `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `nextElementSibling`, `previousElementSibling`.
- **Поиск**: `querySelector`, `querySelectorAll`, `closest`.