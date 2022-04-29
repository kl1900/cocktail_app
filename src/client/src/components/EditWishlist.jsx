import React, { useState} from 'react';
import { useAuthToken } from "../AuthTokenContext";
import { AiOutlineRollback } from "react-icons/ai";

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
            <div style={{display: "flex", flexDirection: "row", justifyContent: "left", marginTop: "10px"}}>
                <div>
                    <div style={{float: "left", height: "30px"}}>
                        <a href="" onClick={(e) => {
                            e.preventDefault();
                            changeToFalse();
                        }}>
                            <AiOutlineRollback size={28} />
                        </a>
                    </div>
                </div>
                <div>
                    <input value={wishlistName} style={{height: "30px", width: "150px"}} onChange={e=>setWishlistName(e.target.value)}/>
                 </div>
            </div>
            
            <button className="btn btn-outline-primary" onClick={onSubmit} style={{marginTop: "6px"}}>Submit</button>
        </div>
    )
}
