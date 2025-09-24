#### Что такое `toFixed`?

`toFixed` — метод объекта `Number` в JavaScript, который **форматирует число в строку** с фиксированным количеством знаков после запятой, выполняя округление при необходимости. 

!!! Этот метод не является частью объекта `Math`, а принадлежит прототипу `Number` !!!

**Синтаксис**:

```javascript
number.toFixed(digits)
```
- `number`: число, которое нужно отформатировать.
- `digits` (опционально): количество знаков после запятой (от 0 до 100). По умолчанию равно 0.

**Возвращаемые значения**:
- **Строка**, представляющая число с указанным количеством знаков после запятой.
- Если аргумент `digits` некорректен, выбрасывается ошибка `RangeError`.

**Пример**:

```javascript
let num = 3.14159;
console.log(num.toFixed(2)); // "3.14"
console.log(num.toFixed(0)); // "3"
console.log((-3.7).toFixed(1)); // "-3.7"
```

#### Когда применять?

`toFixed` используется, когда нужно:
1. **Форматировать число для отображения**:
   - Например, для отображения цен, процентов или других чисел в пользовательском интерфейсе.
   
   ```javascript
   let price = 19.999;
   console.log(price.toFixed(2)); // "20.00"
   ```
2. **Ограничить количество знаков после запятой**:
   - Для финансовых вычислений, где требуется точное количество десятичных знаков.
3. **Обработать пользовательский ввод**:
   - Для преобразования чисел в строки с заданной точностью.

   ```javascript
   let input = parseFloat("123.45678");
   console.log(input.toFixed(3)); // "123.457"
   ```
4. **Устранить погрешности чисел с плавающей точкой**:
   - Для форматирования результатов, чтобы избежать длинных дробных частей.

   ```javascript
   let sum = 0.1 + 0.2;
   console.log(sum.toFixed(2)); // "0.30"
   ```

#### Особенности `toFixed`

1. **!!! Возвращает строку !!!**:
   - В отличие от методов `Math` (например, `Math.round`), **`toFixed` возвращает строку, а не число**.

   ```javascript
   let num = 3.14159;
   console.log(typeof num.toFixed(2)); // "string"
   ```

2. **Округление**:
   - Округляет число до указанного количества знаков по правилам, аналогичным `Math.round`: если дробная часть ≥ 0.5, округляет вверх, иначе — вниз.
   
   ```javascript
   console.log(3.55.toFixed(1)); // "3.6"
   console.log(3.54.toFixed(1)); // "3.5"
   ```

3. **Обработка специальных значений**:
   - `NaN.toFixed(digits)` возвращает строку `"NaN"`.
   - `Infinity.toFixed(digits)` возвращает строку `"Infinity"`.
   - `-Infinity.toFixed(digits)` возвращает строку `"-Infinity"`.
   
   ```javascript
   console.log(NaN.toFixed(2)); // "NaN"
   console.log(Infinity.toFixed(2)); // "Infinity"
   ```

4. **Диапазон `digits`**:
   - Параметр `digits` должен быть в диапазоне от 0 до 100. Если значение выходит за этот диапазон, выбрасывается `RangeError`.
   
   ```javascript
   console.log(5.123.toFixed(101)); // RangeError: toFixed() digits argument must be between 0 and 100
   ```

5. **Добавление нулей**:
   - Если дробная часть числа короче, чем указанное количество знаков, `toFixed` добавляет нули.
   
   ```javascript
   console.log(5.1.toFixed(3)); // "5.100"
   ```

6. **Неточности чисел с плавающей точкой**:
   - Поскольку JavaScript использует числа с плавающей точкой (IEEE 754), `toFixed` может давать неожиданные результаты из-за погрешностей.
   ```javascript
   console.log(0.1 + 0.2); // 0.30000000000000004
   console.log((0.1 + 0.2).toFixed(2)); // "0.30"
   ```

#### Best Practices:

1. **Проверяйте входные данные**:
   Убедитесь, что число корректно, используя `Number.isFinite`, чтобы избежать обработки `NaN` или 
   
   `Infinity`.
   ```javascript
   let value = 42.6789;
   if (Number.isFinite(value)) {
     console.log(value.toFixed(2)); // "42.68"
   } else {
     console.error("Некорректное число");
   }
   ```

