import "./css/create-recipe.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createRecipeThunk } from "../../store/recipeReducer";

function CreateRecipe() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [backEndIngred, setBackEndIngred] = useState([]);
  const [frontEndIngred, setFrontEndIngred] = useState([]);
  const [currIngred, setCurrIngred] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if(backEndIngred.length >= 1) {
      // joined the arr together into 1 string
      const ingredArr = backEndIngred.join("");
      // split the string on the "/"
      const ingredArrSplit = ingredArr.split("/");
      // sets the the array to be rendered to the frontend
      setFrontEndIngred([...ingredArrSplit]);
    }

  }, [backEndIngred])

  const handleAddIngred = () => {
    // handled adding into the array state whether first value or not
    if(backEndIngred.length < 1) {
      setBackEndIngred([...backEndIngred, currIngred]);
    } else {
      setBackEndIngred([...backEndIngred, `/${currIngred}`]);
    }
    // resets the state to add a new value in
    setCurrIngred("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredStr = backEndIngred.join("");

    dispatch(createRecipeThunk(title, ingredStr, description));

  };

  // console.log(backEndIngred, "back");
  // console.log(frontEndIngred, "front");

  return (
    <div className="create-recipe-container">
      <h2>Create a new Recipe</h2>
      <form className="c-recipe-wrapper" onSubmit={handleSubmit}>
        <label className="c-recipe-title-label">
          Recipe Title
          <input
            className="c-recipe-title-input"
            type="text"
            value={title}
            max={100}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="c-recipe-ingred-label">
          Ingredients
          <input
            className="c-recipe-ingred-input"
            type="text"
            value={currIngred}
            min={3}
            onChange={(e) => setCurrIngred(e.target.value)}
          />
          <button type="button" className="c-recipe-add-ingred-button" onClick={handleAddIngred}>add</button>
        </label>
        <label className="c-recipe-description-label">
          Directions
          <textarea
            className="c-recipe-description-input"
            type="textarea"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>
        <div className="c-recipe-ingred-list">
          <h3>Ingredients List</h3>
        </div>
        <button className="c-recipe-submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
