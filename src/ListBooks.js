import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ListBooks extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };

  state = {
    shelf: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    currentlyReading: []
  };

  componentDidMount() {}

  componentWillUpdate() {}

  handleChange(event, book) {
    event.preventDefault();
    this.props.onUpdateShelf(book, event.target.value);
  }

  render() {
    const { books } = this.props;
    const currentlyReading = books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter(book => book.shelf === "wantToRead");
    const read = books.filter(book => book.shelf === "read");

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
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                book.imageLinks.thumbnail
                              })`
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              defaultValue={book.shelf}
                              onChange={event => {
                                this.handleChange(event, book);
                              }}
                            >
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        {book.authors.map(author => (
                          <div key={author} className="book-authors">
                            {author}
                          </div>
                        ))}
                      </div>
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
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                book.imageLinks.thumbnail
                              })`
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              defaultValue={book.shelf}
                              onChange={event => {
                                this.handleChange(event, book);
                              }}
                            >
                              <option disabled>Move to...</option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        {book.authors.map(author => (
                          <div key={author} className="book-authors">
                            {author}
                          </div>
                        ))}
                      </div>
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
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                book.imageLinks.thumbnail
                              })`
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              defaultValue={book.shelf}
                              onChange={event => {
                                this.handleChange(event, book);
                              }}
                            >
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        {book.authors.map(author => (
                          <div key={author} className="book-authors">
                            {author}
                          </div>
                        ))}
                      </div>
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
