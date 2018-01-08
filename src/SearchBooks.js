import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
  };

  state = {
    query: "",
    queriedBooks: []
  };

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  searchBooks = query => {
    if (query) {
      BooksAPI.search(query).then(results => {
        // if (results) {
        this.setState(state => ({ queriedBooks: results }));
        // }
      });
    } else {
      this.setState({ queriedBooks: [] });
    }

    this.updateQuery(query);
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };

  handleChange(event, book) {
    event.preventDefault();
    this.props.onUpdateShelf(book, event.target.value);
  }

  render() {
    const { queriedBooks, query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {queriedBooks.length > 0 &&
              queriedBooks.map(book => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            book.imageLinks ? book.imageLinks.thumbnail : ""
                          })`
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          defaultValue="none"
                          onChange={event => this.handleChange(event, book)}
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
                    <div className="book-title">{book.title} {book.shelf}</div>
                    {book.authors &&
                      book.authors.map(author => (
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
    );
  }
}

export default SearchBooks;
