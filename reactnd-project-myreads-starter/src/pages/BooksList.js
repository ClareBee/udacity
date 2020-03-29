import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from '../components/BookShelf'

const BooksList = ({books}) => {
  console.log('list', books)
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf books={books} shelfTitle="Currently Reading" />
          <BookShelf books={books} shelfTitle="Want to Read" />
          <BookShelf books={books} shelfTitle="Read" />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

export default BooksList