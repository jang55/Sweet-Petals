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
            <div>
              <LoginFormModal />
            </div>
          ) : (
            isLoaded && (
              <li className="nav-menu-wrapper" onClick={toggleMenu}>
                <RxHamburgerMenu className="nav-menu-button" />
                {openMenu && (
                  <ul className="nav-menu">
                    
                    {sessionUser.role === "admin" && 
                    <li>
                      <NavLink to="/orders">All orders</NavLink>
                    </li>}
                    <li>
                      <NavLink to="/orders/users">My orders</NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/reviews/users">
                        My reviews
                      </NavLink>
                    </li>
                    <div onClick={logoutHandler}>Logout</div>
                  </ul>
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
