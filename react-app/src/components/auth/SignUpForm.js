import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({ onClose }) => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, username, email, birthday, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateBirthday = (e) => {
    setBirthday(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/users/${user.id}`} />;
  }

  return (
    <div className='signup-container'>
      <div>
        <button className='login-close-btn' onClick={() => onClose(false)} type='button'>x</button>
      </div>
      <h2 className='login-header-text'>
        Create your account
      </h2>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <input
            type='text'
            name='first_name'
            placeholder='Name'
            className='login-field'
            onChange={updateFirstName}
            value={first_name}
          ></input>
        </div>
        {/* <div>
          <label>Last Name</label>
          <input
            type='text'
            name='last_lame'
            // className='login-field'
            onChange={updateLastName}
            value={last_name}
          ></input>
        </div> */}
        <div>
          <input
            type='text'
            name='username'
            placeholder='Handle ex. @new-User'
            className='login-field'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <input
            type='text'
            name='email'
            placeholder='Email'
            className='login-field'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <div>
            <div>Date of birth</div>
            <input
              type='date'
              name='birthday'
              className='login-field'
              onChange={updateBirthday}
              value={birthday}
            ></input>
          </div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='login-field'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='repeat_password'
            placeholder='Confirm Password'
            className='login-field'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className='submit-login-container'>
          <button type='submit' className='signup-btn'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
