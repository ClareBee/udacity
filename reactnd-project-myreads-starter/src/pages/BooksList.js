import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";

const BooksList = ({ books, handleStatusChange }) => {
  const filterByShelf = (books, shelf) => {
    return books.filter(book => book.shelf === shelf);
  };
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            books={filterByShelf(books, "currentlyReading")}
            shelfTitle="Currently Reading"
            handleStatusChange={handleStatusChange}
          />
          <BookShelf
            books={filterByShelf(books, "wantToRead")}
            shelfTitle="Want to Read"
            handleStatusChange={handleStatusChange}
          />
          <BookShelf
            books={filterByShelf(books, "read")}
            shelfTitle="Read"
            handleStatusChange={handleStatusChange}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default BooksList;
