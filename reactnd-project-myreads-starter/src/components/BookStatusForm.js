import React from "react";

function BookStatusForm({ handleStatusChange, book }) {
  const updateStatus = e => {
    e.preventDefault();
    handleStatusChange(book, e.target.value);
  };

  const status = book.shelf ? book.shelf : "move";
  return (
    <div className="book-shelf-changer">
      <select value={status} onChange={e => updateStatus(e)}>
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
}

export default BookStatusForm;
