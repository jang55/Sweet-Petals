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

// const updateReviewActions = (review) => ({
//   type: UPDATE_REVIEW,
//   payload: review,
// });

// // ***************************

// const deleteReviewActions = (review) => ({
//   type: DELETE_REVIEW,
//   payload: review,
// });

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
    dispatch(getAllReviewsActions(data.Reviews));
    return data;
  } else {
    const err = await response.json();
    return err;
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
      method: "POST",
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
      dispatch(createReviewAction(data));
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
      method: "PUT",
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
      dispatch(getAllUserReviewsThunk());
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************

export const deleteReviewThunk = (reviewId, pageType) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    if (pageType === "Customer-Reviews") {
      dispatch(getAllReviewsThunk());
    } else {
      dispatch(getAllUserReviewsThunk());
    }
    return data;
  } else {
    const err = await response.json();
    return err;
  }
};

// ***************************

export const uploadReviewImageThunk =
  (reviewId, image) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}/image`, {
      method: "PUT",
      body: image,
    });

    if (res.ok) {
      const updatedReview = await res.json();
      await dispatch(getAllUserReviewsThunk());
      return updatedReview;
    } else {
      const error = await res.json();
      return error;
    }
  };

export const removeReviewImageThunk = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}/image/remove`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(getAllUserReviewsThunk());
    return data;
  }
};




// ***************** Reducer *************************************

const initialState = {};

export default function reviewReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET_ALL_REVIEWS:
      const reviews = action.payload;
      reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case GET_USER_REVIEWS:
      const userReviews = action.payload;
      userReviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case CREATE_REVIEW:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_REVIEW:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_REVIEW:
      newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
}
