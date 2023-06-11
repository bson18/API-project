import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import airbnblogo from '../../assets/Airbnb_Logo_Bélo.svg.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className="profile-menu">
                <Link className='create-link' to='/spots/new'>
                    <div id='create-spot-link'>Create a New Spot</div>
                </Link>
                <div className="profile-btn">
                    <ProfileButton user={sessionUser} />
                </div>
            </div>
        );
    } else {
        sessionLinks = (
            <div className='profile-btn'>
                <ProfileButton user={sessionUser} />
            </div>
        );
    }

    return (
        <nav>
            <div className='nav-bar'>
                <NavLink exact to='/'>
                    <img src={airbnblogo} id='logo' alt='logo' />
                </NavLink>
                {isLoaded && sessionLinks}
            </div>
        </nav>
    );
}

export default Navigation;
