import React from 'react';
import './Logo.css';

const GitHubLogo = ({ colorTheme, size, onClick }) => {
  return (
    <i className={colorTheme === 'light' ?
      `bi bi-github svg-dark ${size}` : `bi bi-github svg-light ${size}`
    }
      onClick={onClick}></i>
  )
};

export default GitHubLogo;