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
  const [backEndDescription, setBackEndDescription] = useState([]);
  const [frontEndDescription, setFrontEndDescription] = useState([]);
  const [notes, setNotes] = useState("");
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
    if (currIngred.trim().length <= 3) {
      newErrors["ingred"] = "*Ingredients needs to be between 4-25 chars only";
      setErrors(newErrors);
      return;
    }

    if (!currIngred.trim().match(/^[a-zA-Z0-9 ]+$/)) {
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
    ingredArr.pop();
    setBackEndIngred([...ingredArr])
  }


  // *************************************************************************
  
    // sets the backend arr to be mapped out in the front
    useEffect(() => {
      if (backEndDescription.length >= 1) {
        // joined the arr together into 1 string
        const descriptionArr = backEndDescription.join("");
        // split the string on the "/"
        const descriptionArrSplit = descriptionArr.split("/");
        // sets the the array to be rendered to the frontend
        setFrontEndDescription([...descriptionArrSplit]);
        return;
      }
  
      setFrontEndDescription([]);
    }, [backEndDescription]);
  
  
    // handles adding ingrdients to the backend arr
    const handleAddDescription = (event) => {
      setErrors({});
      const newErrors = {};
      // handled adding into the array state whether first value or not
      if (description.trim().length <= 3) {
        newErrors["description"] = "*Directions needs to be atleast 4 characters long";
        setErrors(newErrors);
        return;
      }
  
      if (!description.trim().match(/^[a-zA-Z0-9 .]+$/)) {
        newErrors["description"] = "*Directions needs to be numbers or letters";
        setErrors(newErrors);
        return;
      }
  
      if (backEndDescription.length < 1) {
        setBackEndDescription([...backEndDescription, description]);
      } else {
        setBackEndDescription([...backEndDescription, `/${description}`]);
      }
      // resets the state to add a new value in
      setDescription("");
    };
  
  
    // removes the last item in the backendArr
    const handleRemoveDescription = (event) => {
      const descriptionArr = [...backEndDescription];
      descriptionArr.pop();
      setBackEndDescription([...descriptionArr])
    }







  // *************************************************************************


  // handles submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (backEndDescription.length < 1) {
      newErrors["description"] = "*Directions are required";
    }

    if (backEndIngred.length < 1) {
      newErrors["ingred"] = "*Ingredients are required";
    }

    if (!title.match(/^[a-zA-Z .]+$/)) {
      newErrors["title"] = "*Title needs to be letters only";
    }

    if (Object.values(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const ingredStr = backEndIngred.join("");
    const descriptionStr = backEndDescription.join("");


    const newRecipe = dispatch(
      createRecipeThunk(title.trim(), ingredStr, descriptionStr, notes.trim().length < 1 ? null : notes.trim())
    );

    if (newRecipe) {
      setTitle("");
      setCurrIngred("");
      setDescription("");
      setBackEndIngred([]);
      setFrontEndIngred([]);
      setBackEndDescription([]);
      setFrontEndDescription([]);
      setNotes("");
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
        {/* handle inputs for ingredients */}
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
            className={`${backEndIngred.length >= 10 ? "c-recipe-add-ingred-button-disabled" : "c-recipe-add-ingred-button"}`}
            onClick={handleAddIngred}
            disabled={backEndIngred.length >= 10}
          >
            add
          </button>
        </label>
        {errors && errors["ingred"] && (
          <p className="c-recipe-ingred-error">{errors["ingred"]}</p>
        )}
        {backEndIngred.length >= 10 && (
          <p className="c-recipe-ingred-error">*Reached limit of 10 ingredients</p>
        )}
        {/* ends handling inputs for ingrdients */}





        {/* handles inputs for directions */}
        <label className="c-recipe-description-label">
          Directions:
          <input
            className="c-recipe-description-input"
            type="text"
            value={description}
            minLength={3}
            // maxLength={25}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="button"
            className={`${backEndDescription.length >= 10 ? "c-recipe-add-description-button-disabled" : "c-recipe-add-description-button"}`}
            onClick={handleAddDescription}
            disabled={backEndDescription.length >= 10}
          >
            add
          </button>
        </label>
        {errors && errors["description"] && (
          <p className="c-recipe-description-error">{errors["description"]}</p>
        )}
        {backEndDescription.length >= 10 && (
          <p className="c-recipe-description-error">*Reached limit of 10 directions</p>
        )}
        {/* ends handling inputs for directions */}


        {/* handles the notes part */}
          <label className="c-recipe-notes-label">
            Notes: 
            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="c-recipe-notes"></textarea>
          </label>
        {/* ends handles the notes part */}
        <div className="c-recipe-ingred-list-wrap">
          <h3 className="c-recipe-h3">Ingredients List</h3>
          <ul className="c-recipe-ingred-list">
            {frontEndIngred.length >= 1 ?
              frontEndIngred.map((ingred, i) => (
                <li key={`${ingred}${i}`} className="c-recipe-ingred-list-item">{ingred}</li>
              )) : <p className="c-recipe-ingred-list-item">List is empty</p>}
          </ul>
          {backEndIngred.length > 0 && <p className="c-recipe-remove-ingred" onClick={handleRemoveIngred}>Remove last item</p>}
        </div>
        <div className="c-recipe-description-list-wrap">
          <h3 className="c-recipe-h3">Directions List</h3>
          <ol className="c-recipe-description-list">
            {frontEndDescription.length >= 1 ?
              frontEndDescription.map((descrip, i) => (
                <li key={`${descrip}${i}`} className="c-recipe-description-list-item">{descrip}</li>
              )) : <p className="c-recipe-description-list-item">List is empty</p>}
          </ol>
          {backEndDescription.length > 0 && <p className="c-recipe-remove-ingred" onClick={handleRemoveDescription}>Remove last item</p>}
        </div>
        <button className="c-recipe-submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
