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
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState();
  const [count, setCount] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  // const { user } = useUser;
  let userId=1;

  const countNum = () => {
    setCount(count+1);
  }

  useEffect(() => {
    async function getRecipeDetails() {
      const res = await fetch(
        `${GET_USER_URL}/getRecipeInfo/${params.productId}`
      );
      var data = await res.json();
      if (data) {
        setRecipeDetails([data]);
      }
    }
    getRecipeDetails();
  },[params.productId]);

  useEffect(()=>{
    async function getReviews() {
      const res = await fetch(
        `${GET_USER_URL}/recipe/${params.productId}`
      );
      var data = await res.json();
      if (data) {
        // setReviews([...reviews, data.review]);
        setReviews(data.review);
      }
    }
    getReviews();
  },[count]);

  function saveRecipe(){
    let data={
      "externalId": parseInt(params.productId),
      "productName": recipeDetails[0].title,
      "imageURL": recipeDetails[0].image
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
      // addToWishlist();
      saveRecipe();
    }
  }

  console.log(rating, reviews);

  function submitReview(e){
    e.preventDefault();
    let data={
      "productId": parseInt(params.productId),
      "userId": userId,
      "content": inputValue,
      "rating": parseInt(rating),
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
      countNum();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  console.log(count);

  function resetInput(){
    setRating("");
    setInputValue("");
  }

  return (
    recipeDetails.map(recipeDetail => (
      <div key={params.productId} className="recipeDetail">
      {/* {userId? (<Link to="/app/repositories"> ⬅️ Back</Link>) : ("") } */}
      <div>
      <div>{recipeDetail.title}</div>
      <ul>
        <li>{recipeDetail.glutenFree ? " " : "glutenFree"}</li>
        <li>Ready in {recipeDetail.preparationMinutes} Minutes</li>
        <li>{recipeDetail.aggregateLikes} Likes</li>
      </ul>
      <img src="https://spoonacular.com/application/frontend/images/heart.svg" alt="heart" />
      <a href="#" onClick={() => checkLogin() } >Save to Recipe Box</a>
      </div>

      <div><img src={recipeDetail.image} /></div>

      <div>
        <div> Ingredients</div>
        <ul className="ingredients-list">
          {recipeDetail.extendedIngredients.map((ingredient) => (
            <li className="ingredient-li" key={ingredient.id}>
              <div className="ingredient-row">
                <div>{ingredient.original}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div> Instructions </div>
        <ol className="instruction-list">
          {recipeDetail.analyzedInstructions[0].steps.map((eachStep) => (
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
        <div> Reviews </div>
        
          <div>
            <div>
              Add Review:
              <input type="text" id="rating" value={rating} onChange={(e)=>{setRating(e.target.value)}}/>
              <textarea type="text" rows="5" value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}}/> 
              <button onClick={(e)=>{submitReview(e);resetInput();}}>Submit</button>
            </div>
          </div>
      
          <div>
            {reviews!==undefined?(
              <ul className="review-list">
                {/* {reviews[reviews.length-1].map((review) => ( */}
                {reviews.map((review) => (
                  <li className="review" key={review.id} >
                    <div className="review-row">
                      <div>{review.rating}</div>
                      <div>{review.content}<br/>---from {review.userId}</div>
                    </div>
                  </li>
                ))}
            </ul>
          ):(<div></div>)}
          </div>
        </div>
      
    </div>
    ))
    
  );
}
