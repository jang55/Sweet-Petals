import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from 'react';
import {ModalContext} from "../../context/modalContext"
import logo from "../../images/SWEET_PETALS_wlogo.png" 
import { logout } from '../../store/session';
import "./nav.css"


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
    const { loginModal, signupModal, type } = useContext(ModalContext);
    const [openMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory();

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
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
                    
                    {isLoaded && (
                        <li 
                        className='nav-menu-wrapper'
                        onClick={toggleMenu}
                        >
                            <RxHamburgerMenu className='nav-menu-button'/>
                            {openMenu && 
                            <div className='nav-menu'>
                                <div onClick={e => loginModal()}>Login</div>
                                <div onClick={e => signupModal()}>Signup</div>
                                <div onClick={logoutHandler}>Logout</div>
                            </div>}
                        </li>
                    )}
                </ul>
            </div>
        </div>
	);
}

export default Navigation;