# Library

This project is part of The Odin Project's JavaScript course. It involves building a Library application to practice managing data structures, DOM manipulation, and user interactions.

## Features

- Store book objects in an array.
- Add new books to the library via a form.
- Display books on the page as cards.
- Remove books from the library.
- Toggle the read status of a book.

## Project Overview

### Core Functionalities

1. **Book Storage**:
   - Books are stored in an array called `myLibrary`.
   - A `Book` constructor is used to create book objects.

2. **Add Books**:
   - `addBookToLibrary()` function to create and add books to the array.

3. **Display Books**:
   - A function to loop through the array and display each book on the page.
   - Separation of logic for data storage and display.

4. **New Book Form**:
   - A "New Book" button displays a form for inputting book details.
   - Form includes fields for author, title, number of pages, and read status.
   - Utilizes `event.preventDefault()` to prevent default form submission behavior.

5. **Remove Books**:
   - Each book card includes a button to remove the book from the library.
   - Uses `data-attributes` to associate DOM elements with array indices.

6. **Toggle Read Status**:
   - A button on each book's display toggles its read status.
   - Functionality added to the `Book` prototype.

### Additional Notes

- Currently, the application does not include persistent storage for data between page reloads.
- The project can be revisited later to add storage functionality.

## Installation and Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/yuri-italo/library
   ```

2. Open the `index.html` file in a web browser to view the application.

3. Interact with the app to add, remove, and manage books in your library.

## Future Enhancements

- Add persistent storage using `localStorage` or a database.
- Improve UI/UX with advanced styling and animations.
- Implement advanced form validation.

