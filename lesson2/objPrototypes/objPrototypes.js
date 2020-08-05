let noPrototypeObj = Object.create(null);
console.log(Object.getPrototypeOf(noPrototypeObj)); // null

let anyOtherObj = {};
console.log(Object.getPrototypeOf(anyOtherObj)); // {}