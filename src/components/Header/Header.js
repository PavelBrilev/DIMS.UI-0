import React from 'react';
import '../../styles/styles.css';
import logo from './human1.png';
import { Link } from "react-router-dom";
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { Consumer } from '../../App';
import PropTypes from 'prop-types';

class Header extends React.Component {

  handleTheme = (theme) => {
    this.props.handleTheme(theme);
  }

  render() {
  return (
    <Consumer>
      {theme => (
      <div className={`header ${theme}`}>
        <div> 
          <img src={logo} alt="Dev Incubator"/>
        </div>
        <Link to="/" className = {'btn__header'} > LogIn </Link>
        <Link to="/students"  className = {'btn__header'} > Students </Link>
        <Link to="/tasks" className = {'btn__header'} > Tasks </Link>
        <Link to="/tasksTrack" className = {'btn__header'} > TasksTrack </Link>
        <ThemeSwitcher handleTheme={this.handleTheme}/>
      </div>
      )}
    </Consumer>
  );
}
}

export default Header;

Header.propTypes = {
  handleTheme: PropTypes.func
};