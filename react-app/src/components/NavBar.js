import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <nav className='grid-container navbar'>
      <ul>
        <li>
          {user ?
            <NavLink to={`/users/${user.id}`} exact={true} activeClassName='active'>
              Home
            </NavLink>
            : null
          }
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          {user ?
            <NavLink to={`/profile/${user.id}/${user.id}`} exact={true} activeClassName='active'>
              Profile
            </NavLink>
            : null}
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
