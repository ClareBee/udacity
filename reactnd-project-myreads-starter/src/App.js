import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SearchPage from './pages/SearchPage'
import BooksList from './pages/BooksList'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books}))
  }
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/search">
              <SearchPage books={this.state.books}/>
            </Route>
            <Route exact path="/">
              <BooksList  books={this.state.books}/>
            </Route>    
          </Switch>
        </Router>
      </div>
    )
  }
}

export default BooksApp
