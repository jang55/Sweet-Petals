import "./css/edit-recipe-card.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateRecipeThunk } from "../../store/recipeReducer";

function EditRecipeCard({ recipe, isLoaded, setShowEdit }) {
  const dispatch = useDispatch();
  // const [ingred, setIngred] = useState([]);
  // const [description, setDescription] = useState([]);
  
  // **************************************
  const [title, setTitle] = useState(recipe.title);
  const [backEndIngred, setBackEndIngred] = useState([]);
  const [frontEndIngred, setFrontEndIngred] = useState([]);
  const [currIngred, setCurrIngred] = useState("");
  const [description, setDescription] = useState("");
  const [backEndDescription, setBackEndDescription] = useState([]);
  const [frontEndDescription, setFrontEndDescription] = useState([]);
  const [notes, setNotes] = useState(recipe.notes);
  const [errors, setErrors] = useState({});

  // takes the result from the recipe and loops over it to make the right layout to send back
  // and forth to the backend
  useEffect(() => {
    let bIngredArr = [];
    const ingredSplit = recipe.ingredients.split("/");
    let bDescripArr = [];
    const descripSplit = recipe.description.split("/");

    for(let i = 0; i < ingredSplit.length; i++) {
      let ingred = ingredSplit[i];

      if(i === 0) {
        bIngredArr.push(ingred)
      } else {
        bIngredArr.push(`/${ingred}`)
      }
    }

    for(let i = 0; i < descripSplit.length; i++) {
      let descrip = descripSplit[i];

      if(i === 0) {
        bDescripArr.push(descrip);
      } else {
        bDescripArr.push(`/${descrip}`)
      }
    }

    setBackEndIngred(bIngredArr);
    setBackEndDescription(bDescripArr);
  }, [recipe])


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

    if (!currIngred.trim().match(/^[a-zA-Z0-9 .]+$/)) {
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
    setBackEndIngred([...ingredArr]);
  };

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
      newErrors["description"] =
        "*Directions needs to be atleast 4 characters long";
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
  

  // ********************************************

    // handles submission of the form
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      const newErrors = {};
  
      if (backEndDescription.length < 1) {
        newErrors["description"] = "*Directions is required";
      }
  
      if (backEndIngred.length < 1) {
        newErrors["ingred"] = "*Ingredients is required";
      }
  
      if (!title.match(/^[a-zA-Z .]+$/)) {
        newErrors["title"] = "*Title needs to be letters only";
      }

      if (title.trim() === "") {
        newErrors["title"] = "*Title is required";
      }
  
      if (Object.values(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
      const ingredStr = backEndIngred.join("");
      const descriptionStr = backEndDescription.join("");
      const note = notes ? (notes.trim().length < 1 ? null : notes.trim()) : null
  
      const updatedRecipe = await dispatch(
        updateRecipeThunk(recipe.id, title.trim(), ingredStr, descriptionStr, note)
      );
  
      if (updatedRecipe) {
        setTitle("");
        setCurrIngred("");
        setDescription("");
        setBackEndIngred([]);
        setFrontEndIngred([]);
        setBackEndDescription([]);
        setFrontEndDescription([]);
        setNotes("");
        setShowEdit("");
      }
    };


  return (
    isLoaded && (
      <>
      {/* ****** title position ******************** */}
        <legend className="edit-recipe-card-title">
          <label className="edit-recipe-title-label">
            Recipe Title:
            <input
              className="edit-recipe-title-input"
              type="text"
              value={title}
              maxLength={100}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          {errors && errors["title"] && (
            <p className="edit-recipe-title-error">{errors["title"]}</p>
          )}
        </legend>
        {/******* end title position************ */}



      {/* handle inputs for ingredients */}
        <div className="edit-recipe-card-ingred-wrap">
          <label className="edit-recipe-ingred-label">
            Ingredients:
            <input
              className="edit-recipe-ingred-input"
              type="text"
              value={currIngred}
              minLength={3}
              maxLength={25}
              onChange={(e) => setCurrIngred(e.target.value)}
            />
            <button
              type="button"
              className={`${backEndIngred.length >= 10 ? "edit-recipe-add-ingred-button-disabled" : "edit-recipe-add-ingred-button"}`}
              onClick={handleAddIngred}
              disabled={backEndIngred.length >= 10}
            >
              add
            </button>
          </label>
          {errors && errors["ingred"] && (
            <p className="edit-recipe-ingred-error">{errors["ingred"]}</p>
          )}
          {backEndIngred.length >= 10 && (
            <p className="edit-recipe-ingred-error">*Reached limit of 10 ingredients</p>
          )}
          <p className="edit-recipe-card-ingred-label">INGREDIENTS</p>
          {/* <ul className="edit-recipe-card-ingred"> */}
          <ul className="edit-recipe-ingred-list">
            {frontEndIngred.length >= 1 ?
              frontEndIngred.map((ingred, i) => (
                <li key={`${ingred}${i}`} className="edit-recipe-ingred-list-item">{ingred}</li>
              )) : <p className="edit-recipe-ingred-list-item">List is empty</p>}
          </ul>
          {backEndIngred.length > 0 && <p className="edit-recipe-remove-ingred" onClick={handleRemoveIngred}>Remove last item</p>}
        
        </div>
        
      {/* ends handling inputs for ingrdients */}


        <div className="edit-recipe-card-description-wrap">
            <label className="edit-recipe-description-label">
              Directions:
              <input
                className="edit-recipe-description-input"
                type="text"
                value={description}
                minLength={3}
                // maxLength={25}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                type="button"
                className={`${backEndDescription.length >= 10 ? "edit-recipe-add-description-button-disabled" : "edit-recipe-add-description-button"}`}
                onClick={handleAddDescription}
                disabled={backEndDescription.length >= 10}
              >
                add
              </button>
            </label>
            {errors && errors["description"] && (
              <p className="edit-recipe-description-error">{errors["description"]}</p>
            )}
            {backEndDescription.length >= 10 && (
              <p className="edit-recipe-description-error">*Reached limit of 10 directions</p>
            )}

          <p className="edit-recipe-card-description-label">DIRECTIONS</p>
          <ol className="edit-recipe-description-list" >
            {frontEndDescription.length >= 1 ?
              frontEndDescription.map((descrip, i) => (
                <li key={`${descrip}${i}`} className="edit-recipe-description-list-item">{descrip}</li>
              )) : <p className="edit-recipe-description-list-item">List is empty</p>}
          </ol>
          {backEndDescription.length > 0 && <p className="edit-recipe-remove-ingred" onClick={handleRemoveDescription}>Remove last item</p>}
        </div>


        <div className="edit-recipe-card-notes-wrap">
          <p className="edit-recipe-card-notes-label">NOTES</p>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="edit-recipe-notes"></textarea>
        </div>
        <p className="edit-recipe-card-delete" onClick={(e) => setShowEdit("")}>
          Cancel
        </p>
        <button className="edit-recipe-card-save-button" onClick={handleSubmit}>Save</button>
      </>
    )
  );
}

export default EditRecipeCard;
