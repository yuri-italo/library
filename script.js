const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  if (!(book instanceof Book)) {
    throw new Error("Invalid book");
  }

  myLibrary.push(book);
}

const book1 = new Book("1984", "George Orwell", 328, true);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, false);
const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
const book4 = new Book("Moby-Dick", "Herman Melville", 635, false);
const book5 = new Book("Pride and Prejudice", "Jane Austen", 279, true);
const book6 = new Book("The Catcher in the Rye", "J.D. Salinger", 214, false);
const book7 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
const book8 = new Book("Fahrenheit 451", "Ray Bradbury", 158, false);
const book9 = new Book("Jane Eyre", "Charlotte Brontë", 500, true);
const book10 = new Book("Brave New World", "Aldous Huxley", 268, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book6);
addBookToLibrary(book7);
addBookToLibrary(book8);
addBookToLibrary(book9);
addBookToLibrary(book10);

console.log(myLibrary);
