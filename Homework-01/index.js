import { DataService } from "./src/data.service.js";
import { Book } from "./src/book.model.js";
import { createPath } from "./src/utils.js";
import { loggerEmitter } from "./src/logger.js";

const BOOKS_PATH = createPath(["data", "books.json"]);

// Add a new book
const addBook = async (title, author, publicationYear, quantity) => {
  const books = await DataService.readJSONFile(BOOKS_PATH);
  const newBook = new Book(title, author, publicationYear, quantity);
  books.push(newBook);
  await BookService.saveJSONFile(BOOKS_PATH, books);
  loggerEmitter.emit("add-book", newBook.id);
};

// Get all books
const getAllBooks = async () => {
  return await DataService.readJSONFile(BOOKS_PATH);
};

// Update a book
const updateBook = async (id, title, author, publicationYear, quantity) => {
  let books = await getAllBooks();
  let found = false;
  for (let i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      books[i].title = title;
      books[i].author = author;
      books[i].publicationYear = publicationYear;
      books[i].quantity = quantity;
      found = true;
      break;
    }
  }
  if (!found) {
    throw new Error("Book not found!");
  }
  await DataService.saveJSONFile(BOOKS_PATH, books);
  loggerEmitter.emit("update-book", id);
};

// Delete a book
const deleteBook = async (id) => {
  let books = await getAllBooks();
  const initialLength = books.length;
  books = books.filter((book) => book.id !== id);
  if (books.length === initialLength) {
    throw new Error("Book not found!");
  }
  await DataService.saveJSONFile(BOOKS_PATH, books);
  loggerEmitter.emit("delete-book", id);
};

//Delete all books
const deleteAllBooks = async () => {
  await DataService.saveJSONFile(BOOKS_PATH, []);
  loggerEmitter.emit("delete-all-books");
};

addBook("The Great Gatsby", "F. Scott Fitzgerald", 1925, 3);
