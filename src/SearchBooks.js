import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBooks extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateMyBooks: PropTypes.func.isRequired,
    getBookShelf: PropTypes.func.isRequired
  };

  state = {
    query: "",
    searchedBooks: []
  };

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };

  searchBooks = query => {
    if (query) {
      BooksAPI.search(query).then(results => {
        if (results) {
          this.updateBookShelf(results);
          this.setState(state => ({ searchedBooks: results }));
        }
      });
    } else {
      this.setState({ searchedBooks: [] });
    }

    this.updateQuery(query);
  };

  handleChange(event, book) {
    event.preventDefault();
    this.props.onUpdateMyBooks(book, event.target.value);
  }

 // Checks the searched books against the myBooks and updates it with
 // the correct shelf
  updateBookShelf = searchedBooks => {
    if (searchedBooks.length > 0) {
      searchedBooks.forEach(book => {
        const shelf = this.props.getBookShelf(book.id);

        if (shelf) {
          book.shelf = shelf;
        } else {
          book.shelf = "none";
        }
      });
    }
  };

  render() {
    const { searchedBooks, query } = this.state;
    const { onUpdateMyBooks} = this.props;

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
            {searchedBooks.length > 0 &&
              searchedBooks.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  onUpdateMyBooks={onUpdateMyBooks}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
