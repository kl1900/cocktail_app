import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import {useNavigate} from "react-router-dom";

export default function SearchBar() {
    const [query, setQuery] = React.useState("");
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        if (query !== "") {
            navigate("/search/" + query);
        }
    }

    return (
        <form action="/" method="get">
            <label htmlFor="header-search">
                <BsSearch/>
            </label>
            <input
                type="text"
                id="header-search"
                placeholder="Enter recipe name"
                name="search"
                value={query || ""}
                onChange={event => setQuery(event.target.value)}
            />
            <button type="submit" onClick={onSubmit}>Search</button>
        </form>
    );
}