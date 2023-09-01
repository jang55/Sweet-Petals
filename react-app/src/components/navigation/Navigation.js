import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useState } from "react";
import { InfoContext } from "../../context/InfoContext";
import logo from "../../images/SWEET_PETALS_wlogo.png";
import { logout } from "../../store/session";
import ShoppingCart from "../shopping-cart/ShoppingCart";
import LoginFormModal from "../modal-pages/LoginFormModal";
import "./nav.css";
import { removeAllCartItems } from "../../store/cartReducer";
import { FaEnvelope } from "react-icons/fa";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { cartCount, openShoppingCart, setOpenShoppingCart } =
    useContext(InfoContext);
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   if(!sessionUser) {
  //     return history.push("/")
  //   }
  // }, [sessionUser])

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const toggleShoppingCart = () => {
    setOpenShoppingCart(!openShoppingCart);
  };

  const logoutHandler = async () => {
    await dispatch(logout());
    // await dispatch(removeAllCartItems());
    return history.push("/");
  };

  return (
    <div className="nav-outer-container">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo-wrapper">
          <img src={logo} alt="cupcake-logo" className="nav-logo" />
        </NavLink>
        <ul className="nav-list-wrapper">
          {sessionUser && (
            <li>
              <NavLink exact to="/orders/new">
                Create Order
              </NavLink>
            </li>
          )}
          {/**************** sections for login button and navigations ********************************/}
          {!sessionUser ? (
            <li className="nav-login-wrapper">
              <LoginFormModal />
            </li>
          ) : (
            isLoaded && (
              <li className="nav-menu-wrapper" onClick={toggleMenu}>
                <RxHamburgerMenu className="nav-menu-button" />
                {openMenu && (
                  <div className="nav-menu">
                    <NavLink className="nav-menu-items-wrap" to="/messages">
                      <span className="nav-menu-items">
                        Inbox <FaEnvelope className="nav-envelope" />
                      </span>
                    </NavLink>

                    {sessionUser.role === "admin" && (
                      <NavLink className="nav-menu-items-wrap" to="/orders">
                        <span className="nav-menu-items">All Orders</span>
                      </NavLink>
                    )}

                    {sessionUser.role === "admin" && (
                      <NavLink className="nav-menu-items-wrap" to="/reviews">
                        <span className="nav-menu-items">All Reviews</span>
                      </NavLink>
                    )}

                    {sessionUser.role === "admin" && (
                      <NavLink className="nav-menu-items-wrap" to="/recipes">
                        <span className="nav-menu-items">Recipes</span>
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

                    <div className="nav-menu-items-wrap" onClick={logoutHandler}><span className="nav-menu-items">Logout</span></div>
                  </div>
                )}
              </li>
            )
          )}
          {/**************** end sections for login button and navigations ********************************/}

          <li className="nav-shopping-wrapper">
            <RiShoppingCart2Line
              className="nav-shopping-cart"
              onClick={toggleShoppingCart}
            />
            {cartCount >= 1 && (
              <div className="nav-shopping-count">{cartCount}</div>
            )}
            {openShoppingCart && (
              <div className="nav-shopping-cart-items">
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
