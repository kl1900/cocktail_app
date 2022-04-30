import React, {useEffect, useState} from "react";
import {Outlet, Link} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import SearchBar from "./SearchBar";
import {useAuthToken} from "../AuthTokenContext";

export default function AppLayout() {
    const { isAuthenticated, isLoading, logout} = useAuth0();
    const [name, setName] = useState("(user)");
    const { accessToken } = useAuthToken();

    useEffect(() => {
        async function getUser() {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await res.json();
            if (data) {
                setName(data.name);
            }
        }
        if (accessToken) {
            getUser();
        }
    }, [accessToken]);

    if (isLoading) {
        return <div>Loading...</div>;
    }


    function UserHeadbar() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" style={{paddingRight: "20px"}} to="/">
                    <img
                        src="/logo.png"
                        width="37.34"
                        height="30"
                        className="d-inline-block align-top"
                        alt=""
                    />
                    Recipe Collection
                </Link>
                <div className={"navbar-nav mr-auto"}>
                    <SearchBar/>
                </div>
                <div className={"navbar-nav float-end"} style={{paddingLeft: "50px", paddingRight: "30px",
                    display: "flex", flexDirection: "row", flexWrap: "nowrap"}}>
                    <div>
                        {"Hello,"}&nbsp;
                    </div>
                    <div>
                        <Link to={"/profile"}>
                            {name}
                        </Link>
                    </div>
                </div>
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

                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{flexGrow: 0}}>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link to="/" className={"nav-link"}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/wishlists" className={"nav-link text-nowrap"}>
                                My Favorites
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/reviews" className={"nav-link text-nowrap"}>
                                My Reviews
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link
                                className="nav-link"
                                to="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    logout({returnTo: window.location.origin});
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
            return <UserHeadbar/>;
        }
        return <GuestHeadbar/>;
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
                    <Headbar/>
                </nav>
            </div>
            <div>
                <Outlet/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}
