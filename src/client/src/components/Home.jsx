import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {GET_USER_URL} from "../constants";
import {useNavigate} from "react-router-dom";

const list = ["Appetizers and Snacks", "Bread Recipes", "Breakfast and Brunch", "Desserts", "Dinner Recipe",
    "Drinks", "Everyday", "Fruit", "Lunch Recipes"];

export default function Home() {
    const [joke, setJoke] = useState("");
    // const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const cp = [
        {name: 'Citrus-and-Chile-Braised Short Ribs',
        id: 716589,
        imgSrc: "/cp1.jpg"},

        {name: 'Farro & Fruit Salad',
            id: 769527,
            imgSrc: "/cp2.jpg"},

        {name: 'Homemade Apple Pie',
            id: 1037693,
            imgSrc: "/cp3.jpg"},

        {name: 'Kale Smoothie',
            id: 516662,
            imgSrc: "/cp4.jpg"},

        {name: 'Cinnamon pancakes with compote & maple syrup',
            id: 224465,
            imgSrc: "/cp5.jpg"},

        {name: 'Banh Mi Burgers with Spicy Sriracha Mayo',
            id: 864633,
            imgSrc: "/cp6.jpg"},

        {name: 'Chicken Saltimbocca',
            id: 248884,
            imgSrc: "/cp7.jpg"},

        {name: 'Honey-Mustard Chicken',
            id: 402577,
            imgSrc: "/cp8.jpg"},
    ]

    async function getRandomRecipe() {
        const res = await fetch(`${GET_USER_URL}/getRandomRecipe`);
        const data = await res.json();
        return data;
    }

    const handleRandomRecipe = (e) => {
        e.preventDefault();
        getRandomRecipe().then(data => {
            navigate("/details/" + data.recipes[0].id);
        }).catch(error => console.log(error));
    };

    const getName = (i) => {
        if (i === 'Fruit') {
            return 'Fruits'
        } else if (i === 'Everyday') {
            return 'Everyday Cookings'
        } else {
            return i;
        }
    }

    return (
        <div>
            <div className="row" style={{justifyContent: "space-evenly", marginTop: "20px"}}>
                {list.map((i, index) => (
                    <Link to={"/search/" + i}>
                        <div key={index} style={{width: "70px"}}>
                            <img src={`/imgs/${index + 1}.png`} alt={i} style={{width: "70px", borderRadius: "50%"}}/>
                            <h6 style={{textAlign: "center"}}>{getName(i)}</h6>

                        </div>
                    </Link>
                ))}
            </div>
            <div style={{marginTop: "50px"}}>
                <h3>Community Picks: </h3>
                <div style={{marginTop: "30px"}}>
                    <div className={"row justify-content-center"}>
                        {cp.map(item => (
                            <div key={item.id} className={"col"} style={{flexGrow: 0}}>
                                <div className={"card zoom-hover"} style={{
                                    width: "15rem", height: "18rem",
                                    borderRadius: "20%", margin: "13px 15px", backgroundColor: "wheat"
                                }}>
                                    <div className={"card-body text-center"}
                                         style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                        <img
                                            src={item.imgSrc}
                                            className={"img-thumbnail rounded card-img-bottom my-auto mx-auto d-block"}
                                            alt={item.name}
                                            style={{
                                                width: "180px", height: "180px", objectFit: "cover",
                                                textAlign: "center"
                                            }}
                                        />
                                        <h6 className={"my-auto overflow-auto text-ellips"} style={{textAlign: "center", fontWeight: "bold"}} title={item.name}>
                                            <Link to={"/details/" + item.id.toString()}>
                                                {item.name}
                                            </Link>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{height: "50px"}}></div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{textAlign: "center"}}>
                    <h3>Still Don't know what to eat?</h3>
                </div>
                <div style={{textAlign: "center"}}>
                    <button className={"btn btn-warning"}
                            style={{width: "300px"}}
                            onClick={handleRandomRecipe}>Get a Random Recipe!</button>
                </div>
            </div>
            <div style={{height: "50px"}}></div>
        </div>
    );
}
