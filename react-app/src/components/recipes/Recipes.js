import "./css/recipe.css"
import CreateRecipe from "./CreateRecipe";


function Recipes() {

    return(
        <div className="recipe-container">
            <h1>Recipe Logs</h1>
            <CreateRecipe />
        </div>
    )
}


export default Recipes;