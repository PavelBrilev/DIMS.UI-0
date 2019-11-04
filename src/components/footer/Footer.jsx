import React from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import logo from '../../assets/human1.png';
import '../../styles/styles.css';

const Footer = () => {
  const { Consumer } = ThemeContext;
  return (
    <Consumer>
      {(theme) => (
        <div className={`footer ${theme}`}>
          <div>
            <img src={logo} alt='Dev Incubator' />
          </div>
          <span> © Dev Incubator </span>
        </div>
      )}
    </Consumer>
  );
};

export default Footer;
