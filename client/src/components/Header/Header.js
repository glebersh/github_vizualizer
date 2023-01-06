import React from 'react';
import AccountInfo from '../AccountInfo/AccountInfo';
import ColorModeButton from '../ColorModeButton';
import Searchbar from '../Searchbar';
import GitHubLogo from '../Logo/Logo';
import './Header.css';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../store/selectors';

const Header = () => {
  const colorTheme = useSelector(themeSelector);
  return (
    <header>
      <GitHubLogo size='medium' colorTheme={colorTheme} />
      <ColorModeButton />
      <Searchbar />
      <AccountInfo />
    </header>
  )
};

export default Header;