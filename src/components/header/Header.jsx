import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ThemeSwitcher from '../theme-switcher/ThemeSwitcher';
import { ThemeContext } from '../../context/ThemeContext';

import '../../styles/styles.css';

class Header extends React.PureComponent {
  handleTheme = (theme) => {
    this.props.handleTheme(theme);
  };
  LogOut = () => {
    this.props.LogOut();
  };

  render() {
    const { Consumer } = ThemeContext;

    return (
      <Consumer>
        {(theme) => (
          <div className={`header ${theme}`}>
            <Link to='/students' className='btn__header'>
              Students
            </Link>
            <Link to='/tasks' className='btn__header'>
              Tasks
            </Link>
            <Link to='/tasksTrack' className='btn__header'>
              Tasks Track
            </Link>
            <Link to='/' className='btn__header' onClick={this.LogOut}>
              Log Out
            </Link>
            <ThemeSwitcher handleTheme={this.handleTheme} />
          </div>
        )}
      </Consumer>
    );
  }
}

export default Header;

Header.propTypes = {
  handleTheme: PropTypes.func,
};
