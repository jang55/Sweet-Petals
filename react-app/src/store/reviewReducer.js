// constants
const GET_ALL_REVIEWS = "reviews/GET_ALL_REVIEWS";
const GET_USER_REVIEWS = "reviews/GET_USER_REVIEWS";
const GET_REVIEW = "reviews/GET_REVIEW";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// ******************** Action Creators *************************************

const getAllReviewsActions = (reviews) => ({
  type: GET_ALL_REVIEWS,
  payload: reviews,
});

// ***************************

const getAllUsersReviewsActions = (reviews) => ({
  type: GET_USER_REVIEWS,
  payload: reviews,
});

// ***************************

const getReviewActions = (review) => ({
  type: GET_REVIEW,
  payload: review,
});

// ***************************

const createReviewAction = (review) => ({
  type: CREATE_REVIEW,
  payload: review,
});

// ***************************

const updateReviewActions = (review) => ({
  type: UPDATE_REVIEW,
  payload: review,
});

// ***************************

const deleteReviewActions = (review) => ({
  type: UPDATE_REVIEW,
  payload: review,
});

// ******************** Thunk Creators *************************************

export const getAllReviewsThunk = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

// ***************************

// ***************************

// ***************************

// ***************** Reducer *************************************

const initialState = {};

export default function reviewReducer(state = initialState, action) {
  const newState = {};
  switch (action.type) {
    // case SET_USER:
    //   return { user: action.payload };
    // case REMOVE_USER:
    //   return { user: null };
    default:
      return state;
  }
}
