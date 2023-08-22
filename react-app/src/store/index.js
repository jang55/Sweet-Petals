import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import orderReducer from './orderReducer';
import reviewReducer from './reviewReducer';
import recipeReducer from './recipeReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  session,
  orderState: orderReducer,
  reviewState: reviewReducer,
  recipeState: recipeReducer,
  cartState: cartReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
