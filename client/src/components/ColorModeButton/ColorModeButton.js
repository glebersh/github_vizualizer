import React from 'react';
import { changeTheme } from '../../store/slices/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import './ColorModeButton.css';
import { themeSelector } from '../../store/selectors';

const ColorModeButton = () => {
  const dispatch = useDispatch();
  const colorTheme = useSelector(themeSelector);

  function toggleTheme() {
    if (colorTheme === 'light') {
      dispatch(changeTheme('dark'));
      localStorage.setItem('colorMode', 'dark');
    }
    else {
      dispatch(changeTheme('light'));
      localStorage.setItem('colorMode', 'light');
    }
  };

  return (
    <button onClick={toggleTheme} className='button color-mode-button'>
      {colorTheme === 'light' ? <i className="bi bi-moon"></i> : <i className="bi bi-sun"></i>}
    </button>
  )
};

export default ColorModeButton;