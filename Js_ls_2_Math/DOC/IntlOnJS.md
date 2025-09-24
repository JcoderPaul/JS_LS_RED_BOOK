Интернационализация (Intl) в JavaScript — это встроенный API, предоставляющий инструменты для форматирования текста, 
чисел, дат и времени с учетом локали пользователя, а также для сравнения строк с учетом языковых особенностей. 

API Intl помогает создавать приложения, адаптированные для разных языков и регионов, без необходимости писать 
сложную логику самостоятельно.

### Основные возможности Intl:

1. **Форматирование чисел (Intl.NumberFormat)**  
   Используется для форматирования чисел, включая валюты, проценты и числа с учетом локальных настроек (например, разделители тысяч, десятичные точки).

   ```javascript
   const number = 1234567.89;
   const formatter = new Intl.NumberFormat('ru-RU', {
       style: 'currency',
       currency: 'RUB'
   });
   console.log(formatter.format(number)); // "1 234 567,89 ₽"
   ```

   - Поддерживаемые локали: `ru-RU`, `en-US`, `de-DE` и т.д.
   - Опции: `style` (`decimal`, `currency`, `percent`), `currency`, `minimumFractionDigits`, `maximumFractionDigits` и др.

2. **Форматирование дат и времени (Intl.DateTimeFormat)**  
   Позволяет форматировать даты и время с учетом локали.

   ```javascript
   const date = new Date();
   const formatter = new Intl.DateTimeFormat('ru-RU', {
       year: 'numeric',
       month: 'long',
       day: 'numeric',
       hour: 'numeric',
       minute: 'numeric'
   });
   console.log(formatter.format(date)); // "9 сентября 2025 г., 09:56"
   ```

   - Опции: `year`, `month`, `day`, `hour`, `minute`, `second`, `timeZone` и др.

3. **Сравнение строк (Intl.Collator)**  
   Используется для сортировки и сравнения строк с учетом языковых правил (например, порядок букв в алфавите может различаться).

   ```javascript
   const collator = new Intl.Collator('ru-RU');
   const strings = ['Яблоко', 'Апельсин', 'ёжик'];
   console.log(strings.sort(collator.compare)); // ["Апельсин", "ёжик", "Яблоко"]
   ```

4. **Форматирование относительного времени (Intl.RelativeTimeFormat)**  
   Позволяет форматировать относительное время, например, «вчера», «через 2 дня».

   ```javascript
   const rtf = new Intl.RelativeTimeFormat('ru-RU', { numeric: 'auto' });
   console.log(rtf.format(-1, 'day')); // "вчера"
   console.log(rtf.format(2, 'day')); // "через 2 дня"
   ```

5. **Форматирование списков (Intl.ListFormat)**  
   Форматирует списки с учетом языковых правил (например, правильное использование запятых и союзов).

   ```javascript
   const lf = new Intl.ListFormat('ru-RU', { style: 'long', type: 'conjunction' });
   console.log(lf.format(['яблоки', 'груши', 'бананы'])); // "яблоки, груши и бананы"
   ```

6. **Форматирование единиц измерения (Intl.NumberFormat с unit)**  
   Поддерживает форматирование чисел с единицами измерения (например, километры, литры).

   ```javascript
   const formatter = new Intl.NumberFormat('ru-RU', {
       style: 'unit',
       unit: 'kilometer'
   });
   console.log(formatter.format(5)); // "5 км"
   ```

### Поддержка локалей:

- Локали указываются в формате BCP 47 (например, `ru-RU`, `en-US`, `zh-CN`).
- Если локаль не указана, используется локаль по умолчанию (браузер или среда выполнения).
- Можно указать резервную локаль через `Intl.getCanonicalLocales`.

### Проверка поддержки:

API Intl поддерживается во всех современных браузерах и Node.js (с версии 0.12). Для старых сред можно использовать полифиллы, такие как `@formatjs/intl`.

### Пример комплексного использования:

```javascript
const amount = 12345.67;
const date = new Date();
const locale = 'ru-RU';

const numberFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'RUB'
});

const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'full',
    timeStyle: 'short'
});

console.log(`Сумма: ${numberFormatter.format(amount)}`);
console.log(`Дата: ${dateFormatter.format(date)}`);
```

### Полезные замечания:

- **Производительность**: Intl API оптимизирован для работы с локализацией и обычно быстрее, чем пользовательские решения.
- **Полифиллы**: Если требуется поддержка старых браузеров, используйте библиотеки, такие как `polyfill.io` или `@formatjs/intl`.
- **Node.js**: Убедитесь, что у вас установлены полные ICU-данные для поддержки всех локалей (`--with-intl=full-icu` при сборке Node.js).