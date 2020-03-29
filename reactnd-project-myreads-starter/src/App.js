import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import BooksList from "./pages/BooksList";

function BooksApp() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then(books => setBooks(books));
  }, [books]);

  const handleStatusChange = (book, shelf) => {
    BooksAPI.update(book, shelf);
  };
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <BooksList books={books} handleStatusChange={handleStatusChange} />
          </Route>
          <Route path="/search">
            <SearchPage books={books} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default BooksApp;
