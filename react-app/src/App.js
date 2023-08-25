import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/navigation/Navigation";
import LandingPage from "./components/landing/LandingPage";
import CreateOrderForm from "./components/orders/CreateOrderForm";
import UsersOrders from "./components/orders/UsersOrders";
import Modal from "./utils/Modal";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Modal /> */}
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <LandingPage />
          </Route>
          <Route path="/orders/users" >
            <UsersOrders />
          </Route>
          <Route path="/orders/new">
            <CreateOrderForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
