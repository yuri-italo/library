class Book {
  #title;
  #author;
  #pages;
  #read = false;

  constructor(title, author, pages, read) {
    if (typeof title !== "string") {
      throw new Error("title must be a string");
    }

    if (typeof author !== "string") {
      throw new Error("author must be a string");
    }

    pages = Number.parseInt(pages);
    if (typeof pages !== "number" || pages <= 0) {
      throw new Error("pages must be a positive number");
    }

    if (typeof read !== "boolean") {
      throw new Error("read must be a boolean");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleStatus() {
    this.read = !this.read;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    if (typeof value !== "string") {
      throw new Error("title must be a string");
    }
    this.#title = value;
  }

  get author() {
    return this.#author;
  }

  set author(value) {
    if (typeof value !== "string") {
      throw new Error("author must be a string");
    }
    this.#author = value;
  }

  get pages() {
    return this.#pages;
  }

  set pages(value) {
    if (typeof value !== "number" || value <= 0) {
      throw new Error("pages must be a number greater than zero");
    }

    this.#pages = value;
  }

  get read() {
    return this.#read;
  }

  set read(value) {
    if (typeof value !== "boolean") {
      throw new Error("read must be a boolean");
    }
    this.#read = value;
  }
}

class Library {
  #bookshelf = [];

  add(book) {
    if (!(book instanceof Book)) {
      throw new Error("The object must be an instance of the Book class.");
    }
    this.#bookshelf.push(book);
  }

  remove(bookIndex) {
    bookIndex = Number.parseInt(bookIndex);
    if (typeof bookIndex !== "number" || bookIndex < 0) {
      throw new Error("bookIndex must be a positive number");
    }

    const books = this.books;

    if (books.length === 0) {
      throw new Error("No books available to remove");
    }

    if (!books[bookIndex]) {
      throw new Error(`No book found at index: ${bookIndex}`);
    }

    this.#bookshelf.splice(bookIndex, 1);
  }

  toggleBookStatus(bookIndex) {
    bookIndex = Number.parseInt(bookIndex);
    if (typeof bookIndex !== "number" || bookIndex < 0) {
      throw new Error("bookIndex must be a positive number");
    }

    const books = this.books;

    if (books.length === 0) {
      throw new Error("No books available to toggle status");
    }

    if (!books[bookIndex]) {
      throw new Error(`No book found at index: ${bookIndex}`);
    }

    this.#bookshelf[bookIndex].toggleStatus();
  }

  get books() {
    return [...this.#bookshelf];
  }

  get total() {
    return this.#bookshelf.length;
  }
}

class BookCard {
  constructor(title, author, pages, read) {
    if (typeof title !== "string") {
      throw new Error("title must be a string");
    }

    if (typeof author !== "string") {
      throw new Error("author must be a string");
    }

    pages = Number.parseInt(pages);
    if (typeof pages !== "number" || pages <= 0) {
      throw new Error("pages must be a positive number");
    }

    if (typeof read !== "boolean") {
      throw new Error("read must be a boolean");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  create() {
    const card = document.createElement("div");
    card.classList.add("book-card");

    const bookTitle = document.createElement("h2");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = this.title;

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = `Author: ${this.author}`;

    const bookPages = document.createElement("p");
    bookPages.classList.add("book-pages");
    bookPages.textContent = `Pages: ${this.pages}`;

    const bookRead = document.createElement("p");
    bookRead.classList.add("book-read");
    bookRead.innerHTML = `Read: <span>${this.read ? "Yes" : "No"}</span>`;

    bookInfo.appendChild(bookAuthor);
    bookInfo.appendChild(bookPages);
    bookInfo.appendChild(bookRead);

    const cardButtons = document.createElement("div");
    cardButtons.classList.add("card-buttons");

    const statusButton = document.createElement("button");
    statusButton.classList.add("btn", "status-btn");
    statusButton.textContent = "Status";

    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "remove-btn");
    removeButton.textContent = "Remove";

    cardButtons.appendChild(statusButton);
    cardButtons.appendChild(removeButton);

    card.appendChild(bookTitle);
    card.appendChild(bookInfo);
    card.appendChild(cardButtons);

    return card;
  }
}

class DisplayController {
  #library = new Library();
  #dialog = document.querySelector(".book-form-dialog");
  #newBookButton = document.querySelector(".header-container .btn");
  #closeButton = this.#dialog.querySelector(".close-btn");
  #cancelButton = this.#dialog.querySelector(".cancel-btn");
  #form = this.#dialog.querySelector(".book-form");
  #container = document.querySelector(".main-container");

  constructor() {
    this.#newBookButton.addEventListener("click", () => {
      this.#dialog.showModal();
    });

    [this.#closeButton, this.#cancelButton].forEach((btn) =>
      btn.addEventListener("click", () => this.#dialog.close())
    );

    this.#form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#addBookToLibrary(new FormData(this.#form));

      this.#form.reset();
      this.#dialog.close();

      this.#displayCards(this.#library.books);
    });
  }

  #addBookToLibrary(formData) {
    this.#library.add(
      new Book(
        formData.get("title"),
        formData.get("author"),
        formData.get("pages"),
        formData.get("read") === "true"
      )
    );
  }

  #displayCards(books) {
    this.#container.innerText = "";

    books.forEach((book) => {
      const bookCard = new BookCard(
        book.title,
        book.author,
        book.pages,
        book.read
      ).create();

      bookCard.setAttribute("data-id", books.indexOf(book));

      bookCard
        .querySelector(".status-btn")
        .addEventListener("click", this.#handleChangeStatus.bind(this));

      bookCard
        .querySelector(".remove-btn")
        .addEventListener("click", this.#handleRemove.bind(this));

      this.#container.appendChild(bookCard);
    });
  }

  #handleChangeStatus(event) {
    const index = event.target.closest(".book-card").getAttribute("data-id");
    this.#library.toggleBookStatus(index);
    this.#displayCards(this.#library.books);
  }

  #handleRemove(event) {
    const index = event.target.closest(".book-card").getAttribute("data-id");
    this.#library.remove(index);
    this.#displayCards(this.#library.books);
  }

  createFakeBooks() {
    this.#library.add(
      new Book("The Adventures of Lorem", "Ipsum Dolor", 123, true)
    );
    this.#library.add(
      new Book("Aliquam Faucibus", "Consectetur Adipis", 456, false)
    );
    this.#library.add(
      new Book("Suspendisse Volut", "Egestas Ut Eleifend", 789, true)
    );
    this.#library.add(new Book("Vestibulum Vitae", "Auctor Nisi", 234, false));
    this.#library.add(
      new Book("Curabitur Ultricies", "Pellentes Tempus", 345, true)
    );
    this.#library.add(
      new Book("Proin Sodales", "Maecenas Pharetra", 567, false)
    );

    this.#displayCards(this.#library.books);
  }
}

const display = new DisplayController();
display.createFakeBooks();
