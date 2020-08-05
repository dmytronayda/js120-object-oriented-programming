function createBook(title, author, read = false) {
  return {
    title: title,
    author: author,
    read: read,

    getDescription: function() {
      return `${this.title} was written by ${this.author}.` + " " + 
             `I ${this.read ? "have" : "haven't"} read this book.`;
    },

    readBook: function() {
      this.read = true;
    },
  };
}

let book1 = createBook("Mythos", "Stephen Fry");
let book2 = createBook("Me Talk Pretty One Day", "David Sedaris");
let book3 = createBook("Aunts aren't Gentlemen", "PG Wodehouse");

console.log(book1.getDescription());
book1.readBook();
console.log(book1.getDescription());

// console.log(book2.getDescription());
// console.log(book3.getDescription());