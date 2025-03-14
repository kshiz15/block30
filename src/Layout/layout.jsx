import { Outlet } from "react-router-dom";
import "./Layout.css";

import { useDispatch, useSelector } from "react-redux";
import booksIcon from "../assets/books.png";
import { logout, selectToken } from "../features/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="page">
      <Navbar />
      <Outlet />
    </div>
  );
};

const Navbar = () => {
  const token = useSelector(selectToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <header className="nav-header">
      <div className="site-decal">
        <img
          className="books-icon"
          src={booksIcon}
          alt="Cartoon of 3 stacked"
        />
        <p>Book Buddy</p>
      </div>
      <nav>
        <NavLink to="/">Books</NavLink>
        {token && <NavLink to="/account">Account</NavLink>}
        {token ? (
          <a href="#" onClick={handleLogout}>
            Log Out
          </a>
        ) : (
          <NavLink to="/login">Log In</NavLink>
        )}
      </nav>
    </header>
  );
};
