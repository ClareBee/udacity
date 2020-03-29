import React from "react";
import Book from "./Book";

const BookShelf = ({ shelfTitle, books }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>

      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            books.map(book => (
              <Book
                key={book.id}
                title={book.title}
                authors={book.authors}
                cover={book.imageLinks.smallThumbnail}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
