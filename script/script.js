function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleStatus = function () {
  this.read = !this.read;
};

const myLibrary = [];
const dialog = document.querySelector(".book-form-dialog");
const newBookButton = document.querySelector(".header-container .btn");
const closeButton = dialog.querySelector(".close-btn");
const cancelButton = dialog.querySelector(".cancel-btn");
const form = dialog.querySelector(".book-form");
const container = document.querySelector(".main-container");

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

[closeButton, cancelButton].forEach((btn) =>
  btn.addEventListener("click", () => dialog.close())
);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const newBook = new Book(
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("read") === "true"
  );

  addBookToLibrary(newBook);

  form.reset();
  dialog.close();

  displayCards(myLibrary);
});

function addBookToLibrary(book) {
  if (!(book instanceof Book)) {
    throw new Error("Invalid book");
  }

  myLibrary.unshift(book);
}

function displayCards(books) {
  container.innerText = "";

  books.forEach((book) => {
    const bookCard = createBookCard(
      book.title,
      book.author,
      book.pages,
      book.read
    );

    bookCard.setAttribute("data-id", books.indexOf(book));
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
  statusButton.classList.add("btn", "status-btn");
  statusButton.textContent = "Status";
  statusButton.addEventListener("click", handleChangeStatus);

  const removeButton = document.createElement("button");
  removeButton.classList.add("btn", "remove-btn");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", handleRemoveCard);

  cardButtons.appendChild(statusButton);
  cardButtons.appendChild(removeButton);

  card.appendChild(bookTitle);
  card.appendChild(bookInfo);
  card.appendChild(cardButtons);

  return card;
}

function handleRemoveCard(event) {
  const index = event.target.closest(".book-card").getAttribute("data-id");
  myLibrary.splice(index, 1);
  displayCards(myLibrary);
}

function handleChangeStatus(event) {
  const index = event.target.closest(".book-card").getAttribute("data-id");
  myLibrary[index].toggleStatus();
  displayCards(myLibrary);
}

function initialData() {
  const book1 = new Book("The Adventures of Lorem", "Ipsum Dolor", 123, true);
  const book2 = new Book("Aliquam Faucibus", "Consectetur Adipis", 456, false);
  const book3 = new Book("Suspendisse Volut", "Egestas Ut Eleifend", 789, true);
  const book4 = new Book("Vestibulum Vitae", "Auctor Nisi", 234, false);
  const book5 = new Book("Curabitur Ultricies", "Pellentes Tempus", 345, true);
  const book6 = new Book("Proin Sodales", "Maecenas Pharetra", 567, false);

  addBookToLibrary(book1);
  addBookToLibrary(book2);
  addBookToLibrary(book3);
  addBookToLibrary(book4);
  addBookToLibrary(book5);
  addBookToLibrary(book6);

  displayCards(myLibrary);
}

initialData();
