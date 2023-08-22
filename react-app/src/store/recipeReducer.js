// constants
const GET_ALL_RECIPES = "recipes/GET_ALL_RECIPES";
const GET_RECIPE = "recipes/GET_RECIPE";
const CREATE_RECIPE = "recipes/CREATE_RECIPE";
const UPDATE_RECIPE = "recipes/UPDATE_RECIPE";
const DELETE_RECIPE = "recipes/DELETE_RECIPE";

// ******************** Action Creators *************************************

const getAllRecipesActions = (recipes) => ({
  type: GET_ALL_RECIPES,
  payload: recipes,
});

// ***************************

const getRecipeActions = (recipe) => ({
  type: GET_RECIPE,
  payload: recipe,
});

// ***************************

const createRecipeAction = (recipe) => ({
  type: CREATE_RECIPE,
  payload: recipe,
});

// ***************************

const updateRecipeActions = (recipe) => ({
  type: UPDATE_RECIPE,
  payload: recipe,
});

// ***************************

const deleteRecipeActions = (recipe) => ({
  type: DELETE_RECIPE,
  payload: recipe,
});

// ******************** Thunk Creators *************************************

// check to see if this is calling the right url path because of the following "/" at the end
export const getAllRecipesThunk = () => async (dispatch) => {
  const response = await fetch("/api/recipes/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllRecipesActions(data.Recipes));
    return data;
  }
};

// ***************************

export const getRecipeThunk = (recipeId) => async (dispatch) => {
  const response = await fetch(`/api/recipes/${recipeId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getRecipeActions(data));
    return data;
  } else {
    const err = await response.json();
    return err;
  }
};

// ***************************

export const createRecipeThunk =
  (title, ingredients, description) => async (dispatch) => {
    const response = await fetch(`/api/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        ingredients,
        description,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(createRecipeAction(data));
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************

export const updateRecipeThunk =
  (recipeId, title, ingredients, description) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`, {
      method: "UPDATE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        ingredients,
        description,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateRecipeActions(data));
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************

export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
  const response = await fetch(`/api/recipes/${recipeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteRecipeActions(data));
    return data;
  } else {
    const err = await response.json();
    return err;
  }
};

// ***************************

// ***************** Reducer *************************************

const initialState = {};

export default function recipeReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET_ALL_RECIPES:
      const recipes = action.payload;
      recipes.forEach((recipe) => {
        newState[recipe.id] = recipe;
      });
      return newState;
    case GET_RECIPE:
      newState[action.payload.id] = action.payload;
      return newState;
    case CREATE_RECIPE:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_RECIPE:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_RECIPE:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
