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
  Badge } from 'reactstrap';

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
          <NavbarBrand href="/">Heaven's Elixir</NavbarBrand><Badge color="light" pill>ALPHA v1.0</Badge>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/ItemsDB/">ItemDB</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/BrokerAnalytics/">Broker Analytics</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Discord</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
