import React from 'react';
import { useSelector } from 'react-redux';
import ColorModeButton from '../../components/ColorModeButton';
import GitHubLogo from '../../components/Logo';
import { themeSelector } from '../../store/selectors';

import './LoginPage.css';

const LoginPage = () => {
  const colorTheme = useSelector(themeSelector);
  const CLIENT_ID = 'Iv1.b1610e4ec3f37430';

  function redirectToLogin() {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID);
  };

  return (
    <>
      <ColorModeButton />
      <div className='login-form-container'>
        <GitHubLogo colorTheme={colorTheme} size='large' />
        <h3 className='login-form-title'>
          Login
        </h3>
        <button className='button'
          onClick={redirectToLogin}>Sign in with GitHub</button>
      </div>
    </>
  )
};

export default LoginPage;