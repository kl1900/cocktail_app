import React, { useState} from 'react';
import { GET_USER_URL } from "../constants";
import { AiOutlineRollback } from "react-icons/ai";

export default ({changeCreate, accessToken, countNum}) => {
    const [wishlistName, setWishlistName] = useState("");
    
    const onSubmit=()=>{
        const data={
            "title" : wishlistName,
        };
        fetch(`${GET_USER_URL}/wishlist`, {
            method: 'POST', 
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                if (data === null) {
                    alert("Duplicate name detected");
                }
                else {
                    console.log('Success:', data);
                }
                changeCreate();
                countNum();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        };
    
    return (
        <div>
            <div onClick={() => changeCreate()}  style={{ cursor: "pointer", marginLeft: "10px"}}>
                <AiOutlineRollback size={28} />
            </div>
            <input value={wishlistName} onChange={e=>setWishlistName(e.target.value)}/>
            <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
        </div>
    )
}
