import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Header.css';
import logo from './human1.png';

function Header() {
  return (
      <div className="header">
        <div> 
          <img src={logo} alt="Dev Incubator"/>
        </div>
        <Link to="/" className = "btn__header" > Home </Link> 
        <Link to="/students" className = "btn__header" > Students </Link> 
        <Link to="/tasks" className = "btn__header" > Tasks </Link> 
        <Link to="/" className = "btn__header" > Contacts </Link> 
      </div>


  );
}


export default Header;
