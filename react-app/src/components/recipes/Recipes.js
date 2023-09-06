import "./css/recipe.css"
import CreateRecipe from "./CreateRecipe";
import { getAllRecipesThunk } from "../../store/recipeReducer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import EditRecipeCard from "./EditRecipeCard";



function Recipes() {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipeState);
    const user = useSelector((state) => state.session.user);
    const [recipes, setRecipes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showEdit, setShowEdit] = useState("");

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
        isLoaded && user && user.role === "admin" && <div className="recipe-container">
            <h1 className="recipe-h1">Recipe Page</h1>
            <CreateRecipe />
            <div className="recipe-wrapper">
                <h2 className="recipe-h2">Recipes List</h2>
                {recipes.length > 0 && reverseArray([...recipes]).map((recipe, i) => (
                    showEdit === recipe.id ? 
                    <fieldset key={`${recipe.id}${i}${recipe.title}`} className="edit-recipe-card-wrapper">
                        <EditRecipeCard recipe={recipe} isLoaded={isLoaded} setShowEdit={setShowEdit} />
                    </fieldset>
                    :       
                    <fieldset key={`${recipe.id}${i}${recipe.title}`} className="recipe-card-wrapper">
                        <RecipeCard recipe={recipe} isLoaded={isLoaded} setShowEdit={setShowEdit} />
                    </fieldset>
                ))}
            </div>
        </div>
    )
}


export default Recipes;