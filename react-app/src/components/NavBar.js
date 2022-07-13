import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import birdHouseIcon from '../assets/bird-house.png'
import LogoutPopUp from './LogoutPopUp';

const NavBar = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <nav className='grid-container navbar'>
      <ul style={{ listStyle: 'none' }}>
        <li className='side-bar-icon' >
          {user ?
            <NavLink to={`/users/${user.id}`} exact={true} activeClassName='active' >
              <i className="fa-brands fa-twitter fa-2xl twitter-icon"></i>
            </NavLink>
            :
            <NavLink to={`/login`} exact={true} activeClassName='active'>
              <i className="fa-brands fa-twitter fa-2xl twitter-icon"></i>
            </NavLink>
          }
        </li >
        {user ?
          <>
            <li className='side-bar-icon'>
              <NavLink to={`/users/${user.id}`} exact={true} activeStyle={{ textDecoration: 'none', fontWeight: 'bold' }} style={{ textDecoration: 'none' }}>
                <img src={birdHouseIcon} alt="bird-house" className='bird-house-icon' />
                <span className='side-bar-icon-text'>
                  Home
                </span>
              </NavLink>
            </li>
            <li className='side-bar-icon'>
              <NavLink to={`/${user.id}/explore`} exact={true} activeStyle={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }} style={{ textDecoration: 'none', color: 'black' }}>
                <i className="fa-solid fa-hashtag fa-xl profile-icon"></i>
                <span className='side-bar-icon-text'>
                  Explore
                </span>
              </NavLink>
            </li>
            <li className='side-bar-icon'>
              <NavLink to={`/profile/${user.id}/${user.id}`} exact={true} activeStyle={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }} style={{ textDecoration: 'none', color: 'black' }}>
                <i className="fa-regular fa-user fa-xl profile-icon"></i>
                <span className='side-bar-icon-text'>
                  Profile
                </span>
              </NavLink>
            </li>
          </>
          : null}
        <div className="logout-popup">
          <LogoutPopUp />
        </div>
      </ul>
    </nav >
  );
}

export default NavBar;