2. **Обрабатывайте пользовательский ввод**:
   Преобразуйте строки в числа с помощью `parseFloat` или `Number` перед использованием `toFixed`.
   
   ```javascript
   let input = "19.999";
   let num = parseFloat(input);
   if (Number.isFinite(num)) {
     console.log(num.toFixed(2)); // "20.00"
   } else {
     console.error("Ошибка: некорректное значение");
   }
   ```

3. **Проверяйте параметр `digits`**:
   Убедитесь, что `digits` находится в допустимом диапазоне (0–100).
   
   ```javascript
   function safeToFixed(value, digits) {
     if (!Number.isFinite(value)) {
       throw new Error("Значение должно быть числом");
     }
     if (!Number.isInteger(digits) || digits < 0 || digits > 100) {
       throw new Error("Количество знаков должно быть от 0 до 100");
     }
     return value.toFixed(digits);
   }
   console.log(safeToFixed(3.14159, 2)); // "3.14"
   ```

4. **Конвертируйте результат обратно в число, если нужно**:
   Если требуется число, а не строка, используйте `parseFloat` или унарный плюс (`+`) после `toFixed`.
   
   ```javascript
   let result = parseFloat((3.14159).toFixed(2)); // 3.14 (число)
   console.log(typeof result); // "number"
   ```

5. **Используйте для форматирования, а не для вычислений**:
   `toFixed` предназначен для форматирования чисел для отображения. Для математических операций используйте `Math.round`, `Math.floor` или `Math.ceil`.
   
   ```javascript
   let value = 3.14159;
   console.log(value.toFixed(2)); // "3.14" (для отображения)
   console.log(Math.round(value * 100) / 100); // 3.14 (для вычислений)
   ```

6. **Учитывайте погрешности чисел с плавающей точкой**:
   Для финансовых вычислений с высокой точностью используйте библиотеки, такие как `decimal.js`, вместо `toFixed`, чтобы избежать ошибок округления.
   
   ```javascript
   let sum = 0.1 + 0.2;
   console.log(sum.toFixed(2)); // "0.30"
   ```

#### Пример кода с учётом best practices:

```javascript
// Безопасное форматирование числа
function safeToFixed(value, digits = 2) {
  const num = parseFloat(value);
  if (!Number.isFinite(num)) {
    throw new Error("Значение должно быть числом");
  }
  if (!Number.isInteger(digits) || digits < 0 || digits > 100) {
    throw new Error("Количество знаков должно быть от 0 до 100");
  }
  return num.toFixed(digits);
}

try {
  console.log(safeToFixed("42.6789", 2)); // "42.68"
  console.log(safeToFixed("abc", 2)); // Ошибка
  console.log(safeToFixed(3.14159, 101)); // Ошибка
} catch (error) {
  console.error(error.message);
}

// Форматирование финансовых данных
function formatPrice(price) {
  const num = parseFloat(price);
  if (!Number.isFinite(num)) {
    throw new Error("Цена должна быть числом");
  }
  return num.toFixed(2);
}

try {
  console.log(formatPrice(19.999)); // "20.00"
  console.log(formatPrice("15.5")); // "15.50"
} catch (error) {
  console.error(error.message);
}
```

#### Отличие от других методов:

- **`toFixed` vs `Math.round`/`Math.floor`/`Math.ceil`**:
  - **`toFixed` возвращает строку с фиксированным количеством знаков после запятой.**
  - **`Math.round`, `Math.floor`, `Math.ceil` возвращают целое число.**

  ```javascript
  let value = 3.14159;
  console.log(value.toFixed(2)); // "3.14" (строка)
  console.log(Math.round(value)); // 3 (число)
  ```
- **`toFixed` vs `toPrecision`**:
  - `toFixed` задаёт количество знаков после запятой.
  - `toPrecision` задаёт общее количество значащих цифр (включая целую часть).
  
  ```javascript
  console.log((123.456).toFixed(2)); // "123.46"
  console.log((123.456).toPrecision(5)); // "123.46"
  ```

#### Заключение:

`toFixed` — удобный метод для форматирования чисел в строки с фиксированным количеством знаков после запятой, идеально подходящий для отображения цен, процентов или других данных в пользовательском интерфейсе. 

Однако он возвращает строку, поэтому для вычислений лучше использовать методы `Math`. Проверяйте входные данные с помощью `Number.isFinite` и убедитесь, что параметр `digits` корректен. Для высокой точности в финансовых расчётах рассмотрите библиотеки, такие как `decimal.js`. 

Метод особенно полезен для форматирования, но требует осторожности при работе с погрешностями чисел с плавающей точкой.