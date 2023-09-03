import "./css/recipe.css"
import CreateRecipe from "./CreateRecipe";


function Recipes() {

    return(
        <div className="recipe-container">
            <h1>Recipes</h1>
            <CreateRecipe />
        </div>
    )
}


export default Recipes;