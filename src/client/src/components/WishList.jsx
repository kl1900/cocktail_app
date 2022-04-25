import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GET_USER_URL } from "../constants";
import { useNavigate } from "react-router-dom";
// import { useUser } from "../UserContext";

export default function WishList() {
  const [recipes, setRecipes] = useState([]);
  const [wishlistTitle, setWishlistTitle] = useState("");
  const [count, setCount] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  // const { user } = useUser;

  useEffect(() => {
    async function getWishlistDetails() {
      const res = await fetch(
        `${GET_USER_URL}/wishlist/${params.wishlistId}`
      );
      const data = await res.json();
      if (data === null) {
        navigate("/*");
      }
      else {
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
  },[count]);

  const countNum = () => {
    setCount(count+1);
  }

  const selectRecipe = (recipeId) => {
    navigate(`/products/${recipeId}`);
  };

  const deleteRecipe = (wishlistId, recipeId) => {
    fetch(`${GET_USER_URL}/wishlist/${wishlistId}/delete_${recipeId}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data === null) {
        alert("Operation failed");
        navigate("/wishlists");
      }
      else {
        console.log('Success:', data);
      }
      countNum();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (

    <div className="wishlistName">
      <div>My Favorite Recipes</div>
      <Link to="/wishlists"> ⬅️ Back</Link>
      <div>{wishlistTitle}</div>
      <ul className="wishlist-list">
        {recipes.map((recipe) => (
          <li className="recipe-row-li" key={recipe.externalId} >
            <div className="recipe-row">
                <div><img src={recipe.imageURL} /></div>
                <div>{recipe.productName}</div>
                <button 
                  className="check" 
                  onClick={() => selectRecipe(recipe.externalId)}
                  >
                    Check
                </button>
                <button 
                  className="delete" 
                  onClick={() => deleteRecipe(params.wishlistId, recipe.externalId)}
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