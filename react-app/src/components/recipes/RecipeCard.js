import "./css/recipe-card.css"
import { useState, useEffect } from "react";


function RecipeCard({ recipe, isLoaded }) {
    const [ingred, setIngred] = useState([]);
    const[description, setDescription] = useState([]);

    useEffect(() => {
        if(recipe && recipe.ingredients) {
            const ingredArrSplit = recipe.ingredients.split("/");
            // sets the the array to be rendered to the frontend
            setIngred([...ingredArrSplit]);
        }

        if(recipe && recipe.description) {
            const descripArrSplit = recipe.description.split("/");
            // sets the the array to be rendered to the frontend
            setDescription([...descripArrSplit]);
        }
    }, [recipe])
    
    return(
        isLoaded && <>
            <legend className="recipe-card-title">{recipe.title}</legend>
            <div>
                <p>INGREDIENTS</p>
                <ul>
                    {ingred.map(ingred => (
                        <li key={`${ingred}`}>{ingred}</li>
                    ))}
                </ul>
            </div>
            <div>
                <p>DIRECTIONS</p>
                <ol>
                    {description.map(descrip => (
                        <li key={`${descrip}`}>{descrip}</li>
                    ))}
                </ol>
            </div>
        </>
    )
}

export default RecipeCard;