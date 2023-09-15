import { dateFormat } from "../../utils/helperFunctions";
import { useState, useEffect } from "react";
import DeleteOrderModal from "../modal-pages/DeleteOrderModal";
import { useSelector,  useDispatch } from "react-redux";
import { updateOrderThunk } from "../../store/orderReducer";
import { dateFormatTooBackend, checkDateMiliseconds, disableOlderOrders } from "../../utils/helperFunctions";
import { useHistory } from "react-router-dom";
import AddReviewModal from "../modal-pages/AddReviewModal";




function OrderCard({ order, pageType, validOrder }) {
  const user = useSelector((state) => state.session.user);
  const orderOwner = useSelector(state => state.userState[order.owner_id]);
  // const allReviews= useSelector(state => Object.values(state.reviewState));
  const [cupcakes, setCupcakes] = useState([]);
  const [cheesecakes, setCheesecakes] = useState([]);
  const [cookies, setCookies] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [orderReview, setOrderReview] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if(!user) {
      return history.push("/")
    }
  }, [user, history])
  
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

    if(order && order.Reviews) {
      setOrderReview(order.Reviews)
    }

  }, [order]);

  // useEffect(() => {
  //   if (allReviews) {
  //     const review = allReviews.find(review => Number(review.order_id) === Number(order.id));
  //     setOrderReview(review)
  //   }
  // }, [allReviews])




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


  

  // handles completion button
  const handleCompleteButton = () => {
    const pickUpTime = dateFormatTooBackend(order.pick_up_time)
    dispatch(updateOrderThunk(order.id, pickUpTime, !order.order_completed));
  }

  const handleEditButton = () => {
    history.push(`/orders/${order.id}`)
  }

  const handleMessageButton = () => {
    history.push(`/messages/users/${order.owner_id}`)
  }


  return (
    <fieldset
      className={showMore ? "order-wrapper-more" : (Math.max(cupcakes.length, cheesecakes.length, cookies.length) > 1 ? "order-wrapper-less-gradient" :"order-wrapper-less")}
    >
      <legend className="order-number">Orders ID: {order.order_number} </legend>
      <div className="order-information-wrapper">
        <p className="order-pickup">
          Pick up Date/Time:{" "}
          <span className="order-info-text">
            {dateFormat(order.pick_up_time)}
          </span>
        </p>
        <span className="order-received">
          {user && user.role === "admin" ? (
            <span>Have the customer received their order? </span>
          ) : (
            <span>Have you received your order? </span>
          )}
          {order.order_completed ? (
            <span className="order-info-text">
              Yes <span className="validity-received-yes">✓</span>
            </span>
          ) : (
            <span className="order-info-text">
              No <span className="validity-received-no">✖</span>
            </span>
          )}
        </span>
        {(user && user.role === "admin") && <span className="order-owner-name">Name: <span className="order-info-text">{orderOwner.username}</span></span>}
        {(user && user.role === "admin") && <span className="order-owner-contact">Contact: <span className="order-info-text">{orderOwner.email}</span></span>}
        <p className="order-subtotal">
          Subtotal: <span className="order-info-text">${subTotal}.00</span>
        </p>
        {user && user.role === "admin" ? (
          <div className="order-functions">
            {order.order_completed ? (
              <button onClick={handleCompleteButton} className="order-buttons" >Incompleted</button>
            ) : (
              <button onClick={handleCompleteButton} className="order-buttons" >Completed</button>
            )}
            <button onClick={handleMessageButton} className="order-buttons order-message-button">Leave Message</button>
          </div>
        ) : checkDateMiliseconds(order.pick_up_time) ? (
          <div className="order-functions">
            {!validOrder && (
              orderReview && orderReview.length >= 1 ? <p className="order-info-text">This order already has a review.</p> : <AddReviewModal order={order} />
            )}
            {validOrder && <p className="order-info-text">Order can not be canceled or changed due to being less than 2 days for pick up time.</p>}
          </div>
        ) : (
          <div className="order-functions">
            {validOrder && !disableOlderOrders(order) && <DeleteOrderModal order={order} />}
            {validOrder && !disableOlderOrders(order) && <button className="order-buttons" onClick={handleEditButton} >Change</button>}
            {!validOrder && (
              orderReview && orderReview.length >= 1 ? <p className="order-info-text">This order already has a review.</p> : <AddReviewModal order={order}/ >
            )}
          </div>
        )}
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

      {Math.max(cupcakes.length, cheesecakes.length, cookies.length) > 1 ? showMore ? (
        <p className="more-less" onClick={(e) => setShowMore(!showMore)}>
          Less...
        </p>
      ) : (
        <p className="more-less" onClick={(e) => setShowMore(!showMore)}>
          More...
        </p>
      ) : <></>}
    </fieldset>
  );
}

export default OrderCard;
