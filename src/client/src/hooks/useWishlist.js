import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

export default function useWishlists() {
  const [WishlistsItems, setWishlistsItems] = useState([]);
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function getWishlistsFromApi() {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/wishlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const Wishlists = await data.json();

      setWishlistsItems(Wishlists);
    }

    if (accessToken) {
      getWishlistsFromApi();
    }
  }, [accessToken]);

  return [WishlistsItems, setWishlistsItems];
}
