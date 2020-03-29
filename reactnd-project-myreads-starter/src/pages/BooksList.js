import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";
import { formatString } from "../utils/utils";

const SHELVES = ["currentlyReading", "wantToRead", "read"];
function BooksList({ books, handleStatusChange }) {
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
          {SHELVES.map(shelf => (
            <BookShelf
              key={shelf}
              books={filterByShelf(books, shelf)}
              shelfTitle={formatString(shelf)}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default BooksList;
