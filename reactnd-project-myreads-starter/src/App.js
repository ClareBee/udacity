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
  }, []);
  const updateLocalState = (selectedBook, bookShelf) => {
    const bookToUpdate = books.filter(book => book.id === selectedBook.id)[0];
    if (!bookToUpdate) return;
    bookToUpdate.shelf = bookShelf;
    const updatedBooks = [...books, selectedBook];
    setBooks(updatedBooks);
  };

  const handleStatusChange = (book, shelf) => {
    BooksAPI.update(book, shelf);
    updateLocalState(book, shelf);
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
