import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../store/slices/authSlice';
import TestComp from './test';

const CLIENT_ID = 'Iv1.b1610e4ec3f37430';
const port = 4000;

function redirectToLogin() {
  window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID);
};

const App = () => {
  const dispatch = useDispatch();
  const _token = useSelector(state => state.authReducer);


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
    _token ?

      <>
        < h1 > Title</h1 >
        <button onClick={redirectToLogin}>
          Login with GitHub
        </button>
      </>

      : <TestComp />
  )
};

export default App;