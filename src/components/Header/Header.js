import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';
import { Consumer } from '../../App';
import logo from './human1.png';
import '../../styles/styles.css';

class Header extends React.Component {
  handleTheme = (theme) => {
    this.props.handleTheme(theme);
  };

  render() {
    return (
      <Consumer>
        {(theme) => (
          <div className={`header ${theme}`}>
            <div>
              <img src={logo} alt='Dev Incubator' />
            </div>
            <Link to='/' className={'btn__header'}>
              {' '}
              LogIn{' '}
            </Link>
            <Link to='/students' className={'btn__header'}>
              {' '}
              Students{' '}
            </Link>
            <Link to='/tasks' className={'btn__header'}>
              {' '}
              Tasks{' '}
            </Link>
            <Link to='/tasksTrack' className={'btn__header'}>
              {' '}
              TasksTrack{' '}
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
