import React from 'react';
import {useCurrentUser} from "../../contexts/UserContext/CurrentUserContext";
import {Link, useNavigate} from "react-router-dom";
import Avatar from "../../assets/images/user_avatar.png";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import TopCardsFe from "../../assets/images/logo.png";
import ImageButtonDropdown from "../Buttons/ImageButtonDropdown";

import Admin from "../../assets/images/admin_avatar.png";

const AdminNavBar = () => {

  const {handleLogout, currentUser} = useCurrentUser();
  const navigate = useNavigate();

  let image;

  if(currentUser)
    image = currentUser.avatarFile;
  else image = Avatar;

  return (
    <Navbar bg='dark'
            expand='xl'
            className={`my-0 py-0 position-absolute top-0 h-10 `}>
      <Container className={`px-1 min-vw-100`}>

        <Navbar.Brand className={`my-0 py-0`}
                      as={Link}
                      to={'/'}>

          <img src={TopCardsFe}
               alt={"Top Cards"}
               className={`h-auto w-75px`}/>

          <span className={`ms-lg-3 ms-md-2 fw-bolder text-light`}>
            TopCards
          </span>

          <span className={`text-light fs-5 d-none d-md-inline-block ms-2`}>
            - find your choice available at lowest price
          </span>

        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav"
                       id={`nav-toggle`}
                       style={{fontSize: "0.75rem"}}
                       className={`me-2`}/>

        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className={``}>

            <NavDropdown title={`Software`}
                         id={`nav-dropdown`}
                         className={`ms-xl-4 mx-xl-3 text-center`}
                         menuVariant={`dark`}
            >

              <NavDropdown.Item
                href={`https://www.hwinfo.com/`}
                target={`_blank`}
              >
                Hardware-Info
              </NavDropdown.Item>

              <NavDropdown.Item
                href={`https://www.msi.com/Landing/afterburner/graphics-cards`}
                target={`_blank`}
              >
                MSI Afterburner
              </NavDropdown.Item>

              <NavDropdown.Item
                href={`https://www.techpowerup.com/gpuz/`}
                target={`_blank`}
              >
                GPU-Z
              </NavDropdown.Item>

              <NavDropdown.Item
                href={`https://nvidia-inspector.softonic.pl/`}
                target={`_blank`}
              >
                Nvidia Inspector
              </NavDropdown.Item>

              <NavDropdown.Item
                href={`https://geeks3d.com/furmark/`}
                target={`_blank`}
              >
                Furmark
              </NavDropdown.Item>

              <NavDropdown.Item
                href={`https://www.opengl.org/`}
                target={`_blank`}
              >
                OpenGL
              </NavDropdown.Item>

            </NavDropdown>

            <NavDropdown title={`Producers`}
                         id={`nav-dropdown`}
                         menuVariant={`dark`}
                         className={`text-center`}>

              <NavDropdown.Item
                href={`https://www.nvidia.pl/Download/index.aspx`}
                target={`_blank`}
              >
                Nvidia Drivers
              </NavDropdown.Item>

              <NavDropdown.Item
                href={`https://www.amd.com/en/support`}
                target={`_blank`}
              >
                Amd Drivers
              </NavDropdown.Item>

              <NavDropdown.Item
                href={`https://www.tomshardware.com/reviews/gpu-hierarchy,4388.html`}
                target={`_blank`}
              >
                Benchmark Charts
              </NavDropdown.Item>

              <NavDropdown.Item
                href={`https://www.nvidia.com/pl-pl/geforce/rtx/`}
                target={`_blank`}
              >
                RTXon vs RTXoff
              </NavDropdown.Item>

            </NavDropdown>

          </Nav>

        </Navbar.Collapse>

        <Navbar.Collapse id="basic-navbar-nav "
                         className={`justify-content-end`}>

          <Nav className={`mb-2 mb-xl-0 align-items-center`}>

            <ImageButtonDropdown
              src={Admin}
              className={`px-xxl-5 px-xl-2 admin-img-dropdown`}
              imageClassName={`admin-img`}
              dropdownClassName={`admin-dropdown`}
              onClick={() => navigate(`/admin/suggested`)}
            >
              <Button
                variant={`dark`}
                onClick={() => navigate(`/admin/suggested`)}
              >
                Suggested
              </Button>

              <Button
                variant={`dark`}
                onClick={() => navigate(`/admin/cards`)}
              >
                Cards
              </Button>

              <Button
                variant={`dark`}
                onClick={() => navigate(`/admin/users`)}
              >
                Users
              </Button>
            </ImageButtonDropdown>

            <ImageButtonDropdown
              src={image}
              className={`px-xxl-5 px-xl-2 user-img-dropdown`}
              imageClassName={`user-img`}
              dropdownClassName={`user-dropdown`}
              onClick={() => navigate(`/user/profile`)}
            >

              <Button
                variant={`dark`}
                onClick={() => navigate(`/user/profile`)}
              >
                Profile
              </Button>

              <Button
                variant={`dark`}
                onClick={() => navigate(`/user/observed`)}
              >
                Observed Cards
              </Button>

              <Button
                variant={`dark`}
                onClick={() => navigate(`/user/history`)}
              >
                History
              </Button>

              <Button
                variant={`dark`}
                onClick={() => navigate(`/user/notifications`)}
              >
                Notifications
              </Button>

            </ImageButtonDropdown>

            <Button
              className={`text-light h-60 bg-dark border-1 border-light border py-1 dark-navLink rounded-card-10 mx-xl-1 mx-xxl-3`}
              onClick={handleLogout}
              variant={`light`}
            >
              Logout
            </Button>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default AdminNavBar;