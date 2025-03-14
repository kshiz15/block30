import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

// Inject endpoints into RTK Query API and export mutation hooks
const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (user) => ({
        url: "users/register",
        method: "POST",
        body: user,
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["User", "Book"],
    }),
    login: build.mutation({
      query: (user) => ({
        url: "users/login",
        method: "POST",
        body: user,
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["User", "Book"],
    }),
    getUser: build.query({
      query: () => "users/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserQuery } =
  authApi;

// Create reducer to store token in session storage
const TOKEN_KEY = "token";

const storeToken = (state, { payload }) => {
  state.token = payload.token;
  sessionStorage.setItem(TOKEN_KEY, payload.token);
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem(TOKEN_KEY),
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem(TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
  },
});

export const { logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;

src / features / books / bookdetails.jsx;
import { useParams } from "react-router-dom";
import { useGetBookQuery, useUpdateBookMutation } from "./bookSlice";
import "./BookDetails.css";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";

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
