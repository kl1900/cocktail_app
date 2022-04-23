import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { GET_USER_URL } from "../constants";
import CreateWishlist from "./CreateWishlist";
import EditWishlist from "./EditWishlist";
import { ImPencil } from "react-icons/im";

export default function WishLists(){
  const navigate = useNavigate();
  const [wishlists, setWishlists] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState([]);
  const [count, setCount] = useState(0);
  
  // const { user } = useUser();
  const userId = 1;
  const id=1;
  const user= fetch(
      `${GET_USER_URL}/user/${id}`);
  
  const changeToFalse = (i) =>{
    const temp = editMode.slice();
    temp[i]=false;
    setEditMode(temp);
  }

  const changeToTrue = (i) =>{
    const temp = editMode.slice();
    temp[i]=true;
    setEditMode(temp);
  }

  const changeCreate = () => {
    setCreateMode(false);
  }

  const countNum = () => {
    setCount(count+1);
  }
  
  useEffect(() => {
    async function getWishlists() {
      const res = await fetch(
        `${GET_USER_URL}/user/${id}`
      );
      const data = await res.json();
      const user_wishlist = data.wishlist;
      if (user_wishlist) {
        setWishlists(user_wishlist);
      }
    }
    if (1) {
      getWishlists();
    }
  }, [count]);

  useEffect(()=>{
    const length = wishlists.length;
    const temp = [];
    for(let i=0;i<length;i+=1){
      temp.push(false);
    }
    setEditMode(temp);
  },[wishlists]);

  const selectWishlist = (wishlistId) => {
      navigate(`/wishlist/${wishlistId}`);
  };
  
  const deleteWishlist = (wishlistId) =>{
    fetch(`${GET_USER_URL}/wishlist/${wishlistId}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      countNum();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  console.log(count, wishlists);
  
  return (
    <div>
      <div>My Favorite Recipe Box</div>
      <div>
      {createMode?(
        <div>
          <CreateWishlist changeCreate={changeCreate} userId={userId} countNum={countNum} />
        </div>
      ):(
        <div>
          <button onClick={()=>setCreateMode(true)}>New Recipe List</button>
        </div>
        )
      }
      </div>
      <div>
        <ul className="wishlist-list">
          {wishlists.map((wishlist, i) => (
            <li
            className="wishlist-row-li" key={wishlist.id}
            >
            <div className="wishlist-row">
              {/* <div style={{background: "url("+getPicture(wishlist.id)+")", width: "300px", height: "250px", textAlign:"center", verticalAlign: "center"}}>{wishlist.title}</div> */}
              
              <img src = {wishlist.imageURL} style={{width: "300px", height: "250px"}}/>
                
              <div>
                {editMode[i]?(
                  <div>
                    <EditWishlist 
                      wishlistId={wishlist.id} 
                      changeToFalse={()=>changeToFalse(i)} 
                      countNum={countNum}
                    />
                  </div>
                ):(
                  <div>
                    <div>{wishlist.title}</div>
                    <div 
                      style={{cursor: "pointer"}} 
                      onClick={()=>changeToTrue(i)}>
                      <ImPencil/>
                    </div>
                  </div>
                  )
                }
              </div>

              <div>
                <button className="check" onClick={() => selectWishlist(wishlist.id)}>Check</button>
                <button className="delete" onClick={() => {deleteWishlist(wishlist.id);countNum()}}>Delete</button>
              </div>
            </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
