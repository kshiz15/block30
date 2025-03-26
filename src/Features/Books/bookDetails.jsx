import { useParams } from "react-router-dom";
import { useGetBookQuery, useUpdateBookMutation } from "./bookSlice";
import "./bookDetails.css";
import { useSelector } from "react-redux";
import { selectToken } from "./auth/authSlice";

export const BookDetails = () => {
  const { id } = useParams();
  const { data: book, isLoading } = useGetBookQuery(id);

  const [updateBook] = useUpdateBookMutation();

  const token = useSelector(selectToken);

  async function sendReservation() {
    try {
      await updateBook({ id, available: false });
    } catch (e) {
      console.log(e);
    }
  }

  if (isLoading) {
    return <p className="status-message">Loading...</p>;
  }

  if (!book) {
    return (
      <p className="status-message">
        Oops! This book either is not in our catalog, or we ran into an error
        trying to retrieve the book.
      </p>
    );
  }

  return (
    <main className="book-details">
      <header>
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
      </header>
      <img src={book.coverimage} alt="Book cover" />
      <p>{book.description}</p>
      {token &&
        (book.available ? (
          <button className="reserve" onClick={sendReservation}>
            Reserve
          </button>
        ) : (
          <button className="not-available">Not available</button>
        ))}
      {!token && (
        <p className="logged-out-message">
          Please log in to view reservation options.
        </p>
      )}
    </main>
  );
};
