1. Use a factory function to create pet objects. The factory should let us create and use pets like this:

```js
let pudding = createPet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = createPet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake
```

My solution: 

```js
function createPet(animal, name) {
  return {
    animal,
    name,
    asleep: false,

    state() {
      console.log(`I am ${this.asleep ? "sleeping" : "awake"}`);
    },

    sleep() {
      this.asleep = true;
      this.state();
    },

    wake() {
      this.asleep = false;
      this.state();
    },
  };
}
```

2. Use the OLOO pattern to create an object prototype that we can use to create pet objects. The prototype should let us create and use pets like this:

```js
let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake
```

My solution: 

```js
let PetPrototype = {
  sleep: function() {
    console.log("I am sleeping.");
  }, 

  wake: function() {
    console.log("I am awake.");
  },

  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  }
}

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake
console.log(PetPrototype.isPrototypeOf(pudding)); // true
console.log(pudding.hasOwnProperty("wake")); // false 


let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake
console.log(PetPrototype.isPrototypeOf(neptune)); // true
console.log(neptune.hasOwnProperty("wake")); // false 
```

3. How do objects created in problems 1 & 2 differ from each other? 
- the object created with OLOO pattern in problem 2 does not have the copies of the `sleep` and `wake` methods, but rather uses delegation to get those methods from the prototype object called `PetPrototype`. Thus, it uses less space. It's also easy to see the type of the object created by checking 
- the object created with a factory function in problem 1 creates a copy of the object will the copy of all properties.