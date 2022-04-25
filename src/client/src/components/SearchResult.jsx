import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GET_USER_URL } from "../constants";
import SearchBar from "./SearchBar.jsx"
import { useNavigate } from "react-router-dom";

export default function SearchResult() {
    const [searchInput, setSearchInput] = useState("");
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [pageList, setPageList] = useState([]);
    const navigate = useNavigate();

    const handleSearchInput = (query) => {
        setSearchInput(query);
    }

    async function getSearchResults() {
        const res = await fetch(
            `${GET_USER_URL}/searchRecipe/${searchInput}`
        );
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        if (searchInput !== "") {
            getSearchResults().then(data => {
                console.log(data);
                setResults(data);
                const maxPageNum = Math.ceil(data.results.length / 10);
                const tmpList = [];
                for (let i = 1; i <= maxPageNum; i++) {
                    tmpList.push(i);
                }
                console.log(tmpList);
                setPageList(tmpList);
            }).catch(error => console.log(error));
        }
    }, [searchInput]);

    return (
      <div>
          <SearchBar parentCallback = {handleSearchInput}/>
          <h3>Search Results{results.results && " (" + results.results.length.toString() + ")"}: </h3>
          <div>
              <ul>
                  {results.results &&
                      results.results.slice((page - 1) * 10, page * 10).map((result, i) => (
                          <li key={i}>
                              <div>
                                  <h6><a href="" onClick={event => {
                                      event.preventDefault();
                                      navigate("/products/" + result.id.toString())
                                  }}>{result.title}</a></h6>
                                  <img src={results.baseUri + result.image}
                                       alt={"img" + i.toString()}
                                       style={{maxWidth: "200px", maxHeight: "200px"}}
                                  />
                              </div>
                          </li>
                      ))}
              </ul>
          </div>
          <span>Select Page: </span>
          <select name="pages"
                  id="pages"
                  onChange={e => setPage(parseInt(e.target.value))}
                  style={{marginLeft: "10px"}}
          >
              {pageList.map(curr_page => (
                  <option value={curr_page}>{curr_page}</option>
              ))}
          </select>

      </div>
    );
}
