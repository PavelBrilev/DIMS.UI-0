import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Header.css';
import MembersManageGrid from '../MembersManageGrid/MembersManageGrid.js';

function Link(props) {
  return (
    <div>
      <a href='#'>{props.name}</a>
    </div>
  );
}

function Header() {
  return (
    <div className={classes.header}>
      <div>Logo</div>
      <Link name='Home' />
      <Link name='Member' />
      <Link name='Contacts' />
    </div>
  );
}

/*function Header() {
  return (
    <Navbar bg='dark' variant='dark' fixed='top'>
      <Navbar.Brand href='#home' >Navbar</Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='#home'>Home</Nav.Link>
        <Nav.Link href='#features'>Features</Nav.Link>
        <Nav.Link href='#pricing'>Pricing</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type='text' placeholder='Search' className='mr-sm-2' />
        <Button variant='outline-info'>Search</Button>
      </Form>
    </Navbar>
  );
}*/

export default Header;
