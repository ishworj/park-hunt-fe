import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoginModal from "./modal/LoginModal";

const Header = () => {
  const [showLoginModal, setShowLoginModal]= useState(false);

  return (
    <Navbar
      expand="lg"
      className="bg-primary position-fixed top-0 w-100"
      style={{ zIndex: 1050 }}
    >
      <Container>
        <Navbar.Brand href="#home" className="fs-5 fw-bolder text-white pt-2">
          <FaParking size={30} className="mb-2" />
          arkHunt
        </Navbar.Brand>
        <Nav className="me-end">
          <Nav.Link onClick={() => setShowLoginModal(true)}>
            <FaRegUser size={20} color="white" className="mb-2" />
          </Nav.Link>
        </Nav>
        <LoginModal
          show={showLoginModal}
          onHide={() => setShowLoginModal(false)}
        />
      </Container>
    </Navbar>
  );
};

export default Header;
