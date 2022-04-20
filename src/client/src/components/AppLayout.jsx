import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function AppLayout() {
  const { user, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1>Wishlist App</h1>
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/app/profile">Profile</Link>
            </li>
            <li>
              <Link to="/app/wishlists">Wishlists</Link>
            </li>
            <li>
              <Link to="/app/debugger">Auth Debugger</Link>
            </li>
            <li>
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                LogOut
              </button>
            </li>
          </ul>
        </nav>
        <div>Welcome 👋 {user.name} </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
