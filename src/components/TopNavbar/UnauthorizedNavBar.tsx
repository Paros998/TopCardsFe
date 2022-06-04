import React from 'react';
import { Container, Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import TopCardsFe from "../../assets/images/logo.png";
import { InfoCircle } from "react-bootstrap-icons";

const UnauthorizedNavBar = () => {

  const inHelpView: boolean = window.location.pathname === `/help`;

  return (
    <Navbar bg='dark'
            expand='xl'
            className={ `my-0 py-0 position-absolute top-0 h-10 z-index-1001` }>
      <Container className={ `px-1 min-vw-100` }>

        <Navbar.Brand className={ `my-0 py-0` }
                      as={ Link }
                      to={ '/' }>

          <img src={ TopCardsFe }
               alt={ "Top Cards" }
               className={ `h-auto w-75px` }/>

          <span className={ `ms-lg-3 ms-md-2 fw-bolder text-light` }>
            TopCards
          </span>

          <span className={ `text-light fs-5 d-none d-md-inline-block ms-2` }>
            - find your choice available at lowest price
          </span>

        </Navbar.Brand>

        <NavLink
          as={ Link }
          to={ '/help' }
          className={ `align-self-center d-flex align-items-center rounded-card-10 gap-0 gap-md-2 dark-light` }
          disabled={ inHelpView }
        >

          <span className={ `d-none d-md-block` }>
            Help
          </span>

          <InfoCircle className={ `fs-5` }/>

        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav"
                       id={ `nav-toggle` }
                       style={ { fontSize: "0.75rem" } }
                       className={ `me-2` }/>

        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className={ `` }>

            <NavDropdown title={ `Software` }
                         id={ `nav-dropdown` }
                         className={ `ms-xl-4 mx-xl-3 text-center` }
                         menuVariant={ `dark` }
            >

              <NavDropdown.Item
                href={ `https://www.hwinfo.com/` }
                target={ `_blank` }
              >
                Hardware-Info
              </NavDropdown.Item>

              <NavDropdown.Item
                href={ `https://www.msi.com/Landing/afterburner/graphics-cards` }
                target={ `_blank` }
              >
                MSI Afterburner
              </NavDropdown.Item>

              <NavDropdown.Item
                href={ `https://www.techpowerup.com/gpuz/` }
                target={ `_blank` }
              >
                GPU-Z
              </NavDropdown.Item>

              <NavDropdown.Item
                href={ `https://nvidia-inspector.softonic.pl/` }
                target={ `_blank` }
              >
                Nvidia Inspector
              </NavDropdown.Item>

              <NavDropdown.Item
                href={ `https://geeks3d.com/furmark/` }
                target={ `_blank` }
              >
                Furmark
              </NavDropdown.Item>

              <NavDropdown.Item
                href={ `https://www.opengl.org/` }
                target={ `_blank` }
              >
                OpenGL
              </NavDropdown.Item>

            </NavDropdown>

            <NavDropdown title={ `Producers` }
                         id={ `nav-dropdown` }
                         menuVariant={ `dark` }
                         className={ `text-center` }>

              <NavDropdown.Item
                href={ `https://www.nvidia.pl/Download/index.aspx` }
                target={ `_blank` }
              >
                Nvidia Drivers
              </NavDropdown.Item>

              <NavDropdown.Item
                href={ `https://www.amd.com/en/support` }
                target={ `_blank` }
              >
                Amd Drivers
              </NavDropdown.Item>

              <NavDropdown.Item
                href={ `https://www.tomshardware.com/reviews/gpu-hierarchy,4388.html` }
                target={ `_blank` }
              >
                Benchmark Charts
              </NavDropdown.Item>

              <NavDropdown.Item
                href={ `https://www.nvidia.com/pl-pl/geforce/rtx/` }
                target={ `_blank` }
              >
                RTXon vs RTXoff
              </NavDropdown.Item>

            </NavDropdown>

          </Nav>

        </Navbar.Collapse>

        <Navbar.Collapse id="basic-navbar-nav "
                         className={ `justify-content-end` }>

          <Nav className={ `mb-2 mb-xl-0` }>

            <Nav.Link
              as={ Link }
              to={ `/login` }
              className={ `text-dark bg-light me-xl-1 py-1 border-light border rounded-start-10 light-navLink text-center` }>
              Sign In
            </Nav.Link>

            <Nav.Link
              as={ Link }
              to={ `/register` }
              className={ `text-light bg-dark py-1 border-light border rounded-end-10 dark-navLink me-xl-3 text-center` }>
              Sign Up
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default UnauthorizedNavBar;