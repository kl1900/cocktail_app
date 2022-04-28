import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {GET_USER_URL} from "../constants";
import SearchBar from "./SearchBar.jsx";
import {useNavigate} from "react-router-dom";

export default function SearchResult() {
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [pageList, setPageList] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const keyword = params.keyword || "";

    async function getSearchResults() {
        const res = await fetch(`${GET_USER_URL}/searchRecipe/${keyword}`);
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        if (keyword !== "") {
            getSearchResults()
                .then((data) => {
                    console.log(data);
                    setResults(data);
                    const maxPageNum = Math.ceil(data.results.length / 10);
                    const tmpList = [];
                    for (let i = 1; i <= maxPageNum; i++) {
                        tmpList.push(i);
                    }
                    console.log(tmpList);
                    setPageList(tmpList);
                })
                .catch((error) => console.log(error));
        }
    }, [keyword]);

    return (
        <div>
            <SearchBar/>
            <h3>
                Search Results
                {results.results &&
                    " (" + results.results.length.toString() + ")"}:{" "}
            </h3>
            <div>
                <div className={"row"}>
                    {results.results &&
                        results.results
                            .slice((page - 1) * 10, page * 10)
                            .map((result, i) => (
                                <div key={i} className={"col"}>
                                    <div className={"card"} style={{width: "15rem", height: "18rem", borderRadius: "20%"}}>
                                        <div className={"card-body text-center"}>
                                            <img
                                                src={results.baseUri + result.image}
                                                className={"img-thumbnail rounded card-img-bottom my-auto mx-auto d-block"}
                                                alt={"img" + i.toString()}
                                                style={{maxWidth: "200px", maxHeight: "200px", textAlign: "center"}}
                                            />
                                            <h6 className={"my-auto"} style={{textAlign: "center"}}>
                                                <Link to={"/details/" + result.id.toString()}>
                                                    {result.title}
                                                </Link>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            ))}
                </div>
            </div>
            <span>Select Page: </span>
            <select
                name="pages"
                id="pages"
                onChange={(e) => setPage(parseInt(e.target.value))}
                style={{marginLeft: "10px"}}
            >
                {pageList.map((curr_page) => (
                    <option value={curr_page}>{curr_page}</option>
                ))}
            </select>
        </div>
    );
}
