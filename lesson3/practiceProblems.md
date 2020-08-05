1. What  are two disadvantages of working with factory functions?
1) objects created using factory functions copy all the methods. Those are redundant and put pressure on the memory.
2) there's no way to tell which factory function created an object, so there's no way to be sure that you're working with the right kind of object.

2. Rewrite the following code to use object-literal syntax to generate the returned object:

```js
function makeObj() {
  let obj = {};
  obj.propA = 10;
  obj.propB = 20;
  return obj;
}
```

My solution: 
```js
function makeObj() {
  return {
    propA: 10,
    propB: 20,
  }
}
```

3. In this problem and the remaining problems, we'll build a simple invoice processing program. To get you started, here's the code to process a single invoice:
```js
let invoice = {
  phone: 3000,
  internet: 6500
};

let payment = {
  phone: 1300,
  internet: 5500
};

let invoiceTotal = invoice.phone + invoice.internet;
let paymentTotal = payment.phone + payment.internet;
let remainingDue = invoiceTotal - paymentTotal;

console.log(paymentTotal);         // => 6800
console.log(remainingDue);         // => 2700
```

## Constructor functions practice problems
1. What naming convention separates constructor functions from other functions?
- constructor function name starts with capital letter (e.g. Car, Person, etc.)
- constructor functions do not have specified `return` value
- when calling a constructor function with the `new` keyword, the new instance of the object created by constructor function is returned

2.What happens if you run the following code? Why?

```js
function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = Lizard();
lizzy.scamper(); // ?
```

The `TypeError: Cannot read property 'scamper' of undefined` error raised by the JS engine on line 8 when trying to access the property of `undefined`, because:
1) constructor function `Lizard()` was called without a `new` keyword and returns `undefined` on line 7

In order to fix the error and get a string `"I'm  scampering"`, we can add `new` keyword before `Lizard()` function invocation on line 7.

3. Alter the code in problem 2 so that it produces the desired output: `I'm scampering!`.

```js
function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = new Lizard();
lizzy.scamper(); // "I'm scampering!"
```

## Practice Problems - Constructors and Prototypes

1. What does the following code log to the console? Try to answer without running the code. Can you explain why the code produces the output it does?

```js
let RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area();
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);
```
The code will log `NaN` on line 19 and `NaN` on line 20 to the console, because: 
1) `area` and `perimeter` methods of the `Rectangle` constructor function is assigned to a a function with execution context of the `RECTANGLE` object, not the newly created object. 

2. How would you fix the problem 1? 

```js
Rectangle.prototype = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
}

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = this.area();
  this.perimeter = this.perimeter();
}


let rect1 = new Rectangle(2, 3);

console.log(rect1.area);       // 6
console.log(rect1.perimeter);  // 10
```

3. Write a constructor function called Circle that takes a radius as an argument. You should be able to call an area method on any objects created by the constructor to get the circle's area. Test your implementation with the following code:

```js
let a = new Circle(3);
let b = new Circle(4);

a.area().toFixed(2); // => 28.27
b.area().toFixed(2); // => 50.27
a.hasOwnProperty('area'); // => false
```

My Solution: 
```js
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return Math.PI * (this.radius ** 2);
}

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty('area')); // => false
```

4. What will the following code log to the console and why?

```js
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());
```

`console.log` function call logs `true` to the console, because: 
1) method `swingSword` was defined on the prototype of the constructor `Ninja` and is avaiable to any object created with `Ninja`;

The object `ninja`created on the line 5 using `new` keyword and `Ninja` constructor has a property `swung` with value of `true`. On line 11 `ninja` uses delegation to access the method of its constructor prototype `swingSword`. The method `swingSword` returns the value of the `swung` property - `true`.

5. What will the following code output and why? Try to answer without running the code.

```js
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

console.log(ninja.swingSword());
```

On line 13 `TypeError: ninja.swingSword is not a function` is raised by JS engine, because: 
1) object `ninja` prototype object does not have `swingSword` method. Trying to invoke a method that does not exist raises an error. 

On line 1 `Ninja` constructor is declared. As any JS function, it has the prototype.

On line 5 new object `ninja` is created using the `Ninja` constructor. It shares the same prototype as `Ninja` at this point. 

On line 7, `Ninja` prototype object is reassigned to the new object value. This does not change the prototype for the `ninja` object. From this point, any properties defined within the body of the new `Ninja` prototype are not avaiable for `ninja`. 

6. Implement the method described in the comments below:

```js
function Ninja() {
  this.swung = false;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`
```

My solution: 
```js
function Ninja() {
  this.swung = false;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object

Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
}

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`
```

7. In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:
```js
let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else

ninjaA.constructor === ninjaB.constructor // => true
```

My solution: 
```js
let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
let ninjaB = new ninjaA.constructor();

console.log(ninjaA.constructor === ninjaB.constructor) // => true
```

8. Since a constructor is just a function, you can call it without the `new` operator. However, that can lead to unexpected results and errors, especially for inexperienced programmers. Write a constructor function that you can use with or without the new operator. The function should return the same result with either form. Use the code below to check your solution:

```js
function User(first, last) {
  if()
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe
```

## Practice Problems - Classes
1. If we have a Car class and a Truck class, how can you use the Speed object as a mix-in to make them goFast? How can you check whether your Car or Truck can now go fast?
```js
const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}
```