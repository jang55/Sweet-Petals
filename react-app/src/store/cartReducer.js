// constants
const ADD_CUPCAKE = "cart/ADD_CUPCAKE";
const SUBTRACT_CUPCAKE = "cart/SUBTRACT_CUPCAKE";
const REMOVE_CUPCAKE = "cart/REMOVE_CUPCAKE";
const ADD_CHEESECAKE = "cart/ADD_CHEESECAKE";
const SUBTRACT_CHEESECAKE = "cart/SUBTRACT_CHEESECAKE";
const REMOVE_CHEESECAKE = "cart/REMOVE_CHEESECAKE";
const ADD_COOKIE = "cart/ADD_COOKIE";
const SUBTRACT_COOKIE = "cart/SUBTRACT_COOKIE";
const REMOVE_COOKIE = "cart/REMOVE_COOKIE";
const RESET_CART = "cart/RESET_CART";

// ******************** Action Creators *************************************

export const addCupcakeAction = (cupcake) => ({
  type: ADD_CUPCAKE,
  payload: cupcake,
});

// ***************************

export const subtractCupcakeAction = (cupcake) => ({
  type: SUBTRACT_CUPCAKE,
  payload: cupcake,
});

// ***************************

export const removeCupcakeAction = (cupcake) => ({
  type: REMOVE_CUPCAKE,
  payload: cupcake,
});

// ***************************

export const addCheesecakeAction = (cheesecake) => ({
  type: ADD_CHEESECAKE,
  payload: cheesecake,
});

// ***************************

export const subtractCheesecakeAction = (cheesecake) => ({
  type: SUBTRACT_CHEESECAKE,
  payload: cheesecake,
});

// ***************************

export const removeCheesecakeAction = (cheesecake) => ({
  type: REMOVE_CHEESECAKE,
  payload: cheesecake,
});

// ***************************

export const addCookieAction = (cookie) => ({
  type: ADD_COOKIE,
  payload: cookie,
});

// ***************************

export const subtractCookieAction = (cookie) => ({
  type: SUBTRACT_COOKIE,
  payload: cookie,
});

// ***************************

export const removeCookieAction = (cookie) => ({
  type: REMOVE_COOKIE,
  payload: cookie,
});

// ***************************

export const removeAllCartItems = () => ({
  type: RESET_CART,
});

// *****************************************************

function addCookie(allCookies, cookie) {
  if (cookie.flavor in allCookies) {
    allCookies[cookie.flavor].amount =
      allCookies[cookie.flavor].amount + 1;
  } else {
    allCookies[cookie.flavor] = cookie;
  }

  return allCookies;
}

function subtractCookie(allCookies, cookie) {
  if (cookie.flavor in allCookies) {
    allCookies[cookie.flavor].amount =
      allCookies[cookie.flavor].amount - 1;
  }

  return allCookies;
}

function addCheesecake(allCheesecakes, cheesecake) {
  if (cheesecake.id in allCheesecakes) {
    allCheesecakes[cheesecake.id].amount =
      allCheesecakes[cheesecake.id].amount + 1;
  } else {
    allCheesecakes[cheesecake.id] = cheesecake;
  }

  return allCheesecakes;
}

function subtractCheesecake(allCheesecakes, cheesecake) {
  if (cheesecake.id in allCheesecakes) {
    allCheesecakes[cheesecake.id].amount =
      allCheesecakes[cheesecake.id].amount - 1;
  }

  return allCheesecakes;
}

function addCupcake(allCupcakes, cupcake) {
  if (cupcake.id in allCupcakes) {
    allCupcakes[cupcake.id].amount =
      allCupcakes[cupcake.id].amount + 1;
  } else {
    allCupcakes[cupcake.id] = cupcake;
  }

  return allCupcakes;
}

function subtractCupcake(allCupcakes, cupcake) {
  if (cupcake.id in allCupcakes) {
    allCupcakes[cupcake.id].amount =
      allCupcakes[cupcake.id].amount - 1;
  }

  return allCupcakes;
}

// ***************** Reducer *************************************

const initialState = {
  cupcakes: {},
  cheesecakes: {},
  cookies: {},
};

export default function cartReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ADD_CUPCAKE:
      const add_cupcake = addCupcake(newState.cupcakes, action.payload)
      newState.cupcakes = add_cupcake;
      return newState;
    case ADD_CHEESECAKE:
      const add_cheesecake = addCheesecake(newState.cheesecakes, action.payload)
      newState.cheesecakes = add_cheesecake;
      return newState;
    case ADD_COOKIE:
      const add_cookies = addCookie(newState.cookies, action.payload)
      newState.cookies = add_cookies;
      return newState;
    case SUBTRACT_CUPCAKE:
      const subtract_cupcake = subtractCupcake(newState.cupcakes, action.payload)
      newState.cupcakes = subtract_cupcake;
      return newState;
    case SUBTRACT_CHEESECAKE:
      const subtract_cheesecake = subtractCheesecake(newState.cheesecakes, action.payload)
      newState.cheesecakes = subtract_cheesecake;
      return newState;
    case SUBTRACT_COOKIE:
      const subtract_cookies = subtractCookie(newState.cookies, action.payload)
      newState.cookies = subtract_cookies;
      return newState;
    case REMOVE_CUPCAKE:
      delete newState.cupcakes[action.payload.id];
      return newState;
    case REMOVE_CHEESECAKE:
      delete newState.cheesecakes[action.payload.id];
      return newState;
    case REMOVE_COOKIE:
      delete newState.cookies[action.payload.flavor];
      return newState;
    case RESET_CART:
      return initialState;
    default:
      return state;
  }
}
