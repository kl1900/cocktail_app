import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchBar({ parentCallback }) {
    const [query, setQuery] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        parentCallback(query);
        setQuery("");
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