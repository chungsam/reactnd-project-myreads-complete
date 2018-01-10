import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";

class ListBooks extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateMyBooks: PropTypes.func.isRequired
  };

  componentDidMount() {}

  componentWillUpdate() {}

  render() {
    const { myBooks, onUpdateMyBooks } = this.props;
    const currentlyReading = myBooks.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToRead = myBooks.filter(book => book.shelf === "wantToRead");
    const read = myBooks.filter(book => book.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map(book => (
                    <li key={book.id}>
                      <Book book={book} onUpdateMyBooks={onUpdateMyBooks} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.map(book => (
                    <li key={book.id}>
                      <Book book={book} onUpdateMyBooks={onUpdateMyBooks} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map(book => (
                    <li key={book.id}>
                      <Book book={book} onUpdateMyBooks={onUpdateMyBooks} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="search">Add Book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
