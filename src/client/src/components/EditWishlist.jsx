import React, { useState} from 'react';
import { useAuthToken } from "../AuthTokenContext";

export default ({wishlistId, changeToFalse, countNum}) => {
    const [wishlistName, setWishlistName] = useState("");
    const { accessToken } = useAuthToken();
    
    const onSubmit=()=>{
        const data={"title" : wishlistName};
        fetch(`${process.env.REACT_APP_API_URL}/wishlist/${wishlistId}`, {
            method: 'PUT', 
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
                countNum();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        };
    
    return (
        <div>
            <div onClick={() => changeToFalse()}>Go Back</div>
            <input value={wishlistName} onChange={e=>setWishlistName(e.target.value)}/>
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}
