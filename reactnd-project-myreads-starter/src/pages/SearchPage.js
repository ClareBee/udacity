import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "../components/Book";

function SearchPage({ handleStatusChange }) {
  const [results, setResults] = useState([]);
  const handleSearchQuery = e => {
    e.preventDefault();
    if (e.target.value.trim() === "") return setResults([]);
    return BooksAPI.search(e.target.value).then(data => setResults(data));
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={e => handleSearchQuery(e)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {results &&
            results.length > 0 &&
            results.map(book => (
              <Book
                key={book.id}
                book={book}
                shelf={book.shelf}
                handleStatusChange={handleStatusChange}
              />
            ))}
          {(results.length === 0 || results.error) && (
            <li>No results found, try again. {results.error}</li>
          )}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
