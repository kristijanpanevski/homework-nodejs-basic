import { DataService } from "./src/data.service.js";
import { Book } from "./src/book.model.js";
import { createPath } from "./utils.js";
import { loggerEmitter } from "./src/logger.js";

const BOOKS_PATH = createPath(["data", "books.json"]);

//1. Get all books
const getAllBooks = async () => {
  const books = await DataService.readJSONFile(BOOKS_PATH);

  return books;
};

//2. Save books
const saveBooks = async (books) => {
  await DataService.saveJSONFile(BOOKS_PATH, books);
};

//3. Create book
const createBook = async (title, author, publicationYear, quantity) => {
  //1.Get all books
  const books = await getAllBooks();

  //2. Create a new book
  const newBook = new Book(title, author, publicationYear, quantity);

  //3. Adding the new book to the books array
  const updatedBooks = [...books, newBook];

  //4. Saving the new array in file system
  await saveBooks(updatedBooks);

  loggerEmitter.emit("create-book", newBook.id);
};
//4. Get book by id
const getBookById = async (bookId) => {
  //1. Get all books
  const books = await getAllBooks();

  //2. Find the book
  const foundBook = books.find((book) => book.id === bookId);

  if (!foundBook) throw new Error("BOOK NOT FOUND!");

  return foundBook;
};

//5. Update book
const updateBook = async (bookId, newTitle, newAuthor) => {
  //1. Get all books
  const books = await getAllBooks();

  const idExists = books.some((book) => book.id === bookId);
  //   const idExists = books.find(book => book.id === bookId);

  if (!idExists) throw new Error("Can't update book! book not found!");

  const updatedBooks = books.map((book) => {
    if (book.id === bookId) {
      return { ...book, title: newTitle, author: newAuthor };
    } else {
      return book;
    }
  });

  await saveBooks(updatedBooks);

  loggerEmitter.emit("edit-book", bookId);
};

//6. Delete book
const deleteBook = async (bookId) => {
  const books = await getAllBooks();

  const updatedBooks = books.filter((book) => book.id !== bookId);

  if (books.length === updatedBooks.length)
    throw new Error("Can't delete book! book not found!");

  await saveBooks(updatedBooks);

  loggerEmitter.emit("delete-book", bookId);
};

//7. Delete All books (nuclear)
const deleteAllBooks = async () => {
  await saveBooks([]);
};

const app = async () => {
  try {
    // await createbook("Risto", "Ristovski", 1000);
    // await createbook("Blazho", "Blazhoski", 1000);
    await updateBook(
      "14ec3384-3b58-4da2-a500-91509b14b386",
      "Tosho",
      "Malerot"
    );
    // const risto = await getBookById("a9ba3444-a0b5-4b11-a319-c54a1a008ff5");
    // console.log("THIS IS RISTO:", risto);
    await deleteBook("14ec3384-3b58-4da2-a500-91509b14b386");
    // await deleteAllBooks();

    const books = await getAllBooks();
    console.log(books);
  } catch (error) {
    console.error(error);
  }
};

app();
