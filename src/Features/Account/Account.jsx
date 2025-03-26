import { useGetUserQuery } from "../auth/authSlice";
import "./Account.css";
import {
  useDeleteReservationMutation,
  useGetReservationsQuery,
} from "./reservationSlice";

export const Account = () => {
  return (
    <main className="account">
      <h1>Account</h1>
      <UserDetails />
      <h1>Reservations</h1>
      <Reservations />
    </main>
  );
};

const UserDetails = () => {
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery();

  if (userLoading) {
    return <p className="status-message">Loading account...</p>;
  }

  if (userError) {
    return (
      <p className="status-message">Error retrieving account information.</p>
    );
  }
  return (
    <>
      <p className="user-welcome">Welcome back, {user.firstname}!</p>
      <table className="user-details">
        <tbody>
          <tr>
            <th>First Name:</th>
            <td>{user.firstname}</td>
          </tr>
          <tr>
            <th>Last Name:</th>
            <td>{user.lastname}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const Reservations = () => {
  const {
    data: reservations = [],
    isLoading: reservationsLoading,
    error: reservationsError,
  } = useGetReservationsQuery();

  if (reservationsLoading) {
    return <p className="status-message">Loading reservations...</p>;
  }

  if (reservationsError) {
    return <p className="status-message">Error retrieving reservations.</p>;
  }
  return (
    <>
      {reservations.length ? (
        <table className="reservations">
          <tbody>
            {reservations.map((reservation) => (
              <ReservationItemization
                key={reservation.id}
                reservation={reservation}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>You currently have no reservations.</p>
      )}
    </>
  );
};

const ReservationItemization = ({ reservation }) => {
  const [deleteReservation] = useDeleteReservationMutation();

  async function removeReservation(id) {
    try {
      await deleteReservation(id);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <tr className="reservation-itemization">
      <td className="reservation-title">{reservation.title}</td>
      <td className="reservation-author">{reservation.author}</td>
      <td>
        <button onClick={() => removeReservation(reservation.id)}>
          Return Book
        </button>
      </td>
    </tr>
  );
};
