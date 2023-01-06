import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from '../../pages/LoginPage';
import { setToken } from '../../store/slices/authSlice';
import Header from '../Header';

import './App.css';


const port = 4000;

const App = () => {
  const dispatch = useDispatch();
  const _token = useSelector(state => state.authReducer.authToken);
  const colorTheme = useSelector(state => state.themeReducer);

  useEffect(() => {
    const URL = window.location.search;
    const URL_PARAMS = new URLSearchParams(URL);
    const AUTH_CODE = URL_PARAMS.get('code');


    if (AUTH_CODE && !(localStorage.getItem("accessToken"))) {
      async function getAccessToken() {
        await fetch('http://localhost:' + port + '/getAccessToken?code=' + AUTH_CODE, {
          method: 'GET'
        })
          .then(response => response.json())
          .then(result => {
            localStorage.setItem('accessToken', result.access_token)
          })
          .then(() => dispatch(setToken(localStorage.getItem('accessToken'))));
      }
      getAccessToken();
    } else if (AUTH_CODE && localStorage.getItem("accessToken")) {
      dispatch(setToken(localStorage.getItem('accessToken')));
    }
  }, []);


  return (
    <div className={colorTheme === 'light' ? 'app-container light' : 'app-container dark'}
      data-theme={colorTheme}>
      {_token !== '' ?
        <Header /> : <LoginPage />}
    </div>
  )
};

export default App;