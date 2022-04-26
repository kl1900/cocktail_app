import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GET_USER_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../AuthTokenContext";
// import { useUser } from "../UserContext";

export default function WishList() {
  const [recipes, setRecipes] = useState([]);
  const [wishlistTitle, setWishlistTitle] = useState("");
  const [count, setCount] = useState(0);
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
        navigate("/app/*");
      } else {
        const detail = data.product;
        if (detail) {
          setRecipes(detail);
          setWishlistTitle(data.title);
        }
      }
    }
    if (1) {
      getWishlistDetails();
    }
  }, [count]);

  const countNum = () => {
    setCount(count + 1);
  };

  const selectRecipe = (recipeId) => {
    navigate(`/products/${recipeId}`);
  };

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
      <Link to="/app/wishlists"> ⬅️ Back</Link>
      <div>{wishlistTitle}</div>
      <ul className="wishlist-list">
        {recipes.map((recipe) => (
          <li className="recipe-row-li" key={recipe.externalId}>
            <div className="recipe-row">
              <div>
                <img src={recipe.imageURL} />
              </div>
              <div>{recipe.productName}</div>
              <button
                className="check"
                onClick={() => selectRecipe(recipe.externalId)}
              >
                Check
              </button>
              <button
                className="delete"
                onClick={() =>
                  deleteRecipe(params.wishlistId, recipe.externalId)
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
