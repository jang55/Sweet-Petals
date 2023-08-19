import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import { GiHamburgerMenu } from "react-icons/gi";
import "./nav.css"


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
            
			{isLoaded && (
				<li className='nav-menu-wrapper'>
					<GiHamburgerMenu className='nav-menu-button'/>
				</li>
			)}
		</ul>
	);
}

export default Navigation;