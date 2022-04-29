import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function AppLayout() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function UserHeadbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img
            src="/logo.png"
            width="37.34"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          Recipe Collection
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className={"nav-link"}>
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/profile" className={"nav-link"}>
                My Profile
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/wishlists" className={"nav-link"}>
                My Favorites
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                className="nav-link"
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  logout({ returnTo: window.location.origin });
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  function GuestHeadbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img
            src="/logo.png"
            width="37.34"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          Recipe Collection
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className={"nav-link"}>
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/login" className={"nav-link"}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  function Headbar() {
    if (isAuthenticated) {
      return <UserHeadbar />;
    }
    return <GuestHeadbar />;
  }

  function Footer() {
    return (
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a
              href="https://github.com/kl1900"
              className="nav-link px-2 text-muted"
            >
              Kuo Lu
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://github.com/samjin-neu"
              className="nav-link px-2 text-muted"
            >
              Sam Jin
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://github.com/liz-cs"
              className="nav-link px-2 text-muted"
            >
              Liz Guo
            </a>
          </li>
        </ul>
        <p className="text-center text-muted">© 2022 Northeastern University</p>
      </footer>
    );
  }

  return (
    <div>
      <div>
        <nav>
          <Headbar />
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
