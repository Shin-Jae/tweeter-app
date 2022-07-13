import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Homepage from './components/Homepage';
import { authenticate } from './store/session';
import SingleTweet from './components/SingleTweet';
import RightColumn from './components/RightColumn';
import ProfilePage from './components/ProfilePage';
import SplashPage from './components/SplashPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

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
      <Route path='/' exact={true}>
        <SplashPage />
      </Route>
      {user ?
        <>
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
          </Switch>
          <RightColumn />
        </>
        : null}
    </BrowserRouter>
  );
}

export default App;
