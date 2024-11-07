import { LibraryController } from "./controllers/LibraryController.js";
import { BookForm } from "./views/BookForm.js";
import { BookList } from "./views/BookList.js";

const bookForm = new BookForm();
const bookList = new BookList();
const libraryController = new LibraryController(bookForm, bookList);

bookForm.render(libraryController.addBook.bind(libraryController));
bookList.render(
    libraryController.books,
    libraryController.deleteBook.bind(libraryController),
    libraryController.editBook.bind(libraryController)
);

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (event) => {
    const query = event.target.value;
    libraryController.searchBooks(query);
});

document
    .getElementById("theme-toggle") 
    .addEventListener(
    "click",
    libraryController.toggleTheme.bind(libraryController)
);
libraryController.initTheme();