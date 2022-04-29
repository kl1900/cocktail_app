import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GET_USER_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../AuthTokenContext";
import NotFound from "./NotFound";
import { FcDislike } from "react-icons/fc";
import { IoScale } from "react-icons/io5";
// import { useUser } from "../UserContext";

export default function WishList() {
  const [recipes, setRecipes] = useState([]);
  const [wishlistTitle, setWishlistTitle] = useState("");
  const [count, setCount] = useState(0);
  const [notFound, setNotfound] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function getWishlistDetails() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/wishlist/${params.wishlistId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (data === null) {
        setNotfound(true);
      } else {
        const detail = data.product;
        if (detail) {
          setRecipes(detail);
          setWishlistTitle(data.title);
        }
      }
    }
    if (accessToken) {
      getWishlistDetails();
    }
  }, [count, accessToken]);

  const countNum = () => {
    setCount(count + 1);
  };

  // const selectRecipe = (recipeId) => {
  //   navigate(`/details/${recipeId}`);
  // };

  const deleteRecipe = (wishlistId, recipeId) => {
    fetch(`${GET_USER_URL}/wishlist/${wishlistId}/delete_${recipeId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === null) {
          alert("Operation failed");
          navigate("/wishlists");
        } else {
          console.log("Success:", data);
        }
        countNum();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="wishlistName">
      <div>My Favorite Recipes</div>
      <Link to="/wishlists"> ⬅️ Back</Link>
      {notFound ? (<NotFound />) : 
      (<div>
        <h3 style={{textAlign:"center"}}>{wishlistTitle}</h3>
        <div className={"row justify-content-center"}>
          {recipes.map((recipe) => (
            <div className={"col"} style={{flexGrow: 0}} key={recipe.externalId}>
              <div className={"card zoom-hover"} style={{
                  width: "15rem", height: "18rem",
                  borderRadius: "20%", margin: "13px 15px", backgroundColor: "wheat"
              }}>
                <div className={"card-body text-center"}
                  style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                  <a href="">
                    <div className={"zoom-hover-half"}
                      style={{position: 'absolute', right:"7%", top:"3%"}} onClick={(e) => {
                        e.preventDefault();
                        deleteRecipe(params.wishlistId, recipe.externalId);
                      }
                    }>
                      <FcDislike size={28} />
                    </div>
                  </a>
                  <img 
                    src={recipe.imageURL} 
                    className={"img-thumbnail rounded card-img-bottom my-auto mx-auto d-block"}
                    alt={recipe.productName} 
                    style={{
                        width: "180px", height: "180px", objectFit: "cover",
                        textAlign: "center"
                  }}/>
                  <h6 className={"my-auto"} style={{textAlign: "center"}}>
                      <Link to={`/details/${recipe.externalId}`}>
                          {recipe.productName}
                      </Link>
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>)}
    </div>
  );
}
