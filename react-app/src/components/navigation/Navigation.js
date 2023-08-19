import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from 'react';
import {ModalContext} from "../../context/modalContext"
import logo from "../../images/SWEET_PETALS.png" 
import "./nav.css"


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
    const { loginModal, signupModal, type } = useContext(ModalContext);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        console.log(type)
    }, [type])

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

	return (
        <div className='nav-outer-container'>
            <div className='nav-container'>
                <NavLink to="/" >
                    <img src={logo} alt='cupcake-logo'className='nav-logo'/>
                </NavLink>
                <ul className='nav-list-wrapper'>
                    <li>
                        <NavLink exact to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/">Reviews</NavLink>
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
                            </div>}
                        </li>
                    )}
                </ul>
            </div>
        </div>
	);
}

export default Navigation;