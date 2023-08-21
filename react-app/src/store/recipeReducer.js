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
export const getAllReviewsThunk = () => async (dispatch) => {
  const response = await fetch("/api/reviews/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllReviewsActions(data));
    return data;
  }
};

// ***************************

export const getAllUserReviewsThunk = () => async (dispatch) => {
  const response = await fetch("/api/users/reviews", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllUsersReviewsActions(data.Reviews));
    return data;
  }
};

// ***************************

export const getReviewThunk = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getReviewActions(data));
    return data;
  } else {
    const err = await response.json();
    return err;
  }
};

// ***************************

export const createReviewThunk =
  (orderId, review, stars) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}/reviews`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review,
        stars,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(getAllReviewsThunk());
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************

export const updateReviewThunk =
  (reviewId, review, stars) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review,
        stars,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(getAllReviewsThunk());
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllReviewsThunk());
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
  const newState = {};
  switch (action.type) {
    // case GET_ALL_REVIEWS:
    //   const reviews = action.payload;
    //   reviews.forEach((review) => {
    //     newState[review.id] = review;
    //   });
    //   return newState;
    // case GET_USER_REVIEWS:
    //   const userReviews = action.payload;
    //   userReviews.forEach((review) => {
    //     newState[review.id] = review;
    //   });
    //   return newState;
    default:
      return state;
  }
}
