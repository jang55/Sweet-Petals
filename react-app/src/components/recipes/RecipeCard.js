import "./css/recipe-card.css"
import { useState, useEffect } from "react";


function RecipeCard({ recipe }) {
    const [ingred, setIngred] = useState([]);

    useEffect(() => {
        if(recipe && recipe.ingredients) {
            const ingredArrSplit = recipe.ingredients.split("/");
            // sets the the array to be rendered to the frontend
            setIngred([...ingredArrSplit]);
        }
    }, [recipe])
    
    return(
        <>
            <legend className="recipe-card-title">{recipe.title}</legend>
            <p>Directions: <span>{recipe.description}</span></p>
        </>
    )
}

export default RecipeCard;