import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SearchPage from './pages/SearchPage'
import BooksList from './pages/BooksList'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route exact path="/">
              <BooksList  />
            </Route>    
          </Switch>
        </Router>
      </div>
    )
  }
}

export default BooksApp
