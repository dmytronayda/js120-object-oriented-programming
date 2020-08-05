/*
What will the following code log to the console? Explain why it logs that value. 
Try to answer without running the code.
*/

let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

console.log(baz.foo + qux.foo);
/*
`console.log` function call logs `3` to the console on line 5, because: 
1) object `baz` has its own value of property `foo`

The property `foo` of object `baz` is assigned to the value of `2` on line 3. 
On line 5, `baz.foo` returns object's own property value (`2`) and `qux.foo`
returns its own property value (`1`). `console.log` function invocation prints
the sum of two values ot the console.a
*/