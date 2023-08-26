import "./css/edit-order.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderThunk } from "../../store/orderReducer";
import EditCheesecake from "./edit-orders/EditCheesecake";
import EditCookie from "./edit-orders/EditCookie";
import EditCupcake from "./edit-orders/EditCupcake";

function EditOrderDetails() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cupcakes, setCupcakes] = useState([]);
  const [cheesecakes, setCheesecakes] = useState([]);
  const [cookies, setCookies] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    dispatch(getOrderThunk(orderId)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, orderId]);

  // sets all the dessert items into an array
  useEffect(() => {
    if (order && order.Cupcakes) {
      setCupcakes(order.Cupcakes);
    }

    if (order && order.Cheesecakes) {
      setCheesecakes(order.Cheesecakes);
    }

    if (order && order.Cookies) {
      setCookies(order.Cookies);
    }
  }, [order]);

  // sets the amount of items and subtotal price
  useEffect(() => {
    let totalPrice = 0;

    if (cupcakes && cupcakes.length > 0) {
      cupcakes.forEach((cupcake) => {
        totalPrice += cupcake.amount * 30;
      });
    }

    if (cheesecakes && cheesecakes.length > 0) {
      cheesecakes.forEach((cheesecake) => {
        if (cheesecake.strawberries) {
          totalPrice += cheesecake.amount * 20;
        } else {
          totalPrice += cheesecake.amount * 18;
        }
      });
    }

    if (cookies && cookies.length > 0) {
      cookies.forEach((cookie) => {
        totalPrice += cookie.amount * 10;
      });
    }
    setSubTotal(totalPrice);
  }, [cupcakes, cheesecakes, cookies]);

  return (
    isLoaded && (
      <div className="edit-order-container">
        <h1>Change your orders</h1>
        <div className="edit-order-wrapper">
          {cupcakes && cupcakes.length > 0 && (
            <>
              <p className="cart-cupcake-title">Cupcakes</p>
              {cupcakes.map((cupcake, i) => (
                <div key={`${cupcake.id}${i}`} className="cart-cupcake-wrapper">
                  <EditCupcake cupcake={cupcake} />
                </div>
              ))}
            </>
          )}
          {cheesecakes && cheesecakes.length > 0 && (
            <EditCheesecake cheesecakes={cheesecakes} />
          )}
          {cookies && cookies.length > 0 && <EditCookie cookies={cookies} />}
          <p className="order-subtotal">
            Subtotal: <span className="order-info-text">${subTotal}.00</span>
          </p>
        </div>
      </div>
    )
  );
}

export default EditOrderDetails;
