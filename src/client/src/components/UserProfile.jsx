import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth0();
  const [userName, setUserName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [wishlistCount, setwishlistCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function getUser() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (data) {
        setUserName(data.name);
        setwishlistCount(data.wishlist.length);
        setReviewCount(data.review.length);
      }
    }

    if (accessToken) {
      getUser();
    }
  }, [accessToken, editMode]);

  function EditName() {
    const onSubmit = () => {
      const data = {
        newName: document.getElementById("newName").value,
      };
      fetch(`${process.env.REACT_APP_API_URL}/me`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === null) {
            alert("Duplicate name detected");
          } else {
            setUserName(data.name);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    return (
      <div>
        <input id="newName" required placeholder="Enter name" />
        <button onClick={onSubmit}>Submit</button>
        <button
          onClick={() => {
            setEditMode(false);
          }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="panel">
      <div>
        <p>Name: {userName}</p>
        {editMode ? (
          <div>
            <EditName />
          </div>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Name</button>
        )}
      </div>
      <div>
        <img src={user.picture} width="70" alt="profile avatar" />
      </div>
      <div>
        <p>📧 Email: {user.email}</p>
      </div>
      <div>
        <p>🔑 Auth0Id: {user.sub}</p>
      </div>
      <div>
        <Link to="/wishlists">my wishlists ({wishlistCount})</Link>
      </div>
      <div>
        <p>total reviews ({reviewCount})</p>
      </div>
    </div>
  );
}
