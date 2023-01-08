import React from 'react';
import AccountInfo from '../AccountInfo/AccountInfo';
import ColorModeButton from '../ColorModeButton';
import Searchbar from '../Searchbar';
import GitHubLogo from '../Logo/Logo';
import './Header.css';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../store/selectors';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const colorTheme = useSelector(themeSelector);
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <header>
      <div className='logo-container'>
        <GitHubLogo
          size='medium'
          colorTheme={colorTheme}
          onClick={navigateToHome} />
      </div>
      <ColorModeButton />
      <Searchbar />
      <AccountInfo />
    </header>
  )
};

export default Header;