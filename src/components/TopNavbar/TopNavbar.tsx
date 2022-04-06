import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import TopCardsFe from "../../assets/images/logo.png";
import {Link} from "react-router-dom";

const TopNavbar = () => {
  return (
    <Navbar bg='dark' expand='xl' className={`my-0 py-0 sticky-top`}>
      <Container className={`mx-1 min-vw-100`}>

        <Navbar.Brand className={`my-0 py-0`} as={Link} to={'/'}>
          <img src={TopCardsFe} alt={"Top Cards"} className={`h-auto w-75px`}/>
          <span className={`ms-lg-3 ms-md-2 fw-bolder text-light`}>TopCards</span>
          <span className={`text-light fs-5 d-none d-lg-inline-block ms-lg-2`}>  - find your choice available at lowest price</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" id={`nav-toggle`}/>

        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className={`my-3`}>

            <NavDropdown title={`Software`} id={`nav-dropdown`} className={`ms-xl-4 mx-xl-3 `}
                         menuVariant={`dark`}>
              <NavDropdown.Item>
                Hardware-Info
              </NavDropdown.Item>
              <NavDropdown.Item>
                MSI Afterburner
              </NavDropdown.Item>
              <NavDropdown.Item>
                GPU-Z
              </NavDropdown.Item>
              <NavDropdown.Item>
                Nvidia Inspector
              </NavDropdown.Item>
              <NavDropdown.Item>
                Furmark
              </NavDropdown.Item>
              <NavDropdown.Item>
                OpenGL
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={`Producers`} id={`nav-dropdown`} menuVariant={`dark`} >
              <NavDropdown.Item>
                Nvidia Drivers
              </NavDropdown.Item>
              <NavDropdown.Item>
                Amd Drivers
              </NavDropdown.Item>
              <NavDropdown.Item>
                Benchmark Charts
              </NavDropdown.Item>
              <NavDropdown.Item>
                RTXon vs RTXoff
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>

        </Navbar.Collapse>

        <Navbar.Collapse id="basic-navbar-nav " className={`justify-content-end`}>

          <Nav className={`mb-2 mb-xl-0`}>

            <Nav.Link
              className={`text-dark bg-light me-md-1 py-1 border-light border rounded-start-10 light-navLink`}>Sign
              In</Nav.Link>
            <Nav.Link
              className={`text-light bg-dark py-1 border-light border rounded-end-10 dark-navLink me-xl-3`}>Sign
              Up</Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default TopNavbar;