import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import logo from './human1.png';
import { Consumer } from '../../App';


function Header() {
  return (
      <div className="header">
        <div> 
          <img src={logo} alt="Dev Incubator"/>
        </div>
        <Consumer>
            { value => <Link to="/" className = {`btn__header ${value}`} > LogIn </Link> }
        </Consumer>
        <Consumer>
            { value => <Link to="/students" className = {`btn__header ${value}`} > Students </Link> }
        </Consumer>
        <Consumer>
            { value => <Link to="/tasks" className = {`btn__header ${value}`} > Tasks </Link> }
        </Consumer>
        <Consumer>
            { value => <Link to="/tasksTrack" className = {`btn__header ${value}`} > TasksTrack </Link> }
        </Consumer>
      </div>
  );
}

export default Header;
