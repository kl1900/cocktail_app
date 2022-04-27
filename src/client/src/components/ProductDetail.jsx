// npm install react-dropdown  --save
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GET_USER_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import Creatable from "react-select/creatable";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";

export default function ProductDetail() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0);
  const [button, setButton] = useState("Submit");
  const [recordId, setRecordId] = useState(null);
  const [roleValue, setRoleValue] = useState("");
  const [wishlists, setWishlists] = useState([]);
  const [wishlistIndex, setWishlistIndex] = useState();
  const [userMode, setUserMode] = useState(false);
  const [step, setStep] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  let userId = null;
  if (user !== undefined) {
    userId = user.sub;
  }
  const { accessToken } = useAuthToken();

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
      const res = await fetch(`${GET_USER_URL}/recipe/${params.productId}`);
      const data = await res.json();
      if (data) {
        const user_res = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const user_data = await user_res.json();
        const id = user_data.id;
        for (let i = 0; i < data.review.length; i++) {
          if (data.review[i].userId === id) {
            setRecordId(data.review[i].id);
            break;
          }
        }
        setReviews(data.review);
      }
    }
    getReviews();
  }, [count, userMode]);

  // get user's wishlists
  useEffect(() => {
    async function getWishlists() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      const user_wishlist = data.wishlist;
      if (user_wishlist) {
        setWishlists(user_wishlist);
      }
    }
    if (userId) {
      getWishlists();
    }
  }, [step, userMode]);

  // check if user login or not
  useEffect(() => {
    if (userId) {
      setUserMode(true);
    }
  }, [userId]);

  // get wishlist id gonna save
  useEffect(() => {
    if (roleValue) {
      setWishlistIndex(roleValue.value);
    }
  }, [roleValue]);

  // useEffect of count numbers to refresh db
  const countNum = () => {
    setCount(count + 1);
  };

  const countStep = () => {
    setStep(step + 1);
  };

  function submitReviewHelper() {
    let data1 = {
      productId: parseInt(params.productId),
      content: inputValue,
      rating: parseInt(rating),
    };
    fetch(`${GET_USER_URL}/review`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if (data === null) {
            alert("You have already written a review for this product!");
          }
          countNum();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }

  function submitReview(e) {
    e.preventDefault();
    let data2 = {
      content: inputValue,
      rating: parseInt(rating),
    };

    if (recordId === null) {
      fetch(`${GET_USER_URL}/recipe/${params.productId}`)
          .then((response) => response.json())
          .then((data) => {
            if (data === null) {
              const product_data = {
                externalId: parseInt(params.productId),
                productName: recipeDetails[0].title,
                imageURL: recipeDetails[0].image,
              };
              fetch(`${GET_USER_URL}/recipe`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(product_data),
              }).then((response) => response.json())
                  .then((data) => {
                    console.log("Product Success:", data);
                    submitReviewHelper();
                  })
                  .catch((error) => {
                    console.error("Product Error:", error);
                  });
            } else {
              submitReviewHelper();
            }
          });
    } else {
      fetch(`${GET_USER_URL}/review/${recordId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data2),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          countNum();
          setButton("Submit");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  function deleteReview(reviewId) {
    fetch(`${GET_USER_URL}/review/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setRecordId(null);
        if (data === null) {
          alert("Your review does not exist!");
        }
        countNum();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function editReview(review) {
    {
      setRating(review.rating);
      setInputValue(review.content);
      console.log(rating, inputValue);
      setButton("Edit");
    }
  }

  function indexExist(value) {
    return roles.some(function (el) {
      return el.value === value;
    });
  }

  function saveToWishlistHelper() {
    if (roleValue) {
      if (!indexExist(wishlistIndex)) {
        const data = {
          title: wishlistIndex,
        };
        console.log(data);
        fetch(`${GET_USER_URL}/wishlist/${params.productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Wishlist add Success:", data);
            countStep();
            setRoleValue("");
            alert("Successfully added recipe to " + data.title);
          })
          .catch((error) => {
            console.error("Wishlist add Error:", error);
          });
      } else {
        fetch(
          `${GET_USER_URL}/wishlist/${wishlistIndex}/add_${params.productId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data === null) {
              alert("Wishlist not exist");
            } else {
              console.log("Wishlist add Success:", data);
              alert("Successfully added recipe to " + data.title);
            }
            countStep();
            setRoleValue("");
          })
          .catch((error) => {
            console.error("Wishlist add Error:", error);
          });
      }
    }
  }

  function saveToWishlist() {
    fetch(`${GET_USER_URL}/recipe/${params.productId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data === null) {
          const product_data = {
            externalId: parseInt(params.productId),
            productName: recipeDetails[0].title,
            imageURL: recipeDetails[0].image,
          };
          fetch(`${GET_USER_URL}/recipe`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product_data),
          }).then((response) => response.json())
          .then((data) => {
            console.log("Product Success:", data);
            saveToWishlistHelper();
          })
          .catch((error) => {
            console.error("Product Error:", error);
          });
        } else {
          saveToWishlistHelper();
        }
      });
  }

  function resetInput() {
    setRating("");
    setInputValue("");
  }

  let roles = [];
  for (let i = 0; i < wishlists.length; i++) {
    roles.push({ label: wishlists[i].title, value: wishlists[i].id });
  }

  const handleChange = (field, value) => {
    switch (field) {
      case "roles":
        setRoleValue(value);
        break;

      default:
        break;
    }
  };
  console.log(recipeDetails);
  return recipeDetails.map((recipeDetail) => (
    <div key={params.productId} className="recipeDetail">
      {/* {userId? (<Link to="/app/repositories"> ⬅️ Back</Link>) : ("") } */}
      {/* <button onclick={this.props.history.goBack()}>Go Back</button> */}
      <div>
        <div>{recipeDetail.title}</div>
        <ul>
          {recipeDetail.glutenFree ? 
            (<li>glutenFree</li>) : ("")
            }
          {recipeDetail.vegan ? 
            (<li>vegan</li>) : ("")
           }
          {recipeDetail.dairyFree ? 
            (<li>dairyFree</li>) : ("")
            }
          {recipeDetail.preparationMinutes ? 
            (<li>{`Need ${recipeDetail.preparationMinutes} minutes to prepare`}</li>):("")
            }
          {recipeDetail.cookingMinutes ? 
            (<li>{`Need ${recipeDetail.cookingMinutes} minutes to cook`}</li>):("")
            }
          {recipeDetail.aggregateLikes ? 
            (<li>{`${recipeDetail.aggregateLikes} Likes`}</li>):("")
            }
        </ul>
        {/* <img src="https://spoonacular.com/application/frontend/images/heart.svg" alt="heart" /> */}
        <div>
          {userMode ? (
            <div>
              <div>Save to Recipe Box (Or Create a New One to Save)</div>
              <div>
                <Creatable
                  isClearable
                  onChange={(value) => handleChange("roles", value)}
                  options={roles}
                  value={roleValue}
                />
                {/* <button onClick={saveToWishlist}>Save</button> */}
                <button
                  onClick={() => {
                    saveToWishlist();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
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
          ))}
        </ul>
      </div>

      <div>
        <div> Instructions </div>
        <ol className="instruction-list">
          {recipeDetail.analyzedInstructions[0].steps.map((eachStep) => (
            <li className="instruction" key={eachStep.number}>
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
          {userMode ? (
            <div>
              {recordId !== null ? "Edit" : "Add"} Review:
              <input
                type="text"
                id="rating"
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value);
                }}
              />
              <textarea
                type="text"
                rows="5"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <input
                type="submit"
                id="submit"
                value={button}
                onClick={(e) => {
                  submitReview(e);
                  resetInput();
                }}
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          {reviews.length !== 0 ? (
            <ul className="review-list">
              {reviews.map((review) => (
                <li className="review" key={review.id}>
                  <div className="review-row">
                    <div>
                      {review.updatedAt ? (
                        <div>Updated at {review.updatedAt.slice(0,10)} {review.updatedAt.slice(12,19)}</div>
                      ) : (
                        <div>Created at {review.createdAt.slice(0,10)} {review.createdAt.slice(12,19)}</div>
                      )}
                    </div>
                    <div>
                      {review.id === recordId ? (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteReview(review.id)}
                        >
                          <ImCross />
                        </div>
                      ) : (
                          ""
                      )}
                    </div>
                    <div>{review.rating}</div>
                    <div>
                      {review.content.split("\n").map((item, index) => (
                        <span key={index}>
                          {item}
                          <br />
                        </span>
                      ))}
                      ---from {review.username}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            "Currently no review for this recipe"
          )}
        </div>
      </div>
    </div>
  ));
}
