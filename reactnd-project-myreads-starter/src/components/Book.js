import React from "react";
import BookStatusForm from "./BookStatusForm";
const Book = ({ book, handleStatusChange }) => {
  const { title, authors, imageLinks, shelf } = book;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${imageLinks.smallThumbnail})`
            }}
          ></div>
          <BookStatusForm book={book} handleStatusChange={handleStatusChange} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          <ul>
            {authors.map(author => (
              <li key={author}>{author}</li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default Book;
