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
    shelf: {}
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    BooksAPI.getAll().then(books => {
      books.sort(sortBy("title"));
      this.setState({ books });
    });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      // Reload books from server
      this.loadBooks();

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
      if (res) {
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

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              books={this.state.books}
              onUpdateShelf={(book, shelf) => this.updateShelf(book, shelf)}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={({ history }) => (
            <SearchBooks
              onUpdateShelf={(book, shelf) => {
                this.updateShelf(book, shelf);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
