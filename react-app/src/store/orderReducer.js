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

const deleteCheesecakeOrderAction = (cheesecakeOrder) => ({
  type: DELETE_CHEESECAKE_ORDER,
  payload: cheesecakeOrder,
});

// ***************************

const deleteCookieOrderAction = (cookieOrder) => ({
  type: DELETE_COOKIE_ORDER,
  payload: cookieOrder,
});

// ******************** Thunk Creators *************************************
// get all the orders

export const getAllOrdersThunk = () => async (dispatch) => {
  const response = await fetch("/api/orders", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllOrdersActions(data));
    return data;
  }
};

// ***************************

export const getAllUserOrdersThunk = () => async (dispatch) => {
  const response = await fetch("/api/users/orders", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllUsersOrdersActions(data.Orders));
    return data;
  }
};

// ***************************

export const getOrderThunk = (orderId) => async (dispatch) => {
  const response = await fetch(`/api/orders/${orderId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getOrderActions(data));
    return data;
  } else {
    const err = await response.json();
    return err;
  }
};






// ***************************
// create the orders

export const createOrderThunk = (pick_up_time) => async (dispatch) => {
  const response = await fetch(`/api/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pick_up_time,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    // dispatch(getAllUserOrdersThunk());
    return data;
  } else {
    const err = await response.json();
    return err;
  }
};

// ***************************

export const createCupcakeOrderThunk =
  (orderId, color_one, color_two, color_three, style, flavor, amount) =>
  async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}/cupcakes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        color_one,
        color_two,
        color_three,
        style,
        flavor,
        amount,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // dispatch(getAllUserOrdersThunk());
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************

export const createCheesecakesOrderThunk =
  (orderId, flavor, strawberries, amount) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}/cheesecakes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flavor,
        strawberries,
        amount,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // dispatch(getAllUserOrdersThunk());
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************

export const createCookiesOrderThunk =
  (orderId, flavor, amount) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}/cookies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flavor,
        amount,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // dispatch(getAllUserOrdersThunk());
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };








// ***************************
// update the orders

export const updateOrderThunk = (pick_up_time) => async (dispatch) => {
  const response = await fetch(`/api/orders/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pick_up_time,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getOrderThunk(data.id));
    return data;
  } else {
    const err = await response.json();
    return err;
  }
};

// ***************************

export const updateCupcakeOrderThunk =
  (orderId, cupcakeId, color_one, color_two, color_three, style, flavor, amount) =>
  async (dispatch) => {
    const response = await fetch(
      `/api/orders/${orderId}/cupcakes/${cupcakeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color_one,
          color_two,
          color_three,
          style,
          flavor,
          amount,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(getOrderThunk(data.order_id));
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************

export const updateCheesecakesOrderThunk =
  (orderId, cheesecakeId, flavor, strawberries, amount) => async (dispatch) => {
    const response = await fetch(
      `/api/orders/${orderId}/cheesecakes/${cheesecakeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flavor,
          strawberries,
          amount,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(getOrderThunk(data.order_id));
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************

export const updateCookiesOrderThunk =
  (orderId, cookieId, flavor, amount) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}/cookies/${cookieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flavor,
        amount
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(getOrderThunk(data.order_id));
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************
// delete orders thunks

export const deleteOrderThunk = (orderId) => async (dispatch) => {
  const response = await fetch(`/api/orders/${orderId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteOrderAction(data));
    return data;
  } else {
    const err = await response.json();
    return err;
  }
};

// ***************************

export const deleteCupcakeOrderThunk =
  (orderId, cupcakeId) => async (dispatch) => {
    const response = await fetch(
      `/api/orders/${orderId}/cupcakes/${cupcakeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(getOrderThunk(orderId));
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************

export const deleteCheesecakesOrderThunk =
  (orderId, cheesecakeId) => async (dispatch) => {
    const response = await fetch(
      `/api/orders/${orderId}/cheesecakes/${cheesecakeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(getOrderThunk(orderId));
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };

// ***************************

export const deleteCookiesOrderThunk =
  (orderId, cookieId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}/cookies/${cookieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(getOrderThunk(orderId));
      return data;
    } else {
      const err = await response.json();
      return err;
    }
  };



//***************** Reducer *************************************

const initialState = {};

export default function orderReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET_ALL_ORDERS:
      const orders = action.payload;
      orders.forEach((order) => {
        newState[order.id] = order;
      });
      return newState;
    case GET_USER_ORDERS:
      const userOrders = action.payload;
      userOrders.forEach((order) => {
        newState[order.id] = order;
      });
      return newState;
    case GET_ORDER:
      newState[action.payload.id] = action.payload;
      return newState;      
    case UPDATE_ORDER:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_ORDER:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
