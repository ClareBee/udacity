import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import BooksList from "./pages/BooksList";

function BooksApp() {
  const [books, setBooks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    BooksAPI.getAll().then(books => setBooks(books));
  }, [refresh]);

  const handleStatusChange = (book, shelf) => {
    BooksAPI.update(book, shelf);
    setRefresh(!refresh);
  };
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <BooksList books={books} handleStatusChange={handleStatusChange} />
          </Route>
          <Route path="/search">
            <SearchPage books={books} handleStatusChange={handleStatusChange} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default BooksApp;
