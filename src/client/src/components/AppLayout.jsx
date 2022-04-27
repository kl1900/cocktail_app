import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./SearchBar";

export default function AppLayout() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function UserHeadbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <img src="https://www.pinclipart.com/picdir/middle/86-862588_mobi-food-logo-gif-clipart.png"
                     width="30" height="30" className="d-inline-block align-top" alt=""/>
                    Recipe Collection
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/" className={"nav-link"}>Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/profile" className={"nav-link"}>My Profile</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/wishlists" className={"nav-link"}>My Favorites</Link>
                    </li>
                    {/*<li className="nav-item active">*/}
                    {/*    <Link to="/wishlists" className={"nav-link"}>My Reviews</Link>*/}
                    {/*</li>*/}
                    <li className="nav-item active">
                        <a className="nav-link" href="#" onClick={(e) => {
                            e.preventDefault();
                            logout({ returnTo: window.location.origin })
                        }}>Logout</a>
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
                <img src="https://www.pinclipart.com/picdir/middle/86-862588_mobi-food-logo-gif-clipart.png"
                     width="30" height="30" className="d-inline-block align-top" alt=""/>
                Recipe Collection
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/" className={"nav-link"}>Home</Link>
                    </li>
                    {/*<li className="nav-item disabled">*/}
                    {/*    <div className={"nav-link"}>My Profile</div>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item disabled">*/}
                    {/*    <div className={"nav-link"}>My Favorites</div>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item active">*/}
                    {/*    <Link to="/wishlists" className={"nav-link"}>My Reviews</Link>*/}
                    {/*</li>*/}
                    <li className="nav-item active">
                        <Link to="/login" className={"nav-link"}>Login</Link>
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
    return <footer>Footer</footer>;
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
