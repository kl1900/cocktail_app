import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {GET_USER_URL} from "../constants";
import SearchBar from "./SearchBar.jsx";
import {useNavigate} from "react-router-dom";

// src:"/imgs/1.png"
const list = ["Appetizers and Snacks", "Bread Recipes", "Breakfast and Brunch", "Desserts", "Dinner Recipe", "Drinks", "Everyday", "Fruit", "Lunch Recipes"];

export default function Home() {
    const [joke, setJoke] = useState("");
    // const [count, setCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getFoodJoke().then(data => {
            setJoke(data.text);
        }).catch(error => console.log(error));
    }, [])

    async function getRandomRecipe() {
        const res = await fetch(`${GET_USER_URL}/getRandomRecipe`);
        const data = await res.json();
        return data;
    }

    async function getFoodJoke() {
        const res = await fetch(`${GET_USER_URL}/getRandomFoodJoke`);
        const data = await res.json();
        return data;
    }

    const handleRandomRecipe = (e) => {
        e.preventDefault();
        getRandomRecipe().then(data => {
            navigate("/details/" + data.recipes[0].id);
        }).catch(error => console.log(error));
    };

    const handleFoodJoke = (e) => {
        e.preventDefault();
        getFoodJoke().then(data => {
            setJoke(data.text);
        }).catch(error => console.log(error));
    };

    const getName = (i) => {
        if (i === 'Fruit') {
            return 'Fruits'
        }
        else if (i === 'Everyday') {
            return 'Everyday Cookings'
        }
        else {
            return i;
        }}

    return (
        <div>
            <div className="row" style={{justifyContent: "space-evenly", marginTop: "20px"}}> 
                {list.map((i, index) => (
                    <Link to={"/search/" + i}>
                        <div key={index} style={{width: "70px"}}>
                            <img src={`/imgs/${index+1}.png`} alt={i} style={{width: "70px", borderRadius: "50%"}}/>
                            <h6 style={{textAlign: "center"}}>{getName(i)}</h6>
                            
                        </div>
                    </Link>
                ))}
            </div>
            <div style={{background: "yellow"}}>
                <h2>All Your Food. In One Place.</h2>
                <SearchBar/>
            </div>

            <div style={{background: "lightgreen"}}>
                <h2>Don't know what to eat?</h2>
                <button onClick={handleRandomRecipe}>Get a Random Recipe!</button>
            </div>

            <div style={{background: "lightcyan"}}>
                <h2>Joke Time!</h2>
                <div style={{background: "wheat", marginLeft: "50px", marginRight: "50px"}}>
                    {joke}
                </div>
                <button onClick={handleFoodJoke}>Change one</button>
            </div>
        </div>
    );
}
