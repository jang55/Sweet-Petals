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
  const [errors, setErrors] = useState({});


  // sets the backend arr to be mapped out in the front
  useEffect(() => {
    if (backEndIngred.length >= 1) {
      // joined the arr together into 1 string
      const ingredArr = backEndIngred.join("");
      // split the string on the "/"
      const ingredArrSplit = ingredArr.split("/");
      // sets the the array to be rendered to the frontend
      setFrontEndIngred([...ingredArrSplit]);
      return;
    }

    setFrontEndIngred([]);
  }, [backEndIngred]);


  // handles adding ingrdients to the backend arr
  const handleAddIngred = (event) => {
    setErrors({});
    const newErrors = {};
    // handled adding into the array state whether first value or not
    if (currIngred.length <= 3) {
      newErrors["ingred"] = "*Ingredients needs to be between 4-25 chars only";
      setErrors(newErrors);
      return;
    }

    if (!currIngred.match(/^[a-zA-Z0-9]+$/)) {
      newErrors["ingred"] = "*Ingredients needs to be numbers or letters";
      setErrors(newErrors);
      return;
    }

    if (backEndIngred.length < 1) {
      setBackEndIngred([...backEndIngred, currIngred]);
    } else {
      setBackEndIngred([...backEndIngred, `/${currIngred}`]);
    }
    // resets the state to add a new value in
    setCurrIngred("");
  };


  // removes the last item in the backendArr
  const handleRemoveIngred = (event) => {
    const ingredArr = [...backEndIngred];
    console.log( ingredArr ,"in the remove handle")
    ingredArr.pop();
    setBackEndIngred([...ingredArr])
  }


  // handles submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (backEndIngred.length < 1) {
      newErrors["ingred"] = "*Ingredients are required";
    }

    if (!title.match(/^[a-zA-Z]+$/)) {
      newErrors["title"] = "*Title needs to be letters only";
    }

    if (Object.values(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const ingredStr = backEndIngred.join("");

    const newRecipe = dispatch(
      createRecipeThunk(title, ingredStr, description)
    );

    if (newRecipe) {
      setTitle("");
      setCurrIngred("");
      setDescription("");
      setBackEndIngred([]);
      setFrontEndIngred([]);
    }
  };

  return (
    <div className="create-recipe-container">
      <h2>Create a new Recipe</h2>
      <form className="c-recipe-wrapper" onSubmit={handleSubmit}>
        <label className="c-recipe-title-label">
          Recipe Title:
          <input
            className="c-recipe-title-input"
            type="text"
            value={title}
            maxLength={100}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        {errors && errors["title"] && (
          <p className="c-recipe-title-error">{errors["title"]}</p>
        )}
        <label className="c-recipe-ingred-label">
          Ingredients:
          <input
            className="c-recipe-ingred-input"
            type="text"
            value={currIngred}
            minLength={3}
            maxLength={25}
            onChange={(e) => setCurrIngred(e.target.value)}
          />
          <button
            type="button"
            className="c-recipe-add-ingred-button"
            onClick={handleAddIngred}
          >
            add
          </button>
        </label>
        {errors && errors["ingred"] && (
          <p className="c-recipe-ingred-error">{errors["ingred"]}</p>
        )}
        <label className="c-recipe-description-label">
          Directions:
          <textarea
            className="c-recipe-description-input"
            type="textarea"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </label>
        <div className="c-recipe-ingred-list-wrap">
          <h3 className="c-recipe-h3">Ingredients List</h3>
          <ul className="c-recipe-ingred-list">
            {frontEndIngred.length >= 1 &&
              frontEndIngred.map((ingred, i) => (
                <li key={`${ingred}${i}`} className="c-recipe-ingred-list-item">{ingred}</li>
              ))}
          </ul>
          {backEndIngred.length > 0 && <p className="c-recipe-remove-ingred" onClick={handleRemoveIngred}>Remove last item</p>}
        </div>
        <button className="c-recipe-submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
