import React from "react";
import PropTypes from "prop-types";
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

BookStatusForm.propTypes = {
  handleStatusChange: PropTypes.func.isRequired,
  book: PropTypes.shape({
    shelf: PropTypes.string
  })
};

export default BookStatusForm;
