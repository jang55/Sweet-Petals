import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/navigation/Navigation";
import LandingPage from "./components/landing/LandingPage";
import CreateOrderForm from "./components/orders/CreateOrderForm";
import UsersOrders from "./components/orders/UsersOrders";
import AllOrders from "./components/orders/AllOrders";
import EditOrderDetails from "./components/orders/EditOrderDetails";
import AllUserReviews from "./components/reviews/AllUserReviews";
import CustomerReviews from "./components/reviews/CustomerReviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <LandingPage />
          </Route>
          <Route exact path="/orders" >
            <AllOrders />
          </Route>
          <Route path="/orders/users" >
            <UsersOrders />
          </Route>
          <Route path="/orders/new">
            <CreateOrderForm />
          </Route>
          <Route path="/orders/:orderId">
            <EditOrderDetails />
          </Route>
          <Route exact path="/reviews">
            <CustomerReviews/>
          </Route>
          <Route path="/reviews/users">
            <AllUserReviews/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
