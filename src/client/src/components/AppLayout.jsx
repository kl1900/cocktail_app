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
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/wishlists">Wishlists</Link>
        </li>
        <li>
          <Link to="/debugger">Auth Debugger</Link>
        </li>
        <li>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            LogOut
          </button>
        </li>
        <li>
          <Link to="/search/">search</Link>
        </li>
      </ul>
    );
  }

  function GuestHeadbar() {
    return (
      <ul>
        <li>
          <Link to="/login">Log in</Link>
        </li>
      </ul>
    );
  }

  function Headbar() {
    if (isAuthenticated) {
      return <UserHeadbar />;
    }
    return <GuestHeadbar />;
  }

  function Footer() {
    return <footer>Footer</footer>;
  }

  return (
    <div>
      <div>
        <h1>Recipe Collection</h1>
      </div>
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
