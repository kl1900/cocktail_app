// npm install react-dropdown  --save
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_USER_URL } from "../constants";
import Creatable from "react-select/creatable";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";

export default function ProductDetail() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [rating, setRating] = useState("1");
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

  const { user, isAuthenticated } = useAuth0();
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
        if (accessToken) {
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
        }
        setReviews(data.review);
      }
    }
    getReviews();
  }, [accessToken, count, isAuthenticated, params.productId, userMode]);

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
    if (accessToken) {
      getWishlists();
    }
  }, [accessToken, step, userMode]);

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
            })
              .then((response) => response.json())
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
          })
            .then((response) => response.json())
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

  return recipeDetails.map((recipeDetail) => (
    <div key={params.productId} className="recipeDetail">
      <div className="container">
        <div className="row mt-5">
          <div className="col-7">
            <img src={recipeDetail.image} alt={recipeDetail.title} with="200" />
          </div>
          <div className="col-5">
            <div className="my-5">
              <h2>{recipeDetail.title}</h2>
              <div className="receipe-duration">
                <ul>
                  {recipeDetail.glutenFree ? (
                    <li key="glutenFree">glutenFree</li>
                  ) : (
                    ""
                  )}
                  {recipeDetail.vegan ? <li key="vegan">vegan</li> : ""}
                  {recipeDetail.dairyFree ? (
                    <li key="dairyFree">dairyFree</li>
                  ) : (
                    ""
                  )}
                  {recipeDetail.preparationMinutes ? (
                    <li key="prepTime">{`Prep: ${recipeDetail.preparationMinutes} minutes`}</li>
                  ) : (
                    ""
                  )}
                  {recipeDetail.cookingMinutes ? (
                    <li key="cookingTime">{`Cook: ${recipeDetail.cookingMinutes} minutes`}</li>
                  ) : (
                    ""
                  )}
                  {recipeDetail.aggregateLikes ? (
                    <li key="numberOfLikes">{`${recipeDetail.aggregateLikes} Likes`}</li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          {userMode ? (
            <div>
              <h5 className="mt-2">Save to Recipe</h5>
              <div>
                <Creatable
                  isClearable
                  onChange={(value) => handleChange("roles", value)}
                  options={roles}
                  value={roleValue}
                />
                <div className="text-right">
                  <button
                    className="btn btn-outline-primary mt-2"
                    onClick={() => {
                      saveToWishlist();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Recipe instruction */}
        {recipeDetail.analyzedInstructions[0] ? (
          <div className="row">
            <div className="col-12 col-lg-8">
              <h4> Instructions</h4>
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
            {recipeDetail.extendedIngredients ? (
              <div className="col-12 col-lg-4">
                <div className="ingredients">
                  <h4> Ingredients</h4>
                  {recipeDetail.extendedIngredients.map((ingredient, index) => (
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={"customCheck" + index}
                      />
                      <label
                        className="custom-control-label"
                        for={"customCheck" + index}
                      >
                        {ingredient.original}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <div className="mt-5"></div>
        <div className="row">
          <div className="col-12">
            <div className="section-heading text-left">
              <h3>Leave a comment</h3>
            </div>
          </div>
        </div>

        {userMode ? (
          <div className="row">
            <div class="col-12">
              <p>{recordId !== null ? "Edit" : "Add"} Review:</p>
            </div>
            <div class="col-12">
              <div class="contact-form-area">
                <div class="row">
                  <div class="col-12">
                    <label for="rating">Select rating:</label>
                    <select
                      class="form-control"
                      id="rating"
                      value={rating}
                      onChange={(e) => {
                        setRating(e.target.value);
                      }}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                  <div class="col-12 form-group">
                    <label for="comment">Comment:</label>
                    <textarea
                      class="form-control"
                      type="text"
                      rows="5"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                      }}
                    />
                  </div>
                  <div class="col-12 text-right">
                    <input
                      class="btn btn-outline-primary"
                      type="submit"
                      id="submit"
                      value={button}
                      onClick={(e) => {
                        submitReview(e);
                        resetInput();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="row">
          <div className="col-12">
            <div className="section-heading text-left">
              <h3>Comments</h3>
            </div>
          </div>
        </div>

        {/* Comment section */}
        <div class="row">
          {reviews.length !== 0 ? (
            <div class="col-12">
              <div class="contact-form-area">
                <div class="row">
                  <div class="col-12">
                    {reviews.map((review) => (
                      <div class="commented-section mt-2">
                        <div class="d-flex flex-row align-items-center commented-user">
                          <h5 class="mr-2">Rated by: {review.username}</h5>
                          <span class="dot mb-1"></span>
                          {review.updatedAt ? (
                            <div class="mb-1 ml-2">
                              Updated at {review.updatedAt.slice(0, 10)}{" "}
                              {review.updatedAt.slice(12, 19)}
                            </div>
                          ) : (
                            <div class="mb-1 ml-2">
                              Created at {review.createdAt.slice(0, 10)}{" "}
                              {review.createdAt.slice(12, 19)}
                            </div>
                          )}
                        </div>
                        <div class="col-12">
                          <h5>Rating: {review.rating}</h5>
                        </div>
                        <div class="col-12">
                          {review.content.split("\n").map((item, index) => (
                            <blockquote class="blockquote">
                              <p key={index} class="mb-0">
                                {item}
                                <br />
                              </p>
                            </blockquote>
                          ))}
                        </div>

                        <div>
                          {review.id === recordId ? (
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => deleteReview(review.id)}
                            >
                              <button className="btn btn-outline-danger">
                                Delete
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>"Currently no review for this recipe"</p>
          )}
        </div>
      </div>
    </div>
  ));
}
