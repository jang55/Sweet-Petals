import { dateFormat } from "../../utils/helperFunctions";
import { useState, useEffect, useContext } from "react";
import DeleteOrderModal from "../modal-pages/DeleteOrderModal";

function OrderCard({ order, pageType, validOrder }) {
  const [cupcakes, setCupcakes] = useState([]);
  const [cheesecakes, setCheesecakes] = useState([]);
  const [cookies, setCookies] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [showMore, setShowMore] = useState(false);

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
    <fieldset
      className={showMore ? "order-wrapper-more" : "order-wrapper-less"}
    >
      <legend className="order-number">Orders ID: {order.order_number} </legend>
      <div className="order-information-wrapper">
        <p className="order-pickup">
          Pick up Date/Time:{" "}
          <span className="order-info-text">
            {dateFormat(order.pick_up_time)}
          </span>
        </p>
        <p className="order-received">
          Have you received your order?{" "}
          {order.order_completed ? (
            <span className="order-info-text">Yes</span>
          ) : (
            <span className="order-info-text">No</span>
          )}
        </p>
        <p className="order-subtotal">
          Subtotal: <span className="order-info-text">${subTotal}.00</span>
        </p>
        <div className="order-functions">
          {validOrder && <DeleteOrderModal order={order} />}
          {validOrder && <button className="order-buttons">Edit</button>}
          {!validOrder && <button className="order-buttons">Add Review</button>}
        </div>
        {/* <div>
                    <button>Order Done</button>
                </div> */}
      </div>
      <div className="order-items-wrapper">
        {cupcakes && cupcakes.length > 0 && (
          <div className="order-cupcake-container">
            <p className="order-cupcake-title">Cupcakes</p>
            {cupcakes.map((cupcake) => {
              return (
                <div key={cupcake.id} className="order-cupcake-wrapper">
                  <p className="order-cupcake-flavor">
                    Flavor: {cupcake.flavor}
                  </p>
                  <p className="order-cupcake-style">Style: {cupcake.style}</p>
                  <span className="order-cupcake-color-wrap">
                    <div
                      className="order-cupcake-colors"
                      style={{
                        background: cupcake.color_one,
                      }}
                    ></div>
                    {cupcake.color_two && (
                      <div
                        className="order-cupcake-colors"
                        style={{
                          background: cupcake.color_two,
                        }}
                      ></div>
                    )}
                    {cupcake.color_three && (
                      <div
                        className="order-cupcake-colors"
                        style={{
                          background: cupcake.color_three,
                        }}
                      ></div>
                    )}
                  </span>
                  <span className="order-cupcake-amount">
                    Amount: {cupcake.amount}
                  </span>
                  <span className="order-cupcake-price">
                    <span className="order-dollar-sign">$</span>
                    {cupcake.amount * 30}.00
                  </span>
                </div>
              );
            })}
          </div>
        )}
        {cheesecakes && cheesecakes.length > 0 && (
          <div className="order-cheesecake-container">
            <p className="order-cheesecake-title">Cheesecakes</p>
            {cheesecakes.map((cheesecake) => {
              return (
                <div className="order-cheesecake-wrapper" key={cheesecake.id}>
                  <p className="order-cheesecake-flavor">
                    Flavor: {cheesecake.flavor}
                  </p>
                  <p className="order-cheesecake-strawberries">
                    Strawberries: {cheesecake.strawberries ? "Yes" : "No"}
                  </p>
                  <span className="order-cheesecake-amount">
                    Amount: {cheesecake.amount}
                  </span>
                  {cheesecake.strawberries ? (
                    <span className="order-cheesecake-price">
                      <span className="order-dollar-sign">$</span>
                      {cheesecake.amount * 20}.00
                    </span>
                  ) : (
                    <span className="order-cheesecake-price">
                      <span className="order-dollar-sign">$</span>
                      {cheesecake.amount * 18}.00
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {cookies && cookies.length > 0 && (
          <div className="order-cookie-container">
            <p className="order-cookie-title">Cookies</p>
            {cookies.map((cookie) => {
              return (
                <div className="order-cookie-wrapper" key={cookie.id}>
                  <p className="order-cookie-flavor">Flavor: {cookie.flavor}</p>
                  <span className="order-cookie-amount">
                    Amount: {cookie.amount}
                  </span>
                  <span className="order-cookie-price">
                    <span className="order-dollar-sign">$</span>
                    {cookie.amount * 10}.00
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {showMore ? (
        <p className="more-less" onClick={(e) => setShowMore(!showMore)}>
          Less...
        </p>
      ) : (
        <p className="more-less" onClick={(e) => setShowMore(!showMore)}>
          More...
        </p>
      )}
    </fieldset>
  );
}

export default OrderCard;
