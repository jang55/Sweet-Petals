import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import { InfoContext } from "../../context/InfoContext";
import logo from "../../images/SWEET_PETALS_wlogo.png";
import { logout } from "../../store/session";
import ShoppingCart from "../shopping-cart/ShoppingCart";
import LoginFormModal from "../modal-pages/LoginFormModal";
import "./nav.css";
import { FaEnvelope } from "react-icons/fa";
// import { MdOutlineRateReview } from "react-icons/md"
// import { RiFileList3Line } from "react-icons/ri"
import { RiLogoutBoxLine } from "react-icons/ri"
import { removeAllCartItems } from "../../store/cartReducer";
import { getCustomerMessagesThunk, getAllMessagesThunk } from "../../store/messageReducer";
import socket from "../../utils/Socket";
import { handleMessageNotificationUpdate, handleOrderNotificationUpdate } from "../../utils/Socket";
import { getAllOrdersThunk } from "../../store/orderReducer";



function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cartState);
  const allMessages = useSelector((state) => state.messageState);
  const customerOrders = useSelector(state => state.orderState);
  const [cupcakes, setCupcakes] = useState([]);
  const [cheesecakes, setCheesecakes] = useState([]);
  const [cookies, setCookies] = useState([]);
  const { 
    cartCount, 
    setCartCount, 
    openShoppingCart, 
    setOpenShoppingCart, 
    cartRef,
    unreadMessages,
    setUnreadMessages,
    setUnreadMessagesMoreThanOne,
    unSeenOrders,
    setUnSeenOrders,
  } = useContext(InfoContext);
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const dropdownRef = useRef();

  // dispatches the message thunk on refresh or changes pages
  useEffect(() => {
    if(sessionUser && !window.location.href.includes("messages/users")) {
      if(sessionUser.role === "customer") {
        dispatch(getCustomerMessagesThunk(sessionUser.id))
      } else if(sessionUser.role === "admin") {
        dispatch(getAllMessagesThunk());
        dispatch(getAllOrdersThunk());
      }
    }
  }, [sessionUser, dispatch])

// ***********************************************************
// ***********************************************************
// ***********************************************************
// useEffect for handling messages notifications
// ***********************************************************
  useEffect(() => {
    const messages = Object.values(allMessages);
    if(messages.length <= 0) {
      setUnreadMessages(false)
      return
    }

    // conditions for customer users
    if(sessionUser && sessionUser.role === "customer") {
      if(messages.length > 0) {
        // condition for checking last message
        if(messages[messages.length - 1]?.sender === "admin" && messages[messages.length - 1]?.is_read === false) {
          setUnreadMessages(true)
          return
        } else if(messages[messages.length - 1]?.sender === "customer") {
          setUnreadMessages(false)
        }
      }
      // conditions for admin users
    } else if(sessionUser && sessionUser.role === "admin" && !window.location.href.includes("messages/users")) {
        if(messages.length > 0) {
          let count = 0;
          // iterate through each list of customer messages
          for(let i = 0; i < messages.length; i++) {
            let customerMessages = messages[i]
            // condition checking last message of each customer
            if(customerMessages[customerMessages.length - 1]?.sender === "customer" && customerMessages[customerMessages.length - 1]?.is_read === false) {
              // if any messages are unread, set the notification
              setUnreadMessages(true)
              // if count of unread messages of more than 1 user, set this state true
              if(count >= 1) {
                setUnreadMessagesMoreThanOne(true)
                return;
              }

              count += 1
            } 
          }
          // if only one unread customer message, set to false
          setUnreadMessagesMoreThanOne(false);
        }
      } 

    // setUnreadMessages(false);
  }, [allMessages, dispatch, sessionUser])

  // *****************************************************************************
  // *****************************************************************************
  // handles the web sockets for chat messages
  // *****************************************************************************
  useEffect(() => {
    
    const callBack = () => {
      if(sessionUser && !window.location.href.includes("messages/users")) {
        if(sessionUser.role === "customer") {
          dispatch(getCustomerMessagesThunk(sessionUser.id))
        } else if(sessionUser.role === "admin") {
          dispatch(getAllMessagesThunk());
        }
      }
    }
    
    handleMessageNotificationUpdate(callBack)
    
    // when component unmounts, disconnect
    return (() => {
      // socket.disconnect()
      socket.off("message_notification_response");
    })
  }, [sessionUser, dispatch])

  // *****************************************************************************
  // *****************************************************************************
  // *****************************************************************************

  
  // *****************************************************************************
  // *****************************************************************************
  // *****************************************************************************
  useEffect(() => {

    if(sessionUser && sessionUser.role === "admin") {
      const customerOrdersArr = Object.values(customerOrders)
      for(let i = 0; i < customerOrdersArr.length; i++) {
        const order = customerOrdersArr[i];
        if(order.is_new) {

          setUnSeenOrders(true)
          return;
        }
      }

      // setUnSeenOrders(false)
    }
  }, [customerOrders, dispatch, sessionUser])


  // *****************************************************************************
  // *****************************************************************************
  // handles the web sockets for orders notification
  // *****************************************************************************
  useEffect(() => {
    
    const callBack = () => {

      if(sessionUser && sessionUser.role === "admin") {
        dispatch(getAllOrdersThunk());
      }
    }
    
    handleOrderNotificationUpdate(callBack)
    
    // when component unmounts, disconnect
    return (() => {
      // socket.disconnect()
      socket.off("order_notification_response");
    })
  }, [sessionUser, dispatch])

    // *****************************************************************************
    // *****************************************************************************
    // *****************************************************************************
  
  // *********** this sets the count for the session storage values *******************************
    useEffect(() => {
      if(!sessionUser) {
        setCartCount(0)
        // history.push("/")
      }
    }, [sessionUser, setCartCount])

    // sets all the dessert items into an array
    useEffect(() => {
      if(sessionUser) {
        if (cart && cart.cupcakes) {
          setCupcakes(Object.values(cart.cupcakes));
        }
    
        if (cart && cart.cheesecakes) {
          setCheesecakes(Object.values(cart.cheesecakes));
        }
    
        if (cart && cart.cookies) {
          setCookies(Object.values(cart.cookies));
        }
      }
    }, [cart, sessionUser]);
  
    // sets the amount of items and subtotal price
    useEffect(() => {
      let totalItems = 0;
  
      if (cupcakes && cupcakes.length > 0) {
        cupcakes.forEach((cupcake) => {
          totalItems += cupcake.amount;
        });
      }
  
      if (cheesecakes && cheesecakes.length > 0) {
        cheesecakes.forEach((cheesecake) => {
          totalItems += cheesecake.amount;
        });
      }
  
      if (cookies && cookies.length > 0) {
        cookies.forEach((cookie) => {
          totalItems += cookie.amount;
        });
      }
      setCartCount(totalItems);
    }, [cupcakes, cheesecakes, cookies, setCartCount]);
