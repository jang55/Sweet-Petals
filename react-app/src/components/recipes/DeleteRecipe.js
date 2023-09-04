import { deleteRecipeThunk } from "../../store/recipeReducer";
import { useDispatch } from "react-redux";
import "./css/delete-recipe.css"

function DeleteRecipe({ recipe, setShowModal }) {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteRecipeThunk(recipe.id))
        setShowModal(false)
    }

    return(
        <div className="delete-recipe-container">
            <h1 className="delete-recipe-h1">
                Are you you want to remove the recipe "<span className="delete-recipe-title">{recipe.title.toUpperCase()}</span>" from the list?
            </h1>
            <span className="delete-recipe-warning-message">
                Pressing confirm will permanently delete this recipe.
            </span>
            <div className="delete-recipe-buttons-wrap">
                <button className="delete-recipe-close-button delete-recipe-button" onClick={e => setShowModal(false)} >Close</button>
                <button className="delete-recipe-confirm-button delete-recipe-button" onClick={handleDelete} >Confirm</button>
            </div>
        </div>
    )
}


export default DeleteRecipe;