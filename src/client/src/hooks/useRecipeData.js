import { useState, useEffect } from "react";
// import { useAuthToken } from "../AuthTokenContext";

export default function useRecipeData(e) {
    const [recipe, setRecipe] = useState([]);
    // const { accessToken } = useAuthToken();

    useEffect(() => {
        async function getTodosFromApi() {
            const data = await fetch(`${GET_USER_URL}/getRecipeInfo/${e}`);
            const recipe = await data.json();

            setsetRecipe(recipe);
        }

        if (1) {
            getTodosFromApi();
        }
    }, [e]);

    return [recipe, setRecipe];
}