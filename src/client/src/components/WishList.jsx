import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GET_USER_URL } from "../constants";
import { useNavigate } from "react-router-dom";
// import { useUser } from "../UserContext";

export default function WishList() {
  const [recipes, setRecipes] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  // const { user } = useUser;

  useEffect(() => {
    async function getWishlistDetails() {
      const res = await fetch(
        `${GET_USER_URL}/wishlist/${params.wishlistId}`
      );
      const data = await res.json();
      const detail = data.product;
      if (detail) {
        setRecipes(detail);
      }
    }
    if (1) {
      getWishlistDetails();
    }
  },[params.wishlistId]);

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
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  console.log(recipes);

  return (

    <div className="wishlistName">
      <h5>My Favorite Recipes</h5>
      {/* <Link to="/wishlists"> ⬅️ Back</Link> */}
      <h2>{params.wishlistId}</h2>
      <ul className="wishlist-list">
            {recipes.map((recipe) => (
                <li className="recipe-row-li" key={recipe.externalId} >
                <div className="recipe-row">
                    <div><img src={recipe.imageURL} /></div>
                    <div>{recipe.productName}</div>
                    <button className="check" key={recipe.id} onClick={() => selectRecipe(recipe.externalId)}>Check</button>
                    <button className="delete" key={recipe.externalId} onClick={() => deleteRecipe(params.wishlistId, recipe.id)}>Delete</button>
                </div>
                </li>
            ))}
        </ul>
    </div>
  );
}