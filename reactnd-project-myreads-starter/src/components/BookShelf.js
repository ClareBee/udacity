import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

function BookShelf({ shelfTitle, books, handleStatusChange }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>

      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            books.map(book => (
              <Book
                key={book.id}
                book={book}
                handleStatusChange={handleStatusChange}
              />
            ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array,
  handleStatusChange: PropTypes.func.isRequired
};

export default BookShelf;
