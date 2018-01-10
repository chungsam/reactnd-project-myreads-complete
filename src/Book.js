import React from "react";
import PropTypes from "prop-types";

class Book extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    book: PropTypes.object.isRequired
  };

  handleChange(event, book) {
    event.preventDefault();
    this.props.onUpdateMyBooks(book, event.target.value);
  }

  render() {
    const { book } = this.props;

    return (
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
              defaultValue={book.shelf}
              onChange={event => {
                this.handleChange(event, book);
              }}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          book.authors.map(author => (
            <div key={author} className="book-authors">
              {author}
            </div>
          ))}
      </div>
    );
  }
}

export default Book;
