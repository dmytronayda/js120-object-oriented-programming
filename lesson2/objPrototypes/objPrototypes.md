1. What will the following code log to the console? Explain why it logs that value. 
Try to answer without running the code.

```js
/*1*/ let obj1 = { foo: 1 };
/*2*/ let obj2 = Object.create(obj1);
/*3*/ console.log(obj2.foo + obj1.foo);
```

`console.log` function call logs `2` to the console on line 3, because:
1) object `obj2` inherits properties from its prototype object `obj1`;
2) object `obj2` does not have its own property named `foo` and uses delegation to get the value of `foo` property from its prototype object `obj1`.

On line 3 `console.log` function invocation logs the sum of two values to the console.

2. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

```js
/*1*/ let qux = { foo: 1 };
/*2*/ let baz = Object.create(qux);
/*3*/ baz.foo = 2;
/*4*/ 
/*5*/ console.log(baz.foo + qux.foo);
```

`console.log` function call logs `3` to the console on line 5, because: 
1) object `baz` has its own property `foo`.

The object `baz` is initiated and assigned to the prototype of object `qux` on line 2.

The property `foo` of object `baz` is assigned to the value of `2` on line 3. Property assignment does not use the prototype chain; instead, it creates a new property in the `baz` object named `foo`. 

On line 5, `baz.foo` returns object's own property value (`2`) and `qux.foo`
returns its own property value (`1`). `console.log` function invocation prints
the sum of two values ot the console.

3. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

```js
/*1*/ let qux = { foo: 1 };
/*2*/ let baz = Object.create(qux);
/*3*/ qux.foo = 2;
/*4*/ 
/*5*/ console.log(baz.foo + qux.foo);
```
`console.log` function call logs `4` to the console on line 5, because: 
1) object `baz` uses delegation to get value of the property `foo` from its 
prototype object `qux`.

On line 1 variable `qux` is initiated and assigned to the value of object
`{ foo: 1 }`. On line 2 object `baz` is initiated and assigned to the prototype 
of the object `qux`. 

On line 3, property `foo` of the object `qux` is reassigned to value `2`. 

On line 5, object `baz` does not have its own property `foo` and uses
delegation to get value of property `foo` from its prototype object `qux` -- 
number `2`. `console.log` function invocation prints the sum of 2 values to 
the console.
