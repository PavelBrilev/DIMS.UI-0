import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import logo from './human1.png';

function Header() {
  return (
      <div className="header">
        <div> 
          <img src={logo} alt="Dev Incubator"/>
        </div>
        <Link to="/" className = "btn__header" > LogIn </Link> 
        <Link to="/students" className = "btn__header" > Students </Link> 
        <Link to="/tasks" className = "btn__header" > Tasks </Link> 
        <Link to="/tasksTrack" className = "btn__header" > TasksTrack </Link> 
      </div>
  );
}

export default Header;
