Объект `Intl.DateTimeFormat` в JavaScript предоставляет множество опций для настройки форматирования дат и времени с 
учетом локалей. Эти опции позволяют точно контролировать, какие компоненты даты/времени отображать, их стиль, формат 
и часовой пояс.

### Основные опции `Intl.DateTimeFormat`:

Опции передаются в конструктор `Intl.DateTimeFormat` вторым аргументом в виде объекта. Они делятся на категории: стили, компоненты даты/времени, часовые пояса и дополнительные настройки.

#### 1. **Стили (высокоуровневые настройки)**:

Эти опции задают общий стиль форматирования, упрощая настройку для типичных сценариев.

- **`dateStyle`**  
  Определяет стиль форматирования даты.  
  Значения:
  - `full`: Полный формат (например, "вторник, 9 сентября 2025 г.").
  - `long`: Длинный формат (например, "9 сентября 2025 г.").
  - `medium`: Средний формат (например, "9 сент. 2025 г.").
  - `short`: Короткий формат (например, "09.09.2025").  
  Пример:

  ```javascript
  const date = new Date('2025-09-09T14:28:00Z');
  const formatter = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'full' });
  console.log(formatter.format(date)); // "вторник, 9 сентября 2025 г."
  ```

- **`timeStyle`**  
  Определяет стиль форматирования времени.  
  Значения:
  - `full`: Полный формат (например, "14:28:00 Центральноевропейское летнее время").
  - `long`: Длинный формат (например, "14:28:00 CEST").
  - `medium`: Средний формат (например, "14:28:00").
  - `short`: Короткий формат (например, "14:28").  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('ru-RU', { timeStyle: 'medium' });
  console.log(formatter.format(date)); // "17:28:00" (для Europe/Paris, +3 часа от UTC)
  ```

- **Примечание**: `dateStyle` и `timeStyle` нельзя комбинировать с индивидуальными настройками компонентов (например, `year`, `month`), так как они взаимоисключающие.

#### 2. **Компоненты даты и времени**
Эти опции позволяют точно указать, какие части даты или времени отображать и в каком формате.

- **`year`**  
  Формат года.  
  Значения:
  - `numeric`: Полный год (например, "2025").
  - `2-digit`: Две последние цифры года (например, "25").  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('ru-RU', { year: 'numeric' });
  console.log(formatter.format(date)); // "2025"
  ```

- **`month`**  
  Формат месяца.  
  Значения:
  - `numeric`: Числовой (например, "9").
  - `2-digit`: Двузначный числовой (например, "09").
  - `long`: Полное название (например, "сентябрь").
  - `short`: Короткое название (например, "сент.").
  - `narrow`: Узкое название (например, "С").  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('ru-RU', { month: 'long' });
  console.log(formatter.format(date)); // "сентябрь"
  ```

- **`day`**  
  Формат дня месяца.  
  Значения:
  - `numeric`: Числовой (например, "9").
  - `2-digit`: Двузначный (например, "09").  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('ru-RU', { day: '2-digit' });
  console.log(formatter.format(date)); // "09"
  ```

- **`weekday`**  
  Формат дня недели.  
  Значения:
  - `long`: Полное название (например, "вторник").
  - `short`: Короткое название (например, "вт").
  - `narrow`: Узкое название (например, "В").  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('ru-RU', { weekday: 'long' });
  console.log(formatter.format(date)); // "вторник"
  ```

- **`hour`**, **`minute`**, **`second`**  
  Формат часов, минут, секунд.  
  Значения:
  - `numeric`: Числовой (например, "14", "28", "0").
  - `2-digit`: Двузначный (например, "14", "28", "00").  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
  });
  console.log(formatter.format(date)); // "17:28"
  ```

- **`era`**  
  Отображение эры (например, "н. э." или "до н. э.").  
  Значения:
  - `long`: Полное название (например, "наша эра").
  - `short`: Короткое (например, "н. э.").
  - `narrow`: Узкое (например, "н.э.").  
  Пример:

  ```javascript
  const oldDate = new Date('0001-01-01T00:00:00Z');
  const formatter = new Intl.DateTimeFormat('ru-RU', { era: 'long', year: 'numeric' });
  console.log(formatter.format(oldDate)); // "1 год нашей эры"
  ```

- **`dayPeriod`**  
  Период дня (например, "AM/PM" или "утро/вечер").  
  Значения:
  - `long`: Полное описание (например, "после полудня").
  - `short`: Короткое (например, "PM").
  - `narrow`: Узкое (например, "PM").  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      dayPeriod: 'short'
  });
  console.log(formatter.format(date)); // "2 PM"
  ```

#### 3. **Настройки времени**
- **`timeZone`**  
  Указывает часовой пояс.  
  Значения: Строки в формате IANA (например, `Europe/Paris`, `America/New_York`, `UTC`).  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('ru-RU', {
      timeStyle: 'medium',
      timeZone: 'America/New_York'
  });
  console.log(formatter.format(date)); // "10:28:00" (для -4 часа от UTC)
  ```

