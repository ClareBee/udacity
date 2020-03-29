import React from "react";

const BookStatusForm = ({ handleStatusChange, book }) => {
  const updateStatus = e => {
    e.preventDefault();
    handleStatusChange(book, e.target.value);
  };
  return (
    <div className="book-shelf-changer">
      <select value={book.shelf} onChange={e => updateStatus(e)}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookStatusForm;
