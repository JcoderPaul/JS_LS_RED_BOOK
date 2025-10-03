Полиморфизм подтипов (или подтиповый полиморфизм, также известный как субтипный полиморфизм) в JavaScript — это механизм, при котором объекты разных типов, связанных через наследование или реализацию общего интерфейса, могут использоваться единообразно через их общий базовый тип. 

Этот вид полиморфизма позволяет вызывать методы на объектах, не зная их конкретного типа, при условии, что они принадлежат к одной иерархии наследования или реализуют общий интерфейс.

В JavaScript полиморфизм подтипов чаще всего реализуется через **наследование** (прототипное или через классы ES6) или через **утиную типизацию** (когда объект считается подходящим, если он реализует определённые методы, независимо от явного наследования). 

Поскольку JavaScript — это динамически типизированный язык, полиморфизм подтипов работает неявно, но в TypeScript он становится более строгим благодаря явной типизации.

### Основные принципы полиморфизма подтипов:

1. **Общий интерфейс или базовый класс**: Объекты разных типов должны иметь общий базовый класс или реализовывать одинаковый набор методов.
2. **Замещение (Liskov Substitution Principle)**: Объект подтипа должен быть способен заменить объект базового типа без нарушения поведения программы.
3. **Динамическое связывание**: Вызов метода определяется типом объекта во время выполнения, а не типом переменной.

### Полиморфизм подтипов в JavaScript:

#### Пример: Использование классов

```javascript
class Animal {
    makeSound() {
        return "Some generic sound";
    }
}

class Dog extends Animal {
    makeSound() {
        return "Woof!";
    }
}

class Cat extends Animal {
    makeSound() {
        return "Meow!";
    }
}

function makeAnimalSound(animal) {
    console.log(animal.makeSound());
}

const animals = [new Dog(), new Cat(), new Animal()];
animals.forEach(animal => makeAnimalSound(animal));
// Вывод:
// Woof!
// Meow!
// Some generic sound
```

В этом примере:
- `Dog` и `Cat` наследуют от `Animal`, переопределяя метод `makeSound`.
- Функция `makeAnimalSound` принимает объект типа `Animal` и вызывает метод `makeSound`, который работает по-разному в зависимости от конкретного типа объекта.
- Это классический пример полиморфизма подтипов, так как функция работает с любым подтипом `Animal`.

#### Пример: Прототипное наследование
До введения классов в ES6 полиморфизм подтипов в JavaScript часто реализовывался через прототипы:

```javascript
function Animal() {}
Animal.prototype.makeSound = function() {
    return "Some generic sound";
};

function Dog() {}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.makeSound = function() {
    return "Woof!";
};

function Cat() {}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.makeSound = function() {
    return "Meow!";
};

const animals = [new Dog(), new Cat(), new Animal()];
animals.forEach(animal => console.log(animal.makeSound()));
// Вывод:
// Woof!
// Meow!
// Some generic sound
```

Здесь используется прототипное наследование, но принцип остаётся тем же: объекты разных типов обрабатываются единообразно через общий метод.

#### Пример: Утиная типизация

JavaScript не требует явного наследования для полиморфизма подтипов. Если объекты реализуют одинаковые методы, их можно использовать полиморфно (утиная типизация: "Если оно крякает как утка, то это утка").

```javascript
const dog = {
    makeSound: () => "Woof!"
};

const cat = {
    makeSound: () => "Meow!"
};

const robot = {
    makeSound: () => "Beep boop!"
};

function makeSound(entity) {
    console.log(entity.makeSound());
}

[dog, cat, robot].forEach(entity => makeSound(entity));
// Вывод:
// Woof!
// Meow!
// Beep boop!
```

Здесь объекты `dog`, `cat` и `robot` не связаны наследованием, но имеют метод `makeSound`, что позволяет использовать их полиморфно.

### Полиморфизм подтипов в TypeScript:

В TypeScript полиморфизм подтипов становится более строгим благодаря явной типизации и интерфейсам. Это позволяет проверять совместимость типов на этапе компиляции.

#### Пример: Использование интерфейсов

```typescript
interface Animal {
    makeSound(): string;
}

class Dog implements Animal {
    makeSound(): string {
        return "Woof!";
    }
}

class Cat implements Animal {
    makeSound(): string {
        return "Meow!";
    }
}

function makeAnimalSound(animal: Animal) {
    console.log(animal.makeSound());
}

const animals: Animal[] = [new Dog(), new Cat()];
animals.forEach(animal => makeAnimalSound(animal));
// Вывод:
// Woof!
// Meow!
```

Здесь интерфейс `Animal` задаёт контракт, который должны реализовать классы `Dog` и `Cat`. Функция `makeAnimalSound` работает с любым объектом, реализующим интерфейс `Animal`.

#### Пример: Наследование с ограничением типов

```typescript
class Animal {
    makeSound(): string {
        return "Some generic sound";
    }
}

class Dog extends Animal {
    makeSound(): string {
        return "Woof!";
    }
}

class Cat extends Animal {
    makeSound(): string {
        return "Meow!";
    }
}

function makeAnimalSound<T extends Animal>(animal: T) {
    console.log(animal.makeSound());
}

const dog = new Dog();
const cat = new Cat();
makeAnimalSound(dog); // Woof!
makeAnimalSound(cat); // Meow!
```

Здесь используется ограничение типов (`T extends Animal`), чтобы гарантировать, что функция работает только с подтипами `Animal`.

### Особенности полиморфизма подтипов в JS/TS:

1. **В JavaScript**:
   - Полиморфизм подтипов реализуется через наследование (классы или прототипы) или утиную типизацию.
   - Динамическая типизация делает полиморфизм гибким, но может привести к ошибкам, если метод отсутствует.
   - Утиная типизация позволяет использовать полиморфизм без явного наследования.

2. **В TypeScript**:
   - Явная типизация и интерфейсы обеспечивают строгую проверку типов на этапе компиляции.
   - Поддержка generics позволяет комбинировать полиморфизм подтипов с параметрическим полиморфизмом.
   - Принцип замещения Лисков (LSP) более строго соблюдается благодаря типам.

### Когда использовать полиморфизм подтипов:

- Когда есть иерархия классов или объектов, где подтипы расширяют или изменяют поведение базового типа.
- Когда нужно написать код, который работает с обобщённым интерфейсом, но допускает специфичное поведение для подтипов.
- Когда требуется модульность и расширяемость, например, при реализации плагинов или расширений.

### Сравнение с другими видами полиморфизма:

- **Ад-хок полиморфизм**: Обрабатывает разные типы через условную логику или перегрузку, не требуя иерархии.
- **Параметрический полиморфизм**: Работает с любыми типами без привязки к их структуре (например, generics в TypeScript).
- **Полиморфизм подтипов**: Требует иерархии типов или общего интерфейса, где подтипы заменяют базовый тип.

### Практический пример (typescript):

Предположим, вы пишете игру, где разные персонажи имеют уникальные способности, но все должны уметь атаковать:

```typescript
interface Character {
    attack(): string;
}

class Warrior implements Character {
    attack(): string {
        return "Warrior swings a sword!";
    }
}

class Mage implements Character {
    attack(): string {
        return "Mage casts a fireball!";
    }
}

function performAttack(character: Character) {
    console.log(character.attack());
}

const characters: Character[] = [new Warrior(), new Mage()];
characters.forEach(character => performAttack(character));
// Вывод:
// Warrior swings a sword!
// Mage casts a fireball!
```