- **`timeZoneName`**  
  Формат отображения названия часового пояса.  
  Значения:
  - `long`: Полное название (например, "Центральноевропейское летнее время").
  - `short`: Короткое (например, "CEST").
  - `longOffset`: Смещение (например, "GMT+02:00").
  - `shortOffset`: Короткое смещение (например, "+02:00").
  - `longGeneric`: Общее название (например, "Центральноевропейское время").
  - `shortGeneric`: Короткое общее (например, "CET").  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('ru-RU', {
      timeStyle: 'short',
      timeZoneName: 'short'
  });
  console.log(formatter.format(date)); // "17:28 CEST"
  ```

- **`hour12`**  
  Использовать 12-часовой (true) или 24-часовой (false) формат.  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
  });
  console.log(formatter.format(date)); // "2:28 PM"
  ```

- **`hourCycle`**  
  Определяет цикл часов (переопределяет `hour12` для локалей).  
  Значения:
  - `h11`: 0-11 часов (с AM/PM).
  - `h12`: 1-12 часов (с AM/PM).
  - `h23`: 0-23 часа.
  - `h24`: 1-24 часа.  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('ru-RU', {
      hour: 'numeric',
      hourCycle: 'h12'
  });
  console.log(formatter.format(date)); // "2 PM"
  ```

#### 4. **Дополнительные настройки**
- **`formatMatcher`**  
  Алгоритм выбора формата.  
  Значения:
  - `best fit`: Выбирает наиболее подходящий формат (по умолчанию).
  - `basic`: Использует стандартный алгоритм.  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      formatMatcher: 'best fit'
  });
  console.log(formatter.format(date)); // "сентябрь 2025 г."
  ```

- **`dateTimeFormat`**  
  Указывает календарь (редко используется, зависит от локали).  
  Значения: `gregory` (григорианский), `buddhist`, `japanese`, и т.д.  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
      year: 'numeric',
      era: 'long'
  });
  console.log(formatter.format(date)); // "令和7年" (7-й год эры Рэйва)
  ```

- **`numberingSystem`**  
  Система нумерации (например, арабские или другие цифры).  
  Значения: `latn` (арабские цифры), `arab`, `hanidec`, и т.д.  
  Пример:

  ```javascript
  const formatter = new Intl.DateTimeFormat('ar-EG-u-nu-arab', {
      year: 'numeric'
  });
  console.log(formatter.format(date)); // "٢٠٢٥" (арабские цифры)
  ```

### Пример комбинирования опций

```javascript
const date = new Date('2025-09-09T14:28:00Z');
const formatter = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Moscow',
    timeZoneName: 'short'
});
console.log(formatter.format(date)); // "вторник, 9 сентября 2025 г., 17:28 MSK"
```

### Получение частей формата
Метод `formatToParts` позволяет разбить отформатированную дату на части для кастомной обработки:

```javascript
const formatter = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
const parts = formatter.formatToParts(date);
console.log(parts);
// [
//   { type: 'day', value: '9' },
//   { type: 'literal', value: ' ' },
//   { type: 'month', value: 'сентября' },
//   { type: 'literal', value: ' ' },
//   { type: 'year', value: '2025' }
// ]
```

### Лучшие практики
1. **Используйте `dateStyle`/`timeStyle` для простоты**:
   - Если не нужны специфические форматы, используйте `dateStyle` и `timeStyle` для стандартного отображения, соответствующего локали.
2. **Явно указывайте `timeZone`**:
   - Для единообразия в многорегиональных приложениях указывайте `timeZone: 'UTC'` или конкретный часовой пояс.
3. **Кэшируйте форматтеры**:
   - Создание `Intl.DateTimeFormat` может быть затратным, поэтому сохраняйте экземпляры для повторного использования.
4. **Проверяйте поддержку локалей**:
   - Используйте `Intl.getCanonicalLocales` для валидации локалей.

   ```javascript
   console.log(Intl.getCanonicalLocales('ru-RU')); // ["ru-RU"]
   ```
5. **Избегайте конфликтов опций**:
   - Не комбинируйте `dateStyle`/`timeStyle` с индивидуальными настройками (`year`, `month`, и т.д.), так как это вызовет ошибку.
6. **Тестируйте с разными локалями**:
   - Проверяйте форматирование для локалей с нестандартными календарями или системами нумерации (например, `ar-SA`, `ja-JP`).

### Ограничения
- **Поддержка часовых поясов**: Не все часовые пояса поддерживаются в старых браузерах. Проверяйте с помощью `Intl.supportedValuesOf('timeZone')`.
- **Node.js**: Для полной поддержки локалей и календарей требуется сборка с полными ICU-данными (`--with-intl=full-icu`).
- **Полифиллы**: Для старых окружений используйте `@formatjs/intl` или `polyfill.io`.

### Заключение:

Опции `Intl.DateTimeFormat` предоставляют гибкость для форматирования дат и времени под любые требования, от простых 
стилей (`dateStyle`, `timeStyle`) до детальной настройки компонентов (`year`, `month`, `hour`) и часовых поясов. 
Используйте их для создания интернационализированных приложений, следуя лучшим практикам, чтобы обеспечить 
производительность и совместимость.