// npm install react-dropdown  --save
// npm install semantic-ui-react semantic-ui-css
// npm i --save lodash
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GET_USER_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { ImPencil, ImCross } from "react-icons/im";
import Creatable from 'react-select/creatable';
import { func } from "prop-types";
// import UserProfile from "./UserProfile";
// import { useUser } from "../UserContext";
// import { addToWishlist } from "../hooks/addToWishlist";

export default function ProductDetail() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState();
  const [count, setCount] = useState(0);
  const [button, setButton] = useState("Submit");
  const [recordId, setRecordId] = useState();
  const [roleValue, setRoleValue] = useState('')
  const [wishlists, setWishlists] = useState([]);
  const [wishlistIndex, setWishlistIndex] = useState();
  const [userMode, setUserMode] = useState(false);
  // const [step, setStep] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  // const { user } = useUser;
  let userId = 1;

  // get product's details
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
  }, [params.productId]);

  // get product's reviews
  useEffect(() => {
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

  // get user's wishlists
  useEffect(() => {
    async function getWishlists() {
      const res = await fetch(
        `${GET_USER_URL}/user/${userId}`
      );
      const data = await res.json();
      const user_wishlist = data.wishlist;
      if (user_wishlist) {
        setWishlists(user_wishlist);
      }
    }
    if (userId) {
      getWishlists();
    }
  }, []);

  // check if user login or not
  useEffect(()=>{
    if(userId){
      setUserMode(true);
    }
  },[userId])

  // get wishlist id gonna save
  useEffect(()=>{
    if(roleValue){
      setWishlistIndex(roleValue.value);
    }
  },[roleValue])

  // useEffect(()=>{
  //   if(typeof(wishlistIndex)==="number"){
  //     saveToWishlist();
  //   }
  // },[step]);

  // useEffect of count numbers to refresh db
  const countNum = () => {
    setCount(count+1);
  }

  // const countStep = () => {
  //   setStep(step+1);
  // }

  // function saveRecipe(){
  //   let data={
  //     "externalId": parseInt(params.productId),
  //     "productName": recipeDetails[0].title,
  //     "imageURL": recipeDetails[0].image
  //   }
    
  //   fetch(`${GET_USER_URL}/recipe`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }

  // function checkLogin() {
  //   havent login user.check
  //   if (0) {
  //     navigate(`/login`);
  //   }else{
  //     addToWishlist();
  //     saveRecipe();
  //   }
  // }

  console.log("count:", {count});
  console.log("rating:",{rating});

  function submitReview(e){
    e.preventDefault();
    let data1={
      "productId": parseInt(params.productId),
      "userId": userId,
      "content": inputValue,
      "rating": parseInt(rating),
    }
    let data2={
      "content": inputValue,
      "rating": parseInt(rating),
    }

    if(button==="Submit"){
      fetch(`${GET_USER_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data1),
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
    else if(button==="Edit"){
      // console.log(userId);
      fetch(`${GET_USER_URL}/review/${recordId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data2),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        countNum();
        setButton("Submit");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }

  function deleteReview(reviewId){
    fetch(`${GET_USER_URL}/review/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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

  function editReview(review){
    {
      setRating(review.rating);
      setInputValue(review.content);
      console.log(rating, inputValue);
      setButton("Edit");
    }
  }

  function indexExist(value){
    return roles.some(function(el){
      return el.value===value;
      }
    )
  }

  function createWishlist(){
    if(roleValue){
      // setWishlistIndex(roleValue.value);
      // if(typeof(wishlistIndex)!=="number"){
      if(!indexExist(wishlistIndex)){
        const data={
          "title" : wishlistIndex,
          "userId" : userId,
        };
        console.log(data);
        fetch(`${GET_USER_URL}/wishlist`, {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(data => {
              console.log('Success:', data);
              setWishlistIndex(data.id);
          })
          .catch((error) => {
          console.error('Error:', error);
          }
        );
      };
    }
  }

  function saveToWishlist(){
    if(roleValue){
      // setWishlistIndex(roleValue.value);
      // if(typeof(wishlistIndex)!=="number"){
      // if(!indexExist(wishlistIndex)){
      //   const data={
      //     "title" : wishlistIndex,
      //     "userId" : userId,
      //   };
      //   console.log(data);
      //   fetch(`${GET_USER_URL}/wishlist`, {
      //     method: 'POST', 
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(data),
      //     })
      //     .then(response => response.json())
      //     .then(data => {
      //         console.log('Success:', data);
      //         setWishlistIndex(data.id);
      //     })
      //     .catch((error) => {
      //     console.error('Error:', error);
      //     }
      //   );
      // };

      if(typeof(wishlistIndex)==="number"){
      // if(indexExist(wishlistIndex)){
        fetch(`${GET_USER_URL}/wishlist/${wishlistIndex}/add_${params.productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    }
  }

  function resetInput(){
    setRating("");
    setInputValue("");
  }

  let roles=[];
  for(let i=0;i<wishlists.length;i++){
      roles.push({label: wishlists[i].title, value: wishlists[i].id});
  }

  console.log(wishlists);
  console.log(roles);
  console.log(roleValue);
  console.log(wishlistIndex);

  const handleChange = (field, value) => {
    switch (field) {
      case 'roles':
        setRoleValue(value);
        break;

      default:
        break;
    }
  }
  
  return (
    recipeDetails.map(recipeDetail => (
      <div key={params.productId} className="recipeDetail">
        {/* {userId? (<Link to="/app/repositories"> ⬅️ Back</Link>) : ("") } */}
        {/* <button onclick={this.props.history.goBack()}>Go Back</button> */}
        <div>
          <div>{recipeDetail.title}</div>
          <ul>
            <li>{recipeDetail.glutenFree ? " " : "glutenFree"}</li>
            <li>{recipeDetail.preparationMinutes? (`Ready in ${recipeDetail.preparationMinutes} Minutes`):("")}</li>
            <li>{recipeDetail.aggregateLikes?(`${recipeDetail.aggregateLikes} Likes`):("")} </li>
          </ul>
          {/* <img src="https://spoonacular.com/application/frontend/images/heart.svg" alt="heart" /> */}
          <div>{userMode?
            (
              <div>
                <div>Save to Recipe Box (Or Create a New One to Save)</div>
                <div>
                  <Creatable
                    isClearable
                    onChange={(value) => handleChange('roles', value)}
                    options={roles}
                    value={roleValue}
                  />
                  {/* <button onClick={saveToWishlist}>Save</button> */}
                  <button onClick={()=>{createWishlist(); saveToWishlist();}}>Save</button>
                </div>
              </div>
            ):("")
            }
          </div>
        </div>

        <div>
          <img src={recipeDetail.image} />
        </div>

        <div>
          <div> Ingredients</div>
          <ul className="ingredients-list">
            {recipeDetail.extendedIngredients.map((ingredient) => (
              <li className="ingredient-li" key={ingredient.id}>
                <div className="ingredient-row">
                  <div>{ingredient.original}</div>
                </div>
              </li>
              ))
            }
          </ul>
        </div>

        <div>
          <div> Instructions </div>
          <ol className="instruction-list">
            {
              recipeDetail.analyzedInstructions[0].steps.map((eachStep) => (
                <li className="instruction" key={eachStep.number}>
                  <div className="instruction-row">
                    <div>{eachStep.step}</div>
                  </div>
                </li>
              ))
            }
          </ol>
        </div>

        <div>
          <div> Reviews </div>
          <div>
            <div>
              Add/Edit Review:
              <input type="text" id="rating" value={rating} onChange={(e)=>{setRating(e.target.value)}}/>
              <textarea type="text" rows="5" value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}}/> 
              <input type="submit" id="submit" value={button} onClick={(e)=>{submitReview(e);resetInput();}} />
            </div>
          </div>
        
          <div>
            {
              reviews!==undefined?(
                <ul className="review-list">
                  {
                    reviews.map((review) => (
                      <li className="review" key={review.id} >
                        <div className="review-row">
                          <div> 
                            {review.updatedAt ? 
                              (<div>Updated at {review.updatedAt}</div>):
                              (<div>Created at {review.createdAt} </div>)
                            }
                          </div>
                          <div>
                            {review.userId===userId?(
                              <div 
                                style={{cursor: "pointer"}} 
                                onClick={()=>{editReview(review);setRecordId(review.id);}}>
                                <ImPencil/>
                              </div>
                              ):("")
                            }
                          </div>
                          <div>
                            {review.userId===userId?(
                              <div style={{cursor: "pointer"}} onClick={()=>deleteReview(review.id)}>
                                <ImCross/>
                              </div>
                              ):("")
                            }
                          </div>
                          <div>{review.rating}</div>
                          <div>{review.content}<br/>---from {review.username}</div>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              ):("")
            }
          </div>
        </div>
      </div>
  )));
}
