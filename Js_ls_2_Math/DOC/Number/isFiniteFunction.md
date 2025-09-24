#### Что такое `isFinite`?

`isFinite` — встроенная функция в JavaScript, которая проверяет, является ли переданное значение конечным числом. Это означает, что значение не является `NaN`, `Infinity` или `-Infinity`. 

Существует также более строгая версия `Number.isFinite`, введённая в ECMAScript 2015 (ES6), которая не выполняет приведение типов.

**Синтаксис**:

```javascript
isFinite(value)
```
- `value`: значение, которое нужно проверить на конечность.

**`Number.isFinite`**:

```javascript
Number.isFinite(value)
```
- Более строгая версия, проверяющая, является ли значение числом и при этом конечным.

#### Когда применять?

`isFinite` используется, когда нужно:
1. **Проверить, является ли значение корректным конечным числом**:

   ```javascript
   let num = 42;
   console.log(isFinite(num)); // true
   ```
2. **Валидировать результаты вычислений**:

   ```javascript
   let result = 1 / 0;
   console.log(isFinite(result)); // false (Infinity)
   ```
3. **Обработать пользовательский ввод**:
   Убедиться, что введённое значение является числом и не является `NaN` или бесконечностью.

   ```javascript
   let input = parseFloat("123.45");
   if (isFinite(input)) {
     console.log("Корректное число:", input); // Корректное число: 123.45
   }
   ```
4. **Предотвратить ошибки в математических операциях**:
   Проверка перед выполнением вычислений, чтобы избежать работы с некорректными значениями.

#### Особенности `isFinite`:

1. **Автоматическое приведение типов в `isFinite`**:
   Глобальная функция `isFinite` приводит значение к числу перед проверкой, что может дать неожиданные результаты.
   ```javascript
   console.log(isFinite("123")); // true (строка преобразуется в 123)
   console.log(isFinite("abc")); // false (преобразуется в NaN)
   console.log(isFinite(undefined)); // false (преобразуется в NaN)
   ```

2. **Отличие от `Number.isFinite`**:
   `Number.isFinite` не приводит значение к числу и проверяет, является ли оно числом и конечным. Это делает его более предсказуемым.

   ```javascript
   console.log(Number.isFinite("123")); // false (строка, а не число)
   console.log(Number.isFinite(123)); // true
   console.log(Number.isFinite(Infinity)); // false
   ```

3. **Обработка специальных значений**:
   - `isFinite` возвращает `false` для `NaN`, `Infinity` и `-Infinity`.
   - `Number.isFinite` возвращает `false` для всех нечисловых значений, а также для `NaN`, `Infinity` и `-Infinity`.

   ```javascript
   console.log(isFinite(NaN)); // false
   console.log(isFinite(Infinity)); // false
   console.log(Number.isFinite(NaN)); // false
   console.log(Number.isFinite(Infinity)); // false
   ```

4. **Поведение с некорректными типами**:
   `isFinite` может вернуть `true` для строк, которые преобразуются в числа, что может быть нежелательно.
   
   ```javascript
   console.log(isFinite("42.5")); // true
   console.log(Number.isFinite("42.5")); // false
   ```

#### Best Practices:

1. **Предпочитайте `Number.isFinite`**:
   Используйте `Number.isFinite` вместо `isFinite` для большей точности, так как оно не выполняет приведение типов.

   ```javascript
   let value = "123";
   if (Number.isFinite(value)) {
     console.log("Это конечное число");
   } else {
     console.log("Это не число или не конечное"); // Это не число или не конечное
   }
   ```

2. **Проверяйте перед вычислениями**:
   Убедитесь, что значение является конечным числом, чтобы избежать некорректных результатов.

   ```javascript
   let result = 100 / parseFloat("2");
   if (Number.isFinite(result)) {
     console.log("Результат:", result); // Результат: 50
   } else {
     console.error("Некорректный результат");
   }
   ```

3. **Комбинируйте с проверкой типа**:
   Если нужно строго убедиться, что значение является числом, используйте `typeof` вместе с `Number.isFinite`.

   ```javascript
   let value = 42;
   if (typeof value === "number" && Number.isFinite(value)) {
     console.log("Это конечное число:", value); // Это конечное число: 42
   }
   ```

4. **Обрабатывайте пользовательский ввод**:
   Проверяйте входные данные, чтобы убедиться, что они являются корректными числами.

   ```javascript
   let input = parseFloat("123.45abc");
   if (Number.isFinite(input)) {
     console.log("Введено корректное число:", input); // Введено корректное число: 123.45
   } else {
     console.error("Некорректное число");
   }
   ```

5. **Не используйте для проверки `NaN` отдельно**:
   Если нужно проверить только на `NaN`, используйте `Number.isNaN` вместо `isFinite`, так как `isFinite` проверяет и `NaN`, и бесконечность.

   ```javascript
   let value = NaN;
   console.log(Number.isNaN(value)); // true
   console.log(Number.isFinite(value)); // false
   ```

#### Пример кода с учётом best practices:

```javascript
// Проверка пользовательского ввода
let input = "123.45";
let num = parseFloat(input);

if (Number.isFinite(num)) {
  console.log("Корректное число:", num); // Корректное число: 123.45
} else {
  console.error("Ошибка: некорректное число");
}

// Проверка результата вычислений
let result = 100 / 0;
if (Number.isFinite(result)) {
  console.log("Результат:", result);
} else {
  console.error("Результат: Infinity или NaN"); // Результат: Infinity или NaN
}

// Строгая проверка типа и конечности
let value = 42;
if (typeof value === "number" && Number.isFinite(value)) {
  console.log("Это конечное число:", value); // Это конечное число: 42
}
```

#### Отличие от других методов:

- **`isFinite` vs `Number.isFinite`**:
  - `isFinite` приводит значение к числу перед проверкой, что может привести к неожиданным результатам.
  - `Number.isFinite` проверяет, является ли значение числом и конечным, без приведения типов.

    ```javascript
    console.log(isFinite("123")); // true
    console.log(Number.isFinite("123")); // false
    ```
- **`isFinite` vs `Number.isNaN`**:
  - `Number.isNaN` проверяет только, является ли значение буквально `NaN`.
  - `isFinite` проверяет, является ли значение конечным числом (не `NaN`, не `Infinity`).

    ```javascript
    console.log(isFinite(NaN)); // false
    console.log(Number.isNaN(NaN)); // true
    console.log(isFinite(Infinity)); // false
    console.log(Number.isNaN(Infinity)); // false
    ```

#### Заключение:

`isFinite` — полезная функция для проверки, является ли значение конечным числом, но из-за приведения типов она может быть менее надёжной. Предпочтительнее использовать `Number.isFinite` для строгой проверки без приведения типов. Комбинируйте `Number.isFinite` с проверкой типов (`typeof`) и используйте его для валидации пользовательского ввода и результатов вычислений. Для проверки только `NaN` лучше использовать `Number.isNaN`.