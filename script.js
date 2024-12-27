const myLibrary = [];

initialData();
displayCards(myLibrary);

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

function displayCards(books) {
  const container = document.querySelector(".main-container");

  books.forEach((book) => {
    const bookCard = createBookCard(
      book.title,
      book.author,
      book.pages,
      book.read
    );

    container.appendChild(bookCard);
  });
}

function createBookCard(title, author, pages, readStatus) {
  const card = document.createElement("div");
  card.classList.add("book-card");

  const bookTitle = document.createElement("h2");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = title;

  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info");

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = `Author: ${author}`;

  const bookPages = document.createElement("p");
  bookPages.classList.add("book-pages");
  bookPages.textContent = `Pages: ${pages}`;

  const bookRead = document.createElement("p");
  bookRead.classList.add("book-read");
  bookRead.innerHTML = `Read: <span>${readStatus ? "Yes" : "No"}</span>`;

  bookInfo.appendChild(bookAuthor);
  bookInfo.appendChild(bookPages);
  bookInfo.appendChild(bookRead);

  const cardButtons = document.createElement("div");
  cardButtons.classList.add("card-buttons");

  const statusButton = document.createElement("button");
  statusButton.classList.add("btn");
  statusButton.textContent = "Status";

  const removeButton = document.createElement("button");
  removeButton.classList.add("btn");
  removeButton.textContent = "Remove";

  cardButtons.appendChild(statusButton);
  cardButtons.appendChild(removeButton);

  card.appendChild(bookTitle);
  card.appendChild(bookInfo);
  card.appendChild(cardButtons);

  return card;
}

function initialData() {
  const book1 = new Book("1984", "George Orwell", 328, true);
  const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, false);
  const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
  const book4 = new Book("Moby-Dick", "Herman Melville", 635, false);
  const book5 = new Book("Pride and Prejudice", "Jane Austen", 279, true);
  const book6 = new Book("The Catcher in the Rye", "J.D. Salinger", 214, false);

  addBookToLibrary(book1);
  addBookToLibrary(book2);
  addBookToLibrary(book3);
  addBookToLibrary(book4);
  addBookToLibrary(book5);
  addBookToLibrary(book6);
}
