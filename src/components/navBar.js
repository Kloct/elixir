import React from 'react';
import '../App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar style={{backgroundColor: '#1b1b1e'}} dark expand="md" fixed="top">
          <NavbarBrand href="/">Heaven's Elixir</NavbarBrand><Badge color="light" pill>ALPHA v1.1</Badge>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Broker Analytics
                </DropdownToggle>
                <DropdownMenu style={{backgroundColor: '#1b1b1e'}} right>
                  <DropdownItem className="dropdown-item">
                    <NavLink href="/Market/">Market</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/Items/">Items</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/Sellers/">Sellers</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/">Discord</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/ItemsDB/">ItemsDB</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/ChangeLog/">Change Log</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