// ***********************************************************



useEffect(() => {
    // handles the event being clicked outside of the area
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setOpenShoppingCart(false)
      }
    
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [cartRef, setOpenShoppingCart]);
  // end of the handling event being clicked outside of the area


  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const toggleShoppingCart = () => {
    setOpenShoppingCart(!openShoppingCart);
  };

  const logoutHandler = async () => {
    setUnreadMessages(false);
    setUnSeenOrders(false);
    window.sessionStorage.setItem(`cart-items`, JSON.stringify({
      cupcakes: {},
      cheesecakes: {},
      cookies: {},
    }));
    await dispatch(logout());
    await dispatch(removeAllCartItems());
    // await dispatch(removeAllCartItems());
    return history.push("/");
  };

  return (
    <div className="nav-outer-container">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo-wrapper">
          <img src={logo} alt="cupcake-logo" className="nav-logo" />
        </NavLink>
        {/* <p className="nav-slogan">Keep calm and have a cupcake.</p> */}
        <ul className="nav-list-wrapper">
          {sessionUser && sessionUser.role === "customer" && (
            <li>
              <NavLink exact to="/orders/new" className="nav-create-order">
                Create Order
              </NavLink>
            </li>
          )}
            <li>
              <NavLink exact to="/about-us" className="nav-about-us">
                About Us
              </NavLink>
            </li>
          {/**************** sections for login button and navigations ********************************/}
          {!sessionUser ? (
            <li className="nav-login-wrapper">
              <LoginFormModal />
            </li>
          ) : (
            isLoaded && (
              <li className="nav-menu-wrapper" ref={dropdownRef} onClick={toggleMenu}>
                <RxHamburgerMenu className="nav-menu-button" />
                {/* ******************************* */}
                {unreadMessages && <div className="nav-menu-notification"></div>}
                {unSeenOrders && <div className="nav-menu-notification"></div>}
                {/* ******************************* */}
                {openMenu && (
                  <div className="nav-menu"  >
{/* links for all the admins */}
                    {sessionUser.role === "admin" && <NavLink className="nav-menu-items-wrap" to="/messages/list">
                      <span className="nav-menu-items">
                        Messages <FaEnvelope className="nav-envelope" />
                        {unreadMessages && <span className="nav-menu-message-notification-in-menu-box"></span>}
                      </span>
                    </NavLink>}

                    {sessionUser.role === "admin" && (
                      <NavLink className="nav-menu-items-wrap" to="/orders">
                        <span className="nav-menu-items">Order Logs</span>
                        {unSeenOrders && <span className="nav-menu-orders-notification-in-menu-box"></span>}
                      </NavLink>
                    )}

                    {sessionUser.role === "admin" && (
                      <NavLink className="nav-menu-items-wrap" to="/reviews">
                        <span className="nav-menu-items nav-menu-customer-reviews">Customer Reviews</span>
                      </NavLink>
                    )}

                    {sessionUser.role === "admin" && (
                      <NavLink className="nav-menu-items-wrap" to="/recipes">
                        <span className="nav-menu-items">Recipes List</span>
                      </NavLink>
                    )}
{/* links for all the customers */}
                    {sessionUser.role === "customer" && <NavLink className="nav-menu-items-wrap" to={`/messages/users/${sessionUser.id}`}>
                      <span className="nav-menu-items">
                        Messages <FaEnvelope className="nav-envelope" />
                        {unreadMessages && <span className="nav-menu-notification-in-menu-box"></span>}
                      </span>
                    </NavLink>}

                    {sessionUser.role === "customer" && <NavLink className="nav-menu-items-wrap" to="/orders/users">
                      <span className="nav-menu-items">My Orders</span>
                    </NavLink>}

                    {sessionUser.role === "customer" && <NavLink
                      className="nav-menu-items-wrap"
                      exact
                      to="/reviews/users"
                    >
                      <span className="nav-menu-items">My Reviews</span>
                    </NavLink>}

                    <div className="nav-menu-items-wrap" onClick={logoutHandler}><span className="nav-menu-items-logout"><RiLogoutBoxLine className=" nav-menu-icons" />Logout</span></div>
                  </div>
                )}
              </li>
            )
          )}
          {/**************** end sections for login button and navigations ********************************/}

          <li className="nav-shopping-wrapper" ref={cartRef}>
            <RiShoppingCart2Line
              className="nav-shopping-cart"
              onClick={toggleShoppingCart}
            />
            {cartCount >= 1 && (
              <div className="nav-shopping-count">{cartCount}</div>
            )}
            {openShoppingCart && (
              <div className="nav-shopping-cart-items" >
                <ShoppingCart />
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
