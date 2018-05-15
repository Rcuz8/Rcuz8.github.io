import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';
import { DropdownButton, MenuItem, Button, ButtonToolbar, Navbar, NavItem, NavDropdown, Nav } from 'react-bootstrap';
import EthApp from './EthApp.js';
import App from './App.js';
import AboutUs from './AboutUs.js';
class MyNavBar extends Component {

  handleSelect(selectedKey) {
    if (selectedKey == 1) {
      ReactDOM.render(<App/>, document.getElementById('root'));
    } else if (selectedKey == 2) {
      ReactDOM.render(<EthApp/>, document.getElementById('root'));
    } else if (selectedKey == 3) {
      ReactDOM.render(<AboutUs/>, document.getElementById('root'));
    }

  }

  render() {
    return (
      <Navbar inverse fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a  onClick={() => this.handleSelect(1)}>Cocuzzo</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav onSelect={key => this.handleSelect(key)}>
            <NavItem eventKey={2} href="#">
              Web 3.0
            </NavItem>
            <NavItem eventKey={3} href="#">
              About Us
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem id='ETH_ADDR'>
              ETH Address: DNE
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }


}

export default MyNavBar;
