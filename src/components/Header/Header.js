import React from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import logo from './human1.png';
import { Button } from '../GeneralElements/GeneralElements.js';
import MembersManageGrid from '../MembersManageGrid/MembersManageGrid.js';


function Header() {
  return (
    <div className="header">
      <div> 
        <img src={logo} alt="Dev Incubator"/>
      </div>
      <Button className = "btn__header" name='Home' />
      <Button className = "btn__header" name='Members' />
      <Button className = "btn__header" name='Tasks' />
      <Button className = "btn__header" name='Contacts' />
    </div>
  );
}


export default Header;
