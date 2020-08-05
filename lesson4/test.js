class Critter {}
class Snake extends Critter {}
class Rattler extends Snake {}

let superType = Object.getPrototypeOf(Rattler);

console.log(superType); // Snake