import React, { useState} from 'react';
import { GET_USER_URL } from "../constants";

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
            <div onClick={() => changeCreate()}>Go Back</div>
            <input value={wishlistName} onChange={e=>setWishlistName(e.target.value)}/>
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}
