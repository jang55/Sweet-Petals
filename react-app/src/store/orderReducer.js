// constants
const GET_ALL_ORDERS = "orders/GET_ALL_ORDERS";
const GET_USER_ORDERS = "orders/GET_USER_ORDERS";
const GET_ORDER = "orders/GET_ORDER";

const CREATE_ORDER = "orders/CREATE_ORDER";
const CREATE_CUPCAKE_ORDER = "orders/CREATE_CUPCAKE_ORDER";
const CREATE_CHEESECAKE_ORDER = "orders/CREATE_CHEESECAKE_ORDER";
const CREATE_COOKIE_ORDER = "orders/CREATE_COOKIE_ORDER";

const UPDATE_ORDER = "orders/UPDATE_ORDER";
const UPDATE_CUPCAKE_ORDER = "orders/UPDATE_CUPCAKE_ORDER";
const UPDATE_CHEESECAKE_ORDER = "orders/UPDATE_CHEESECAKE_ORDER";
const UPDATE_COOKIE_ORDER = "orders/UPDATE_COOKIE_ORDER";

const DELETE_ORDER = "orders/DELETE_ORDER";
const DELETE_CUPCAKE_ORDER = "orders/DELETE_CUPCAKE_ORDER";
const DELETE_CHEESECAKE_ORDER = "orders/DELETE_CHEESECAKE_ORDER";
const DELETE_COOKIE_ORDER = "orders/DELETE_COOKIE_ORDER";

// ******************** Action Creators *************************************

const getAllOrdersActions = (orders) => ({
    type: GET_ALL_ORDERS,
    payload: orders,
});

// ***************************

const getAllUsersOrdersActions = (orders) => ({
    type: GET_USER_ORDERS,
    payload: orders,
});

// ***************************

const getOrderActions = (order) => ({
    type: GET_ORDER,
    payload: order,
});

// ***************************

const createOrderAction = (order) => ({
    type: CREATE_ORDER,
    payload: order,
});

// ***************************

const createCupcakeOrderAction = (cupakeOrder) => ({
    type: CREATE_CUPCAKE_ORDER,
    payload: cupakeOrder,
});

// ***************************

const createCeesecakeOrderAction = (cheesecakeOrder) => ({
    type: CREATE_CHEESECAKE_ORDER,
    payload: cheesecakeOrder,
});

// ***************************

const createCookieOrderAction = (cookieOrder) => ({
    type: CREATE_COOKIE_ORDER,
    payload: cookieOrder,
});

// // ***************************
// // ***************************
// // ***************************
// // ***************************

const updateOrderAction = (order) => ({
    type: UPDATE_ORDER,
    payload: order,
});

// ***************************

const updateCupcakeOrderAction = (cupakeOrder) => ({
    type: UPDATE_CUPCAKE_ORDER,
    payload: cupakeOrder,
});

// ***************************

const updateCeesecakeOrderAction = (cheesecakeOrder) => ({
    type: UPDATE_CHEESECAKE_ORDER,
    payload: cheesecakeOrder,
});

// ***************************

const updateCookieOrderAction = (cookieOrder) => ({
    type: UPDATE_COOKIE_ORDER,
    payload: cookieOrder,
});

// // ***************************
// // ***************************
// // ***************************
// // ***************************

const deleteOrderAction = (order) => ({
    type: DELETE_ORDER,
    payload: order,
});

// ***************************

const deleteCupcakeOrderAction = (cupakeOrder) => ({
    type: DELETE_CUPCAKE_ORDER,
    payload: cupakeOrder,
});

// ***************************

const deleteCeesecakeOrderAction = (cheesecakeOrder) => ({
    type: DELETE_CHEESECAKE_ORDER,
    payload: cheesecakeOrder,
});

// ***************************

const deleteCookieOrderAction = (cookieOrder) => ({
    type: DELETE_COOKIE_ORDER,
    payload: cookieOrder,
});






// // ******************** Thunk Creators *************************************

// // check to see if this is calling the right url path because of the following "/" at the end
// export const getAllReviewsThunk = () => async (dispatch) => {
//   const response = await fetch("/api/reviews/", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(getAllReviewsActions(data));
//     return data;
//   }
// };

// // ***************************

// export const getAllUserReviewsThunk = () => async (dispatch) => {
//   const response = await fetch("/api/users/reviews", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(getAllUsersReviewsActions(data.Reviews));
//     return data;
//   }
// };

// // ***************************

// export const getReviewThunk = (reviewId) => async (dispatch) => {
//   const response = await fetch(`/api/reviews/${reviewId}`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(getReviewActions(data));
//     return data;
//   } else {
//     const err = await response.json();
//     return err;
//   }
// };

// // ***************************

// export const createReviewThunk =
//   (orderId, review, stars) => async (dispatch) => {
//     const response = await fetch(`/api/orders/${orderId}/reviews`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         review,
//         stars,
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       dispatch(getAllReviewsThunk());
//       return data;
//     } else {
//       const err = await response.json();
//       return err;
//     }
//   };

// // ***************************

// export const updateReviewThunk =
//   (reviewId, review, stars) => async (dispatch) => {
//     const response = await fetch(`/api/reviews/${reviewId}`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         review,
//         stars,
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       dispatch(getAllReviewsThunk());
//       return data;
//     } else {
//       const err = await response.json();
//       return err;
//     }
//   };

// // ***************************

// export const deleteReviewThunk = (reviewId) => async (dispatch) => {
//   const response = await fetch(`/api/reviews/${reviewId}`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(getAllReviewsThunk());
//     return data;
//   } else {
//     const err = await response.json();
//     return err;
//   }
// };

// // ***************************

// // ***************** Reducer *************************************

// const initialState = {};

// export default function reviewReducer(state = initialState, action) {
//   const newState = {};
//   switch (action.type) {
//     case GET_ALL_REVIEWS:
//       const reviews = action.payload;
//       reviews.forEach((review) => {
//         newState[review.id] = review;
//       });
//       return newState;
//     case GET_USER_REVIEWS:
//       const userReviews = action.payload;
//       userReviews.forEach((review) => {
//         newState[review.id] = review;
//       });
//       return newState;
//     default:
//       return state;
//   }
// }
