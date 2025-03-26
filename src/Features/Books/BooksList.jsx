import { Link } from "react-router-dom";
import { useGetBooksQuery } from "./bookSlice";
import "./Bookslist.css";

export const BooksList = () => {
  const { data: books = [], isLoading, error } = useGetBooksQuery();

  if (isLoading) {
    return <p className="status-message">Loading...</p>;
  }

  if (error) {
    return (
      <p className="status-message">
        Error retrieving information. There may be an issue with your data or
        log-in.
      </p>
    );
  }

  if (!books.length) {
    return (
      <p className="status-message">
        There are currently no books in our catalog. Apologies, and thank you
        for your support.
      </p>
    );
  }

  return (
    <div className="books-wrapper">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

const BookCard = ({ book }) => {
  return (
    <article className="book-card">
      <img src={book.coverimage} alt="Book cover" />
      <div className="book-card-right-wrapper">
        <div className="book-info">
          <h2>{book.title}</h2>
          <h3>{book.author}</h3>
          <p>{book.description}</p>
        </div>
        <Link className="more-details" to={`/books/${book.id}`}>
          More Details
        </Link>
      </div>
    </article>
  );
};
