import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { GET_USER_URL } from "../constants";

export default function WishLists() {
  const navigate = useNavigate();
  const [wishlists, setWishlists] = useState([]);
  const [url, setUrl] = useState([]);
  // const { user } = useUser();
  const id = 1;
  const user = fetch(`${GET_USER_URL}/user/${id}`);

  useEffect(() => {
    async function getWishlists() {
      const res = await fetch(`${GET_USER_URL}/user/${id}`);
      const data = await res.json();
      const user_wishlist = data.wishlist;
      if (user_wishlist) {
        setWishlists(user_wishlist);
      }
    }
    if (1) {
      getWishlists();
    }
  }, [id]);

  // console.log(wishlists);
  useEffect(() => {
    const getPicture = (wishlistId) => {
      return fetch(`${GET_USER_URL}/wishlist/${wishlistId}`)
        .then((response) => response.json())
        .then((data) => {
          let recipe = data.product;
          if (recipe) {
            return recipe[0].imageURL;
          }
        })
        .then((res) => setUrl(res));
    };
  }, [wishlists]);

  const selectWishlist = (wishlistId) => {
    navigate(`/wishlists/${wishlistId}`);
  };

  const deleteWishlist = (wishlistId) => {
    fetch(`${GET_USER_URL}/wishlist/${wishlistId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const editWishlist = (wishlistId) => {};
  console.log(url);
  return (
    <div>
      <h5>My Favorite Recipes</h5>
      <ul className="wishlist-list">
        {wishlists.map((wishlist) => (
          <li className="wishlist-row-li" key={wishlist.id}>
            <div className="wishlist-row">
              <div>{wishlist.title}</div>
              {/* <img option = {getPicture(wishlist.id)} src={url}/> */}
              <div>
                <button
                  className="edit"
                  onClick={() => editWishlist(wishlist.id)}
                >
                  Edit
                </button>
                <button
                  className="check"
                  onClick={() => selectWishlist(wishlist.id)}
                >
                  Check
                </button>
                <button
                  className="delete"
                  onClick={() => deleteWishlist(wishlist.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
