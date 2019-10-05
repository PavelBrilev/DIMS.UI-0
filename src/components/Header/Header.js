import React from 'react';
import './Header.css';
import logo from './human1.png';
import ConsumerLink from './ConsumerLink';

function Header() {
  return (
      <div className="header">
        <div> 
          <img src={logo} alt="Dev Incubator"/>
        </div>
        <ConsumerLink to="/" name='LogIn'/>
        <ConsumerLink to="/students" name='Students'/>
        <ConsumerLink to="/tasks" name='Tasks'/>
        <ConsumerLink to="/tasksTrack" name='TasksTrack'/>
      </div>
  );
}

export default Header;
