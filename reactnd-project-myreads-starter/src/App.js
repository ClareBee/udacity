import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './pages/SearchPage'
import BooksList from './pages/BooksList'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  handleShowSearchPage = (value) => {
    this.setState({showSearchPage: value})
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage handleShowSearchPage={this.handleShowSearchPage} />
        ) : (
            <BooksList handleShowSearchPage={this.handleShowSearchPage} />
        )}
      </div>
    )
  }
}

export default BooksApp
