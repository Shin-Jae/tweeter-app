import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './Auth.css';

const LoginForm = ({ onClose }) => {
  const [errors, setErrors] = useState([]);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data.id) {
      history.push(`/users/${data.id}`)
    } else if (data) {
      setErrors(data);
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))
    history.push(`/users/2`)
  }

  const updateCredential = (e) => {
    setCredential(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/users/${user.id}/`} />;
  }

  return (
    <div className='login-container'>
      <div className='login-header-container'>
        <button className='login-close-btn' onClick={() => onClose(false)} type='button'>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <i className="fa-brands fa-twitter fa-2xl twitter-icon"></i>
      </div>
      <h2 className='login-header-text'>
        Sign in to Tweeter
      </h2>
      <div>
        <button
          className='demo-login-btn demo-user'
          type='submit'
          onClick={demoUser}
        >Continue with Demo User</button>
      </div>
      <div className='container-content-rule'>
        <hr className='horizontal-line line-left'></hr>
        <div className='content-rule-center'> or </div>
        <hr className='horizontal-line line-right'></hr>
      </div>
      <form onSubmit={onLogin}>
        <div className='errors-container'>
          {errors.map((error, ind) => (
            <div className='errors' key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <div className='login-labels'>Email or username</div>
          <input
            name='credentials'
            className='login-field'
            type='text'
            placeholder='Email or username'
            required={true}
            value={credential}
            onChange={updateCredential}
          />
        </div>
        <div>
          <div className='login-labels'>Password</div>
          <input
            name='password'
            className='login-field'
            type='password'
            placeholder='Password'
            required={true}
            value={password}
            onChange={updatePassword}
          />
          <div className='submit-login-container'>
            <button className='login-btn' type='submit'>Log in</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
