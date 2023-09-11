import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/modalContext";
import { InfoProvider } from "./context/InfoContext";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import * as orderActions from "./store/orderReducer";
import * as reviewActions from "./store/reviewReducer";
import * as recipeActions from "./store/recipeReducer";
import * as cartActions from "./store/cartReducer";
import * as userActions from "./store/userReducer"
import * as messageActions from "./store/messageReducer"
import App from "./App";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
  window.orderActions = orderActions;
  window.reviewActions = reviewActions;
  window.recipeActions = recipeActions;
  window.cartActions = cartActions;
  window.userActions = userActions;
  window.messageActions = messageActions;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
    <InfoProvider>
      <ModalProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ModalProvider>
    </InfoProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
