import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import HandleMultipleItems from "./HandleMultipleItems";
import "./shopping-cart.css";
import {
  removeCheesecakeAction,
  removeCookieAction,
  removeCupcakeAction,
} from "../../store/cartReducer";
import { InfoContext } from "../../context/InfoContext";
import * as orderActions from "../../store/orderReducer";

function ShoppingCart() {
  const cart = useSelector((state) => state.cartState);
  const [cupcakes, setCupcakes] = useState([]);
  const [cheesecakes, setCheesecakes] = useState([]);
  const [cookies, setCookies] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const dispatch = useDispatch();
  const { setCartCount } = useContext(InfoContext);

  // sets all the dessert items into an array
  useEffect(() => {
    if (cart && cart.cupcakes) {
      setCupcakes(Object.values(cart.cupcakes));
    }

    if (cart && cart.cheesecakes) {
      setCheesecakes(Object.values(cart.cheesecakes));
    }

    if (cart && cart.cookies) {
      setCookies(Object.values(cart.cookies));
    }
  }, [cart]);

  // sets the amount of items and subtotal price
  useEffect(() => {
    let totalItems = 0;
    let totalPrice = 0;

    if (cupcakes && cupcakes.length > 0) {
      cupcakes.forEach((cupcake) => {
        totalItems += cupcake.amount;
        totalPrice += cupcake.amount * 30;
      });
    }

    if (cheesecakes && cheesecakes.length > 0) {
      cheesecakes.forEach((cheesecake) => {
        totalItems += cheesecake.amount;

        if (cheesecake.strawberries) {
          totalPrice += cheesecake.amount * 20;
        } else {
          totalPrice += cheesecake.amount * 18;
        }
      });
    }

    if (cookies && cookies.length > 0) {
      cookies.forEach((cookie) => {
        totalItems += cookie.amount;
        totalPrice += cookie.amount * 10;
      });
    }
    setCartCount(totalItems);
    setSubTotal(totalPrice);
  }, [cupcakes, cheesecakes, cookies]);

  // handles removing items in cart with one click
  const handleRemove = (e, dessert) => {
    e.preventDefault();

    if (dessert.type === "cupcake") {
      dispatch(removeCupcakeAction(dessert));
    } else if (dessert.type === "cheesecake") {
      dispatch(removeCheesecakeAction(dessert));
    } else if (dessert.type === "cookie") {
      dispatch(removeCookieAction(dessert));
    }

    return;
  };

  // const handleCreatingOrders = async (e) => {
  //   e.preventDefault();

  //   const newOrder = await dispatch(orderActions)

  //   if (cupcakes.length > 0) {
  //     await cupcakes.forEach( async (cupcake) => {
  //       await dispatch(orderActions.createCupcakeOrderThunk())
  //     })
  //   }

  // }

  return (
    <div className="cart-container">
      <h3 className="cart-h3">Shopping Cart</h3>
      {!cupcakes.length && !cheesecakes.length && !cookies.length ? (
        <p className="cart-empty-message">Your cart is empty</p>
      ) : (
        <div className="cart-items-wrap">
          {cupcakes && cupcakes.length > 0 && (
            <div>
              <p className="cart-cupcake-title">Cupcakes</p>
              {cupcakes.map((cupcake) => {
                return (
                  <div key={cupcake.id} className="cart-cupcake-wrapper">
                    <p className="cart-cupcake-flavor">
                      Flavor: {cupcake.flavor}
                    </p>
                    <p className="cart-cupcake-style">Style: {cupcake.style}</p>
                    <span className="cart-cupcake-color-wrap">
                      <div
                        className="cart-cupcake-colors"
                        style={{
                          background: cupcake.color_one,
                        }}
                      ></div>
                      {cupcake.color_two && (
                        <div
                          className="cart-cupcake-colors"
                          style={{
                            background: cupcake.color_two,
                          }}
                        ></div>
                      )}
                      {cupcake.color_three && (
                        <div
                          className="cart-cupcake-colors"
                          style={{
                            background: cupcake.color_three,
                          }}
                        ></div>
                      )}
                    </span>
                    <HandleMultipleItems dessert={cupcake} />
                    <span className="cart-cupcake-price">
                      <span className="cart-dollar-sign">$</span>
                      {cupcake.amount * 30}.00
                    </span>
                    <span
                      className="cart-remove"
                      onClick={(e) => handleRemove(e, cupcake)}
                    >
                      remove
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          {cheesecakes && cheesecakes.length > 0 && (
            <div>
              <p className="cart-cheesecake-title">Cheesecakes</p>
              {cheesecakes.map((cheesecake) => {
                return (
                  <div className="cart-cheesecake-wrapper">
                    <p className="cart-cheesecake-flavor">
                      Flavor: {cheesecake.flavor}
                    </p>
                    <p className="cart-cheesecake-strawberries">
                      Strawberries: {cheesecake.strawberries ? "Yes" : "No"}
                    </p>
                    <HandleMultipleItems dessert={cheesecake} />
                    {cheesecake.strawberries ? (
                      <span className="cart-cheesecake-price">
                        <span className="cart-dollar-sign">$</span>
                        {cheesecake.amount * 20}.00
                      </span>
                    ) : (
                      <span className="cart-cheesecake-price">
                        <span className="cart-dollar-sign">$</span>
                        {cheesecake.amount * 18}.00
                      </span>
                    )}
                    <span
                      className="cart-remove"
                      onClick={(e) => handleRemove(e, cheesecake)}
                    >
                      remove
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          {cookies && cookies.length > 0 && (
            <div>
              <p className="cart-cookie-title">Cookies</p>
              {cookies.map((cookie) => {
                return (
                  <div className="cart-cookie-wrapper">
                    <p className="cart-cookie-flavor">
                      Flavor: {cookie.flavor}
                    </p>
                    <HandleMultipleItems dessert={cookie} />
                    <span className="cart-cookie-price">
                      <span className="cart-dollar-sign">$</span>
                      {cookie.amount * 10}.00
                    </span>
                    <span
                      className="cart-remove"
                      onClick={(e) => handleRemove(e, cookie)}
                    >
                      remove
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {(cupcakes.length > 0 ||
        cheesecakes.length > 0 ||
        cookies.length > 0) && (
        <div className="cart-checkout-wrapper">
          <p className="cart-subtotal">Subtotal: ${subTotal}.00</p>
          <button className="cart-checkout" disabled={subTotal === 0}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
