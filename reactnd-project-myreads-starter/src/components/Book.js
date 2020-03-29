import React from "react";
import BookStatusForm from "./BookStatusForm";
const Book = ({ cover, title, authors, shelf }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${cover})`
            }}
          ></div>
          <BookStatusForm status={shelf} />
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
