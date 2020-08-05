1. What will the following code output? Try to determine the results without running the code.
```js
function func() {
  return this;
}

let context = func();

console.log(context);
```

On line 7, `console.log()` function call prints `Object global {...}` to the console, because: 
1) we assign the return value of the function `func()` invocation to the variable `context` on line 5. 

The execution context of the function `func` is the global object. Thus, when we assign the return value of the function `func` invocation, we assign value of global object to the variable. 

2. What will the following code output? Explain the difference, if any, between this output and that of problem 1.

```js
let obj = {
  func: function() {
    return this;
  },
};

let context = obj.func();

console.log(context);
```

On line 9, the function `console.log` call prints `{ func: [Function: func] }` to the console, because: 
1) on line 7 `obj.func()` is invoked as a method of object `obj`

Since `obj.func()` is invoked as a method, its explicit execution context is object that was used to invoke it. 

3. What will the following code output?

```js
message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage();

let foo = {
  message: 'Hello from the function scope!',
};

foo.deliverMessage = deliverMessage;

foo.deliverMessage();
```

On line 7, function `deliverMessage()` invocation prints `"Hello from the global scope!"` string to the console, because: 
1) `deliverMessage()` was invoked as a function and its execution context is global object. 

On line 15, method `foo.deliverMessage()` invocation prints `"Hello from the function scope!"` to the console, because:
1) the value of `deliverMessage` is assigned to the new property `deliverMessage` of the object `foo`;
2) `deliverMessage()` was invoked as a method on object `foo` and its explicit context in this case is the object which was used to invoke it.

5. Take a look at the following code snippet. Use `call` to invoke the `add` method but with `foo` as execution context. What will this return?

```js
let foo = {
  a: 1,
  b: 2,
};

let bar = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};

console.log(bar.add.call(foo)); // 3
```

# Practice Problems: Hard Binding Functions with Contexts
1. What method can we use to bind a function permanently to a particular execution context? 
- We can use Function.prototype.bind() method. It will return a new function that is permanently bound to the passed in execution context.

2. What will the following code log to the console?
```js
let obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);
```

This code will not log anything to the console, because: 
1) the function value that is permanently bound to object `foo`'s execution context on line 9 has not been invoked.

3. What will the following code output?

```js
let obj = {
  a: 2,
  b: 3,
};

function foo() {
  return this.a + this.b;
}

let bar = foo.bind(obj);

console.log(foo());
console.log(bar());
```

On line 12, function `console.log` invocation will print `NaN` to the console, because: 
1) `foo` is invoked as a function. 

The function `foo` execution context is the global object. The global object does not have properties with names `a` and `b`. Trying to access properties that are not defined, returns value `undefined`. Any calculations on `undefined` return `NaN`. 

On line 13, function `console.log` invocation will print `5` to the console, because: 
1) function `bar` execution context is bound to the object `obj` execution context permanently on line 10. 

4. What will the code below log to the console?
```js
let positivity = {
  message: 'JavaScript makes sense!',
};

let negativity = {
  message: 'JavaScript makes no sense!',
};

function foo() {
  console.log(this.message);
}

let bar = foo.bind(positivity);

negativity.logMessage = bar;
negativity.logMessage();
```

On line 16, `logMessage` method invocation on the object `negativity` prints `"JavaScript makes sense!"` to the console, because: 
1) method `logMessage` of object `negativity` is assigned to the value of the function `bar`. 

Function `bar` is permanently bound to the execution context of object `positivity` on line 13. On line 16, JavaScript engine calls method `logMessage` on object `negativity` with explicit context of object `positivity`.

5. What will the code below output?
```js
let obj = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
};

function foo() {
  console.log(this.a);
}

let bar = foo.bind(obj);

bar.call(otherObj);
```

On line 14, method `call` invocation on function `bar` prints `"Amazebulous"` to the console, because: 
1) variable `bar` is permanently bound to the execution context of object `obj` on line 12. 

Using `call` method after the function is permanently bound to a given execution context does not change it. 

# Practice Problems: Dealing with Context Loss
1. The code below should output "Christopher Turk is a Surgeon". Without running the code, what will it output? If there is a difference between the actual and desired output, explain the difference.

```js
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);
```

The function `logReturnVal` invocation on line 16 will log `"undefined undefined is a undefined"` to the console, because: 
1) `turk.getDescription` method loses the context of object `turk`, from which it was copied from. 

There are 2 ways to fix the problem: 
- change `logReturnVal` function to accept second parameter `context` and use it while calling `func()` on line 12: 

```js
function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);
```
- call `bind` method on `turk.getDescription` to permanently bind its execution context to the `turk` object: 

```js
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  };
};

let getTurkDescription = turk.getDescription.bind(turk);
```

4. Consider the following code:
```js
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
```

Will this code produce the following output? Why or why not?
```js
The Elder Scrolls: Arena
The Elder Scrolls: Daggerfall
The Elder Scrolls: Morrowind
The Elder Scrolls: Oblivion
The Elder Scrolls: Skyrim
```

No, this code will not produce provided output. 

`forEach` method will call `console.log` function 5 times for each of the `TESgames.titles` property elements and print to the console: 
```js 
undefined: Arena
undefined: Daggerfall
undefined: Morrowind
undefined: Oblivion
undefined: Skyrim
```
because: 
1) anonymus function passed to the `forEach` method as an argument on line 5 loses its surrounding context, and has the global object as its execution context.

To get the expected output to the console, we can: 
- use `let self = this;` to ensure that `TESgames.listGammes` uses `TESgames` as its context: 

```js
  listGames: function() {
    let self = this;
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ': ' + title);
    });
```

- supply `forEach` method with an optional `thisArg` second argument after the anonymus function to explicitly specify the execution context

```js
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    }, this);
```

- use an arrow function to bind the execution context to the context of the surrounding object:

```js
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
```

8. Consider the following code:
```js
let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
```
What will the value of `foo.a` be after this code runs?

After the code runs, the value of the `foo.a` will be `0`, because: 
1) method `foo.incrementA()` invocation does not mutate the value of the object `foo` property `a`. 

On line 4 within the body of the method `incrementA`, function `increment` is defined. It's a standalone function and, thus, uses global object as its `this` value. 

When `increment` function is invoked on line 8, it uses global object, not surrounding object `foo` execution context. 

We can use one of the following methods to invoke `increment` with explicit context such that `foo.a` gets incremented with each invocation of `incrementA`:
- preserve the context with a variable in the outer scope: 
```js
let foo = {
  a: 0,
  incrementA: function() {
    let self = this;
    function increment() {
      self.a += 1;
    }

    increment();
  }
};

foo.incrementA();
```

- call `bind` method on anonymus function and assign it to variable to bind the execution context to the surrounding object permanently: 
```js
let foo = {
  a: 0,
  incrementA: function() {
    let increment = function() {
      this.a += 1;
    }.bind(this);

    increment();
  }
};

foo.incrementA();
```

- use arrow function to bind the execution context to the surrounding object permanently

```js
let foo = {
  a: 0,
  incrementA: function() {
    let increment = () => {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
```

- call `increment` function with the explicit execution context: 
```js
let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  }
};

foo.incrementA();
```