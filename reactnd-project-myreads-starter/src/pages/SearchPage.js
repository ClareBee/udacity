import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "../BooksAPI";
import Book from "../components/Book";

function SearchPage({ books, handleStatusChange }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const handleSearchQuery = e => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  React.useEffect(() => {
    BooksAPI.search(query).then(data => {
      if (query.trim() === "") return setResults([]);
      const formattedResults = data.map(apiBook => {
        const matchingBook = books.find(book => book.id === apiBook.id);
        if (matchingBook) {
          return Object.assign(
            {},
            { ...apiBook },
            { shelf: matchingBook.shelf }
          );
        }
        return Object.assign({}, { ...apiBook }, { shelf: "none" });
      });
      setResults(formattedResults);
    });
  }, [query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={query}
            placeholder="Search by title or author"
            onChange={handleSearchQuery}
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

SearchPage.propTypes = {
  handleStatusChange: PropTypes.func.isRequired
};
export default SearchPage;
