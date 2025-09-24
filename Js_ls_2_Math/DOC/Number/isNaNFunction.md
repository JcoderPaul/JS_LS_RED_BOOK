#### Что такое `isNaN`?

`isNaN` — встроенная функция в JavaScript, которая проверяет, является ли переданное значение `NaN` (Not-a-Number). 

`NaN` — это специальное значение в JavaScript, представляющее некорректный результат числовых операций (например, `0 / 0` или преобразование строки, не являющейся числом).

**Синтаксис**:

```javascript
isNaN(value)
```
- `value`: значение, которое нужно проверить на `NaN`.

Также существует более строгая функция `Number.isNaN`, введённая в ECMAScript 2015 (ES6), которая проверяет, является ли значение строго `NaN` без приведения типов.

#### Когда применять?

`isNaN` используется, когда нужно:
1. **Проверить результат числовых операций**:

   ```javascript
   let result = 0 / 0;
   console.log(isNaN(result)); // true
   ```
2. **Валидировать пользовательский ввод**:
   
   ```javascript
   let input = parseFloat("abc");
   if (isNaN(input)) {
     console.error("Введено некорректное число");
   }
   ```
3. **Обеспечить корректность вычислений**:
   Проверка на `NaN` перед выполнением операций, чтобы избежать некорректных результатов.
   
   ```javascript
   let value = parseInt("123px", 10);
   if (!isNaN(value)) {
     console.log(value * 2); // 246
   }
   ```

#### Особенности `isNaN`:

1. **Автоматическое приведение типов**:
   Глобальная функция `isNaN` приводит значение к числу перед проверкой, что может дать неожиданные результаты.

   ```javascript
   console.log(isNaN("abc")); // true (строка преобразуется в NaN)
   console.log(isNaN(undefined)); // true (undefined преобразуется в NaN)
   console.log(isNaN({})); // true (объект преобразуется в NaN)
   ```

2. **Отличие от `Number.isNaN`**:
   `Number.isNaN` более строгая и проверяет, является ли значение буквально `NaN`, без приведения типов.

   ```javascript
   console.log(Number.isNaN("abc")); // false (строка не является NaN)
   console.log(Number.isNaN(NaN)); // true
   console.log(Number.isNaN(undefined)); // false
   ```

3. **Ложные срабатывания**:
   Из-за приведения типов `isNaN` может вернуть `true` для значений, которые не являются буквально `NaN`, что делает его менее надёжным в некоторых случаях.

   ```javascript
   console.log(isNaN("")); // false (пустая строка преобразуется в 0)
   console.log(isNaN(true)); // false (true преобразуется в 1)
   ```

4. **`NaN` не равно самому себе**:
   Уникальная особенность `NaN` — оно не равно самому себе (`NaN !== NaN`). Поэтому `isNaN` или `Number.isNaN` — единственные надёжные способы проверки.

   ```javascript
   console.log(NaN === NaN); // false
   console.log(isNaN(NaN)); // true
   ```

#### Best Practices:

1. **Используйте `Number.isNaN` вместо `isNaN`**:
   Для большей точности и избежания неожиданных результатов из-за приведения типов предпочтительнее использовать `Number.isNaN`.

   ```javascript
   let value = "abc";
   console.log(Number.isNaN(value)); // false
   console.log(isNaN(value)); // true (из-за приведения к NaN)
   ```

2. **Проверяйте перед вычислениями**:
   Всегда проверяйте результат операций или преобразований на `NaN`, чтобы избежать некорректных вычислений.

   ```javascript
   let result = parseFloat("123.45px");
   if (!Number.isNaN(result)) {
     console.log(result * 2); // 246.9
   } else {
     console.error("Некорректное число");
   }
   ```

3. **Обрабатывайте пользовательский ввод**:
   Проверяйте входные данные, чтобы убедиться, что они являются корректными числами.

   ```javascript
   let userInput = "42.5";
   let num = parseFloat(userInput);
   if (Number.isNaN(num)) {
     console.error("Введено некорректное значение");
   } else {
     console.log(num); // 42.5
   }
   ```

4. **Не полагайтесь на `NaN` для проверки типов**:
   Если нужно проверить, является ли значение числом, используйте `typeof` или `Number.isFinite` в дополнение к `Number.isNaN`.

   ```javascript
   let value = "123";
   if (typeof value === "number" && !Number.isNaN(value)) {
     console.log("Это корректное число");
   } else {
     console.log("Это не число или NaN");
   }
   ```

5. **Используйте `Number.isFinite` для проверки конечных чисел**:
   Если нужно убедиться, что значение является конечным числом (не `NaN`, не `Infinity`), используйте `Number.isFinite`.

   ```javascript
   console.log(Number.isFinite(42)); // true
   console.log(Number.isFinite(NaN)); // false
   console.log(Number.isFinite(Infinity)); // false
   ```

#### Пример кода с учётом best practices:

```javascript
// Проверка результата преобразования строки
let input = "123.45px";
let num = parseFloat(input);

if (Number.isNaN(num)) {
  console.error("Ошибка: входная строка не является числом");
} else {
  console.log("Число:", num); // Число: 123.45
}

// Проверка сложной операции
let result = 0 / 0;
if (Number.isNaN(result)) {
  console.error("Результат операции: NaN");
} else if (!Number.isFinite(result)) {
  console.error("Результат операции: Infinity");
} else {
  console.log("Результат:", result);
}
```

#### Отличие от других методов:

- **`isNaN` vs `Number.isNaN`**:
  - `isNaN` приводит значение к числу перед проверкой, что может привести к ложным срабатываниям.
  - `Number.isNaN` проверяет только, является ли значение буквально `NaN`.

    ```javascript
    console.log(isNaN("abc")); // true
    console.log(Number.isNaN("abc")); // false
    ```
- **`isNaN` vs `Number.isFinite`**:
  - `Number.isFinite` проверяет, является ли значение конечным числом (не `NaN` и не `Infinity`).
  - `isNaN` проверяет только `NaN`.

    ```javascript
    console.log(Number.isFinite(Infinity)); // false
    console.log(isNaN(Infinity)); // false
    ```

#### Заключение:

`isNaN` — полезная функция для проверки, является ли значение `NaN`, но из-за автоматического приведения типов она может быть менее предсказуемой. Для большей точности используйте `Number.isNaN`. Всегда проверяйте результаты преобразований строк и числовых операций, чтобы избежать ошибок. Для проверки корректности чисел также полезно использовать `Number.isFinite` и `typeof`.