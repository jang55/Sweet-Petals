import "./css/recipe.css"
import CreateRecipe from "./CreateRecipe";
import { getAllRecipesThunk } from "../../store/recipeReducer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";



function Recipes() {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipeState);
    const [recipes, setRecipes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // sets the recipes as array of all the recipes
    useEffect(() => {
        setRecipes(Object.values(allRecipes));
    }, [allRecipes])

    // makes a call to get all the recipes
    useEffect(() => {
        dispatch(getAllRecipesThunk()).then(() => {
            setIsLoaded(true)
        })
    }, [dispatch])

      // helper function to reverse the array
    const reverseArray = (array) => {
        let reverseArray = array.reverse();
        return reverseArray;
    };

    return(
        <div className="recipe-container">
            <h1>Recipes</h1>
            <CreateRecipe />
            <div className="recipe-wrapper">
                <h2>My Recipes</h2>
                {recipes.length > 0 && reverseArray([...recipes]).map((recipe, i) => (
                    <div key={recipe.id} className="">
                        <RecipeCard recipe={recipe} />
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Recipes;