import "./css/recipe-card.css"
import { useState, useEffect } from "react";


function RecipeCard({ recipe, isLoaded, setShowEdit }) {
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
            <legend className="recipe-card-title">{recipe.title.toUpperCase()}</legend>
            <div className="recipe-card-ingred-wrap">
                <p className="recipe-card-ingred-label">INGREDIENTS</p>
                <ul className="recipe-card-ingred">
                    {ingred.map((ingred, i) => (
                        <li className="recipe-card-ingred-items" key={`${ingred}${i}`}>{ingred}</li>
                    ))}
                </ul>
            </div>
            <div className="recipe-card-description-wrap">
                <p className="recipe-card-description-label">DIRECTIONS</p>
                <ol className="recipe-card-description">
                    {description.map((descrip, i) => (
                        <li className="recipe-card-description-item" key={`${descrip}${i}`}>{descrip}</li>
                    ))}
                </ol>
            </div>
            <div className="recipe-card-notes-wrap">
                <p className="recipe-card-notes-label">NOTES</p>
                {recipe.notes ? <p className="recipe-card-notes">{recipe.notes}</p> : <p className="recipe-card-notes">You have no notes listed.</p>}
            </div>
            <p className="recipe-card-delete">Delete</p>
            <p className="recipe-card-edit" onClick={e => setShowEdit(recipe.id)} >Edit</p>
        </>
    )
}

export default RecipeCard;