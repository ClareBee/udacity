import React from "react";
import BookStatusForm from "./BookStatusForm";
function Book({ book, handleStatusChange }) {
  const { title, authors, imageLinks } = book;
  const bookCover = imageLinks ? imageLinks.smallThumbnail : "";
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${bookCover})`
            }}
          ></div>
          <BookStatusForm book={book} handleStatusChange={handleStatusChange} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          <ul className="book-authors-list">
            {authors &&
              authors.map(author => (
                <li key={author}>
                  <span className="author-span">- </span>
                  {author}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default Book;
