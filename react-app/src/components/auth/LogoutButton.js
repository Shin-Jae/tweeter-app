import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector((state) => state.session.user)

  const onLogout = async (e) => {
    history.push(`/`);
    await dispatch(logout());
  };

  return <button className="logout-btn-username" onClick={onLogout}>Log out @{user?.username}</button>;
};

export default LogoutButton;
