import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Homepage from './components/Homepage';
import { authenticate } from './store/session';
import SingleTweet from './components/SingleTweet';
import RightColumn from './components/RightColumn';
import ProfilePage from './components/ProfilePage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Route path='/login' exact={true}>
        <LoginForm />
      </Route>
      <Route path='/sign-up' exact={true}>
        <SignUpForm />
      </Route>
      <NavBar />
      <Switch>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <Homepage />
        </ProtectedRoute>
        <ProtectedRoute path='/:userId/tweets/:tweetId' exact={true} >
          <SingleTweet />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/:userId/:profileId' exact={true} >
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
      <RightColumn />
    </BrowserRouter>
  );
}

export default App;
