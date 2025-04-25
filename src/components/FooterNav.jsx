import React, { useState, useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSearchLocation,
  FaPlusCircle,
  FaHeart,
} from "react-icons/fa";

const FooterNav = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  // Set active link based on URL
  useEffect(() => {
    const path = location.pathname.split("/")[1];
    if (path === "explore") {
      setActiveLink("explore");
    } else if (path === "addspot") {
      setActiveLink("addspot");
    } else if (path === "favorites") {
      setActiveLink("favorites");
    } else {
      setActiveLink("home");
    }
  }, [location]);

  return (
    <footer className="fixed-bottom bg-white border-top">
      <Container fluid>
        <Nav className="d-flex justify-content-around text-center py-2">
          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="/"
              className={`d-flex flex-column align-items-center text-dark ${
                activeLink === "home" ? "active" : ""
              }`}
            >
              <FaHome size={24} />
              <small>home</small>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="/explore"
              className={`d-flex flex-column align-items-center text-dark ${
                activeLink === "explore" ? "active" : ""
              }`}
            >
              <FaSearchLocation size={24} />
              <small>Explore</small>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="/addspot"
              className={`d-flex flex-column align-items-center text-dark ${
                activeLink === "addspot" ? "active" : ""
              }`}
            >
              <FaPlusCircle size={24} />
              <small>Add Spot</small>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="/favorites"
              className={`d-flex flex-column align-items-center text-dark ${
                activeLink === "favorites" ? "active" : ""
              }`}
            >
              <FaHeart size={24} />
              <small>Favorites</small>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </footer>
  );
};

export default FooterNav;
