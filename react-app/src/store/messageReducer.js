// constants
const GET_ALL_MESSAGES = "messages/GET_ALL_MESSAGES";
const GET_CUSTOMER_MESSAGES = "messages/GET_CUSTOMER_MESSAGES";
// const CREATE_ADMIN_MESSAGE = "messages/CREATE_ADMIN_MESSAGE";
// const CREATE_CUSTOMER_MESSAGE = "messages/CREATE_CUSTOMER_MESSAGE";
// const UPDATE_MESSAGE = "messages/UPDATE_MESSAGE";
// const DELETE_MESSAGE = "messages/DELETE_MESSAGE";

// ******************** Action Creators *************************************

const getAllMessagesActions = (messages) => ({
  type: GET_ALL_MESSAGES,
  payload: messages,
});

// ***************************

const getCustomerMessagesAction = (messages) => ({
  type: GET_CUSTOMER_MESSAGES,
  payload: messages,
});

// ***************************

// const createAdminMessageAction = (message) => ({
//   type: CREATE_ADMIN_MESSAGE,
//   payload: message,
// });

// // ***************************


// const createCustomerMessageAction = (message) => ({
//   type: CREATE_CUSTOMER_MESSAGE,
//   payload: message,
// });

// ***************************

// const updateMessageActions = (message) => ({
//   type: UPDATE_MESSAGE,
//   payload: message,
// });

// ***************************

// const deleteMessageActions = (message) => ({
//   type: DELETE_MESSAGE,
//   payload: message,
// });




// ******************** Thunk Creators *************************************



export const getAllMessagesThunk = () => async (dispatch) => {
  const response = await fetch("/api/messages", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllMessagesActions(data.Messages));
    return data;
  }
};

// ***************************

export const getCustomerMessagesThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/messages/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getCustomerMessagesAction(data));
    return data;
  } else {
    const err = await response.json();
    return err;
  }
};

// ***************************

export const createAdminMessageThunk = (customerId, message,) => async (dispatch) => {
    const response = await fetch(`/api/messages/users/${customerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(getCustomerMessagesThunk(customerId));
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************


export const createCustomerMessageThunk = (userId, message) => async (dispatch) => {
    const response = await fetch(`/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(getCustomerMessagesThunk(userId));
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************

// export const updateRecipeThunk =
//   (recipeId, title, ingredients, description, notes) => async (dispatch) => {
//     const response = await fetch(`/api/recipes/${recipeId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title,
//         ingredients,
//         description,
//         notes,
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       dispatch(updateRecipeActions(data));
//       return data;
//     } else {
//       const err = await response.json();
//       return err;
//     }
//   };

// ***************************

// export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
//   const response = await fetch(`/api/recipes/${recipeId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(getAllRecipesThunk());
//     return data;
//   } else {
//     const err = await response.json();
//     return err;
//   }
// };

// ***************************

// ***************** Reducer *************************************

const initialState = {};

export default function messageReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET_ALL_MESSAGES:
      // each number for the key is the customer id with all message sent 
      // between admin and customer
      const allUserMessages = action.payload;
      newState = {...allUserMessages}
      return newState;
    case GET_CUSTOMER_MESSAGES:
      const customerMessages = action.payload.Messages;
      customerMessages.forEach(message => {
        newState[message.id] = message;
      })
      return newState;
    // case CREATE_RECIPE:
    //   newState = { ...state };
    //   newState[action.payload.id] = action.payload;
    //   return newState;
    // case UPDATE_RECIPE:
    //   newState = { ...state };
    //   newState[action.payload.id] = action.payload;
    //   return newState;
    // case DELETE_RECIPE:
    //   newState = { ...state };
    //   delete newState[action.payload];
    //   return newState;
    default:
      return state;
  }
}
