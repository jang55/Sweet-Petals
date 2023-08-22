// constants
const ADD_CUPCAKE = "cart/ADD_CUPCAKE"
const REMOVE_CUPCAKE = "cart/REMOVE_CUPCAKE"
const ADD_CHEESECAKE = "cart/ADD_CHEESECAKE"
const REMOVE_CHEESECAKE = "cart/REMOVE_CHEESECAKE"
const ADD_COOKIE = "cart/ADD_COOKIE"
const REMOVE_COOKIE = "cart/REMOVE_COOKIE"
const RESET_CART = "cart/RESET_CART"


// ******************** Action Creators *************************************

export const addCupcakeAction = (cupcake) => ({
    type: ADD_CUPCAKE,
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

export const removeCheesecakeAction = (cheesecake) => ({
    type: REMOVE_CHEESECAKE,
    payload: cheesecake,
});

// ***************************

// export const addCookieAction = (cookie) => ({
//     type: ADD_COOKIE,
//     payload: cookie,
// });
export const addCookieAction = (cookie) => {
    console.log("hit action")
    return {
        type: ADD_COOKIE,
        payload: cookie,
    }
} ;

// ***************************

export const removeCookieAction = (cookie) => ({
    type: REMOVE_COOKIE,
    payload: cookie,
});

// ***************************

export const removeAllCartItems = () => ({
    type: RESET_CART,

});

// ***************************





// ***************** Reducer *************************************

const initialState = {
    cupcakes: {},
    cheesecakes: {},
    cookies: {}
};

export default function cartReducer(state = initialState, action) {
    let newState = { ...state };
    console.log("in reducer")
    switch (action.type) {
        case ADD_CUPCAKE:
            newState.cupcakes[action.payload.id] = action.payload;
            return newState;
        case ADD_CHEESECAKE:
            newState.cheesecakes[action.payload.id] = action.payload;
            return newState;
        case ADD_COOKIE:
            console.log("hit reducer")
            newState.cookies[action.payload.id] = action.payload;
            return newState;
        case REMOVE_CUPCAKE:
            delete newState.cupcakes[action.payload.id]
            return newState
        case REMOVE_CHEESECAKE:
            delete newState.cheesecakes[action.payload.id]
            return newState
        case REMOVE_COOKIE:
            delete newState.cookies[action.payload.id]
            return newState
        case RESET_CART:
            return initialState;
        default:
        return state;
    }
}
