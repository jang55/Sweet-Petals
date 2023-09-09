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
import {  RiLogoutBoxLine } from "react-icons/ri"
import { removeAllCartItems } from "../../store/cartReducer";


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cartState);
  const [cupcakes, setCupcakes] = useState([]);
  const [cheesecakes, setCheesecakes] = useState([]);
  const [cookies, setCookies] = useState([]);
  const { cartCount, setCartCount, openShoppingCart, setOpenShoppingCart, cartRef } =
    useContext(InfoContext);
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const dropdownRef = useRef();

  
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
                {openMenu && (
                  <div className="nav-menu"  >
                    {/* <span className="nav-menu-items">
                      Inbox <FaEnvelope className="nav-envelope" />
                    </span> */}
                    <NavLink className="nav-menu-items-wrap" to="/messages">
                      <span className="nav-menu-items">
                        Inbox <FaEnvelope className="nav-envelope" />
                      </span>
                    </NavLink>

                    {sessionUser.role === "admin" && (
                      <NavLink className="nav-menu-items-wrap" to="/orders">
                        <span className="nav-menu-items">Order Logs</span>
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
