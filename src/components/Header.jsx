import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaRegUser } from "react-icons/fa";
import { FaParking } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand href="#home" className='fs-5 fw-bolder text-white pt-2'><FaParking size={30} className='mb-2'/>arkHunt</Navbar.Brand>
        <Nav className="me-end">
          <Nav.Link href="#profile">
            <FaRegUser size={20} color='white'  className='mb-2'/>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header