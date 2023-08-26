import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RxHamburgerMenu } from "react-icons/rx";
import { RiShoppingCart2Line } from "react-icons/ri"
import { useState } from 'react';
import { InfoContext } from "../../context/InfoContext" 
import logo from "../../images/SWEET_PETALS_wlogo.png" 
import { logout } from '../../store/session';
import ShoppingCart from '../shopping-cart/ShoppingCart';
import LoginFormModal from '../modal-pages/LoginFormModal';
import "./nav.css"


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
    const { cartCount, setCartCount, openShoppingCart, setOpenShoppingCart } = useContext(InfoContext);
    const [openMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory();

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    const toggleShoppingCart = () => {
        setOpenShoppingCart(!openShoppingCart);
    }

    const logoutHandler = async () => {
        await dispatch(logout())
        return history.push('/')
    }

	return (
        <div className='nav-outer-container'>
            <div className='nav-container'>
                <NavLink to="/" className="nav-logo-wrapper">
                    <img src={logo} alt='cupcake-logo'className='nav-logo'/>
                </NavLink>
                <ul className='nav-list-wrapper'>
                    {/* <li>
                        <NavLink exact to="/">Home</NavLink>
                    </li> */}
                    <li>
                        <NavLink exact to="/reviews">Reviews</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/orders/new">Create Order</NavLink>
                    </li>
                    {/* <div><LoginFormModal /></div> */}
                    {/* <div><SignupFormModal /></div> */}
                    
                    {(!sessionUser ? <div><LoginFormModal /></div> :
                        (isLoaded && <li 
                        className='nav-menu-wrapper'
                        onClick={toggleMenu}
                        >
                            <RxHamburgerMenu className='nav-menu-button'/>
                            {openMenu && 
                            <div className='nav-menu'>
                                {/* <div onClick={e => loginModal()}>Login</div>
                                <div onClick={e => signupModal()}>Signup</div> */}
                                <NavLink to="/orders">All orders</NavLink>
                                <NavLink to="/orders/users">My orders</NavLink>
                                <div onClick={logoutHandler}>Logout</div>
                            </div>}
                        </li>)
                    )}
                    <li className='nav-shopping-wrapper'>
                        <RiShoppingCart2Line 
                        className='nav-shopping-cart' 
                        onClick={toggleShoppingCart}
                        />
                        {cartCount >= 1 && <div className='nav-shopping-count'>{cartCount}</div>}
                        {openShoppingCart && <div className='nav-shopping-cart-items'><ShoppingCart /></div>}
                    </li>
                </ul>
            </div>
        </div>
	);
}

export default Navigation;