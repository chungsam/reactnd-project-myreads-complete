import React from "react";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import "./App.css";
import sortBy from "sort-by";

class BooksApp extends React.Component {
  state = {
    books: [],
    myBooks: []
  };

  componentDidMount() {
    this.loadMyBooks();
  }

  loadMyBooks() {
    // First get all books from server
    BooksAPI.getAll().then(books => {
      // Clear existing shelf and start off fresh
      this.setState({ myBooks: [] });

      let { myBooks } = this.state;
      // Assign books to my shelf
      books.forEach(book => {
        switch (book.shelf) {
          case "currentlyReading":
          case "wantToRead":
          case "read":
            myBooks.push(book);
            break;
          default:
            // Don't do anything
            break;
        }
      });

      // Sort by title
      myBooks.sort(sortBy("title"));

      // Update state
      this.setState({ books });
      this.setState({ myBooks });
    });
  }

  updateMyBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      if (res) {
        this.loadMyBooks();

        // Format shelf name for alert.
        let shelfFormatted;
        switch (shelf) {
          case "currentlyReading":
            shelfFormatted = `'Currently Reading'`;
            break;
          case "wantToRead":
            shelfFormatted = `"Want to Read"`;
            break;
          case "read":
            shelfFormatted = `"Read"`;
            break;
          default:
            shelfFormatted = "";
        }

        // Let user know if it was successful.
        alert(
          `Book successfully ${
            shelfFormatted !== ""
              ? `moved to ${shelfFormatted} shelf!`
              : `Removed from shelf.`
          }`
        );
      } else {
        alert(
          `Something went wrong. Book was not successfully moved to shelf.`
        );
      }
    });
  };

  getBookShelf = bookId => {
    const book = this.state.books.find(book => book.id === bookId);
    if (book) {
      return book.shelf;
    }
  };

  render() {
    const { myBooks } = this.state;

    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              myBooks={myBooks}
              onUpdateMyBooks={(book, shelf) => this.updateMyBooks(book, shelf)}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={({ history }) => (
            <SearchBooks
              myBooks={myBooks}
              onUpdateMyBooks={(book, shelf) => {
                this.updateMyBooks(book, shelf);
                history.push("/");
              }}
              getBookShelf={this.getBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
