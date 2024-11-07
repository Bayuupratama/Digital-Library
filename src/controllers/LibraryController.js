import { Book } from "../models/Book.js";
import { showAlert } from "../utils/alert.js";

export class LibraryController {
    constructor(bookForm, bookList) {
        this.books = JSON.parse(localStorage.getItem("books")) || [];
        this.bookForm = bookForm;
        this.bookList = bookList
    }

    addBook(bookData) {
        const newBook = new Book (
            Date.now(),
            bookData.title,
            bookData.author,
            bookData.year
        );
        this.books.push(newBook);
        this.saveAndRender();
        showAlert("success", "Book Successfully Added!");
    }

    searchBooks(query) {
        // Pastikan query dalam bentuk lowercase agar pencarian tidak case-sensitive
        const filteredBooks = this.books.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()) ||
            book.year.toString().includes(query)
        );
        
        // Render buku yang sudah difilter
        this.bookList.render(filteredBooks, this.deleteBook.bind(this), this.editBook.bind(this));
    }

    editBook(id) {
        id = parseInt(id);
        const book = this.books.find((b) => b.id === id);
        if (book) {
            this.bookForm.render((updatedBook) => {
                const index = this.books.findIndex((b) => b.id === id);
                this.books[index] = { ...updatedBook, id };
                this.saveAndRender();
                showAlert("success", "Book Successfully Updated!");
            });
            this.bookForm.fillForm(book);
        }
    }

    deleteBook(id) {
        id = parseInt(id);
        
        this.books = this.books.filter((b) => b.id !== id);

        this.saveAndRender();
        showAlert("warning", "Book Successfully Deleted!");
    }

    saveAndRender() {
        localStorage.setItem("books", JSON.stringify(this.books));
        this.bookList.render(
            this.books,
            this.deleteBook.bind(this),
            this.editBook.bind(this)
        );
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains("theme-dark")
        ? "dark"
        : "light";
        document.body.classList.toggle("theme-dark", currentTheme === "light");
        document.body.classList.toggle("theme-light", currentTheme === "dark");
        localStorage.setItem("theme", currentTheme === "light" ? "dark" : "light");
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeIcon = document.getElementById("theme-icon");
        const isDarkTheme = document.body.classList.contains("theme-dark");
        themeIcon.classList.toggle("bi-sun-fill", isDarkTheme);
        themeIcon.classList.toggle("bi-moon-fill", !isDarkTheme);
    }

    initThemeIcon() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.body.classList.toggle("theme-dark", savedTheme === "dark");
        document.body.classList.toggle("theme-light", savedTheme === "light");
        this.updateThemeIcon();
    }
}