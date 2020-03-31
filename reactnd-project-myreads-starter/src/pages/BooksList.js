import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookShelf from "../components/BookShelf";

const SHELVES = [
  { display: "Currently Reading", variable: "currentlyReading" },
  { display: "Want to Read", variable: "wantToRead" },
  { display: "Read", variable: "read" }
];
function BooksList({ books, handleStatusChange }) {
  const filterByShelf = (books, shelfTitle) => {
    return books.filter(book => book.shelf === shelfTitle);
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {SHELVES.map(({ display, variable }) => (
            <BookShelf
              key={variable}
              books={filterByShelf(books, variable)}
              shelfTitle={display}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" className="open-search">
          Add a book
        </Link>
      </div>
    </div>
  );
}

BooksList.propsTypes = {
  books: PropTypes.array,
  handleStatusChange: PropTypes.func.isRequired
};

export default BooksList;
