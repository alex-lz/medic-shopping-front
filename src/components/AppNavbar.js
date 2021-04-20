import React, { Component } from 'react';
import { UncontrolledCollapse, Collapse, Nav, Navbar, 
  NavbarBrand, NavbarToggler, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false};
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClick() {
    localStorage.setItem('status', false);
    this.props.history.push('/cart');
  }

  render() {
    let LOGEADO = null;
    let status = localStorage.getItem('status');

    let OPTIONS = <UncontrolledDropdown nav inNavbar>
    <DropdownToggle nav caret>
      Options
    </DropdownToggle>
    <DropdownMenu right>
    <DropdownItem href={"/catalog"}>
        Catálogo
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem href={"/profile-page"}>
        Perfil
      </DropdownItem>
      <DropdownItem onClick={this.handleClick}  href={"/"}>
        Salir
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>;
    
    
    let OPTIONS_LOG = <>
          <NavItem>
            <NavLink href={"/sign-in"}>Iniciar</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={"/sign-up"}>Registrarse</NavLink>
          </NavItem>
          </>;

    status == 'true' ? LOGEADO = OPTIONS : LOGEADO = OPTIONS_LOG;

    return(
    <Navbar color="dark" dark expand="md" id="navbar-main">
      <NavbarBrand href={"/"}>MedicShopping</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {LOGEADO}
        </Nav>
      </Collapse>
    </Navbar>);
  }
}

export default withRouter(AppNavbar);