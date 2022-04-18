import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GET_USER_URL } from "../constants";
import { useNavigate } from "react-router-dom";
// import UserProfile from "./UserProfile";
// import { useUser } from "../UserContext";
import { addToWishlist } from "../hooks/addToWishlist"

export default function ProductDetail() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [rating, setRating] = useState();
  const params = useParams();
  const navigate = useNavigate();
  // const { user } = useUser;
  let userId=1;

  useEffect(() => {
    async function getRecipeDetails() {
      const res = await fetch(
        `${GET_USER_URL}/getRecipeInfo/${params.productId}`
      );
      var data = await res.json();
      if (data) {
        setRecipeDetails(data);
      }
    }
    getRecipeDetails();
  },[params.productId]);
  
  
  var ingredients=recipeDetails.extendedIngredients;
  var steps=recipeDetails.analyzedInstructions[0].steps;

  function saveRecipe(){
    let data={
      "externalId": params.productId,
      "productName": recipeDetails.title,
      "imageURL": recipeDetails.image
    }
    
    fetch(`${GET_USER_URL}/recipe`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  function checkLogin() {
    // havent login user.check
    if(0){
      navigate(`/login`);
    }else{
      addToWishlist();
      // saveRecipe();
    }
  }

  function submitReview(){
    
    let data={
      "productId": parseInt(params.productId),
      "userId": userId,
      "content": inputValue,
      "rating": parseInt(rating)
    }
    fetch(`${GET_USER_URL}/review`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div key={params.productId} className="recipeDetail">
      {/* <Link to="/app/repositories"> ⬅️ Back</Link> */}
      <div>
      <h2>{recipeDetails.title}</h2>
      <ul>
        <li>{recipeDetails.glutenFree ? " " : "glutenFree"}</li>
        <li>Ready in {recipeDetails.preparationMinutes} Minutes</li>
        <li>{recipeDetails.aggregateLikes} Likes</li>
      </ul>
      <img src="https://spoonacular.com/application/frontend/images/heart.svg" alt="heart" />
      <a href="#" onClick={() => checkLogin()} >Save to Recipe Box</a>
      </div>

      <div><img src={recipeDetails.image} /></div>

      <div>
        <p> Ingredients</p>
        <ul className="ingredients-list">
          {ingredients.map((ingredient) => (
            <li className="ingredient-li" key={ingredient.id}>
              <div className="ingredient-row">
                <div>{ingredient.original}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p> Instructions </p>
        <ol className="instruction-list">
          {steps.map((eachStep) => (
            <li
              className="instruction" key={eachStep.number}
            >
              <div className="instruction-row">
                <div>{eachStep.step}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <form>
          <label>
            Review:
            <input type="text" value={rating} onChange={e=>{setRating(e.target.value)}}/>
            <textarea type="text" rows="5" value={inputValue} onChange={e=>{setInputValue(e.target.value)}}/> 
            <input type="button" value="Submit" onClick={submitReview()}/>
          </label>
          
        </form>
      </div>
    </div>
    
  );
}
