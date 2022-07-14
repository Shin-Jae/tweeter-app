import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({ onClose }) => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
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
      const data = await dispatch(signUp(name, username, email, birthday, password));
      if (data) {
        setErrors(data)
      }
    }
  };
  // const currDate = new Date().toLocaleDateString();

  useEffect(() => {
    const validationErrors = []
    if (name.length < 3) validationErrors.push("Names should be more than 3 characters");
    if (name.length > 40) validationErrors.push("Names should be less than 40 characters");
    if (username.length < 3) validationErrors.push("Usernames should be more than 3 characters");
    if (username.length > 40) validationErrors.push("Username should be less than 40 characters");
    if (email.length < 3) validationErrors.push("Emails should be more than 3 characters");
    if (email.length > 40) validationErrors.push("Emails should be less than 40 characters");
    if (birthday > curDate) validationErrors.push("Must be valid Date");
    if (password !== repeatPassword) validationErrors.push("Passwords must match")
    if (password.length < 4) validationErrors.push("Passwords must be greater than 4 characters")
    setErrors(validationErrors)
  }, [name, username, email, birthday, password, repeatPassword])

  const getDate = new Date();
  let year = getDate.getFullYear();
  let month = getDate.getMonth();

  if (parseInt(month) < 10) {
    month = `0${month}`
  }
  const date = getDate.getDate();
  const curDate = `${year}-${month}-${date}`

  const updateName = (e) => {
    setName(e.target.value);
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
      <div className='signup-close-btn'>
        <button className='login-close-btn' onClick={() => onClose(false)} type='button'>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <h2 className='login-header-text'>
        Create your account
      </h2>
      <form onSubmit={onSignUp}>

        <div>
          <input
            type='text'
            name='name'
            placeholder='Name'
            className='login-field signup-field'
            onChange={updateName}
            value={name}
            required={true}
          ></input>
        </div>
        <div>
          <input
            type='text'
            name='username'
            placeholder='Handle ex. @new-User'
            className='login-field signup-field'
            onChange={updateUsername}
            required={true}
            value={username}
          ></input>
        </div>
        <div>
          <input
            type='text'
            name='email'
            placeholder='Email'
            className='login-field signup-field'
            onChange={updateEmail}
            required={true}
            value={email}
          ></input>
        </div>
        <div>
          <div>
            <div className='dob-text'><span style={{ fontWeight: 'bold' }}>Date of birth</span> <span style={{ fontStyle: 'italic', color: 'gray' }}>(optional)</span></div>
            <input
              type='date'
              name='birthday'
              className='login-field signup-field'
              onChange={updateBirthday}
              value={birthday}
            ></input>
          </div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            required={true}
            className='login-field signup-field'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='repeat_password'
            placeholder='Confirm Password'
            className='login-field signup-field'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className='errors-container'>
          {errors.map((error, ind) => (
            <div className='errors' key={ind}>{error}</div>
          ))}
        </div>
        <div className='submit-login-container'>
          <button type='submit' className='signup-btn'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
