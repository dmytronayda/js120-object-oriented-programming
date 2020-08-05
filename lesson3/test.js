let str = 'string';

let convertCase = char => {
  if (char !== char.toUpperCase()) {
    return char.toUpperCase();
  } else {
    return char.toLowerCase();
  }
}

str = Array.from(str).map(convertCase).join("");
console.log(str);