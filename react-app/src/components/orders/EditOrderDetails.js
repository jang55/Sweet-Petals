import "./css/edit-order.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderThunk } from "../../store/orderReducer";
import EditCheesecake from "./edit-orders/EditCheesecake";
import EditCookie from "./edit-orders/EditCookie";
import EditCupcake from "./edit-orders/EditCupcake";
import { dateFormat } from "../../utils/helperFunctions";
import moment from "moment";
import * as orderActions from "../../store/orderReducer";

function EditOrderDetails() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderState);
  const user = useSelector((state) => state.session);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cupcakes, setCupcakes] = useState([]);
  const [cheesecakes, setCheesecakes] = useState([]);
  const [cookies, setCookies] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [hoverShowEdit, setHoverShowEdit] = useState("");
  const [showEditForm, setShowEditForm] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [minDate, setMinDate] = useState("");
  // const [showEditDate, setShowEditDate] = useState(false)

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


    // sets up the min date for the input date box
    useEffect(() => {
      const date = moment().add(2, 'days').format().slice(0, 10);
      setMinDate(date) 
    }, [setMinDate])


    // handles the updating an order
  const handleUpdatingOrder = async (e) => {
    e.preventDefault();
    await dispatch(orderActions.updateOrderUserSideThunk(orderId, `${pickUpDate} ${pickUpTime}`, false));
    setPickUpDate("");
    setPickUpTime("");
    setShowEditForm("");
  }

  return (
    isLoaded &&
    order.user_id === user.id && (
      <div className="edit-order-container">
        <h1>Order Details</h1>
        <p>You can make changes to your order here on this page.</p>
        <div className="edit-order-wrapper">
          <div className="edit-info-wrap">
            <p className="order-pickup">
              Pick up Date/Time:{" "}
              <span className="order-info-text">
                {dateFormat(order.pick_up_time)}
              </span>
              <span onClick={e => setShowEditForm("date-time")} className="edit-pickup-time-text">Edit-Date/Time</span>
            </p>
            <span className="order-received">
            <span>Have you received your order? </span>
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
            <p className="order-subtotal">
              Subtotal: <span className="order-info-text">${subTotal}.00</span>
            </p>

            {/* ******** handles editing order date and time ********* */}
            {/* <p className="edit-date-time-question">Want to change up your pick up time or day?</p>
            <span></span> */}
            {showEditForm === "date-time" && <form className="edit-date-time-order-wrapper">
              <label className="edit-order-pickup-date-wrapper">
            Choose a pick up date:
            <input className="edit-order-pickup-date" type="date" min={minDate} onChange={e => setPickUpDate(e.target.value)}></input>
          </label>
          <label className="edit-order-pickup-time-wrapper">
            <span className="edit-order-time-message">Choose time between 9AM - 6PM:</span>
            <input className="edit-order-pickup-time" type="time" min="09:00" max="18:00" onChange={e => setPickUpTime(e.target.value)}></input>
            <span className="validity"></span>
          </label>
                <p onClick={e => setShowEditForm("")} className="edit-order-cancel">Cancel</p>
                <button onClick={handleUpdatingOrder} className={`${pickUpDate.length < 1  || pickUpTime.length < 1 ? "edit-order-save-invalid" :"edit-order-save"}`} disabled={pickUpDate.length < 1 || pickUpTime.length < 1} >Save</button>
            </form>}
          {/* ******** ends edit handling dates order and time ************** */}
        
          </div>
          {cupcakes && cupcakes.length > 0 && (
            <>
              <p className="edit-cupcake-title">Cupcakes</p>
              {cupcakes.map((cupcake, i) => (
                <div key={`${cupcake.id}${i}`}>
                  <EditCupcake
                    cupcake={cupcake}
                    hoverShowEdit={hoverShowEdit}
                    setHoverShowEdit={setHoverShowEdit}
                    showEditForm={showEditForm}
                    setShowEditForm={setShowEditForm}
                  />
                </div>
              ))}
            </>
          )}
          {cheesecakes && cheesecakes.length > 0 && (
            <>
              <p className="edit-cheesecake-title">Cheesecakes</p>
              {cheesecakes.map((cheesecake, i) => (
                <div key={`${cheesecake.id}${i}`}>
                  <EditCheesecake
                    cheesecake={cheesecake}
                    hoverShowEdit={hoverShowEdit}
                    setHoverShowEdit={setHoverShowEdit}
                    showEditForm={showEditForm}
                    setShowEditForm={setShowEditForm}
                  />
                </div>
              ))}
            </>
          )}
          {cookies && cookies.length > 0 && (
            <div>
              <p className="edit-cookie-title">Cookies</p>
              {cookies.map((cookie, i) => (
                <div key={`${cookie.id}${i}`}>
                  <EditCookie 
                  cookie={cookie} 
                  hoverShowEdit={hoverShowEdit}
                  setHoverShowEdit={setHoverShowEdit}
                  showEditForm={showEditForm}
                  setShowEditForm={setShowEditForm}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default EditOrderDetails;
