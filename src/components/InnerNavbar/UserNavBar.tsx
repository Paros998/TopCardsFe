import React from 'react';
import {Nav, NavLink} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";

const UserNavBar = () => {

  const navLinkClassName = `text-light border-0 inner-nav col-md-2 col-xs-3 text-center`;

  const {pathname} = useLocation();

  const profile = '/user/profile';
  const observed = '/user/observed';
  const history = '/user/history';
  const notifications = '/user/notifications';

  const active = (path:string) => {
    return pathname === path;
  }

  return (
    <Nav className={`nav-tabs fs-3 justify-content-center border-0 inner-nav-media`} >

      <NavLink
        as={Link}
        to={profile}
        className={`${navLinkClassName} ${active(profile) && `active-nav`}`}
        disabled={active(profile)}
      >
        Profile
      </NavLink>

      <NavLink
        as={Link}
        to={observed}
        className={`${navLinkClassName} ${active(observed) && `active-nav`}`}
        disabled={active(observed)}
      >
        Observed
      </NavLink>

      <NavLink
        as={Link}
        to={history}
        className={`${navLinkClassName} ${active(history) && `active-nav`}`}
        disabled={active(history)}
      >
        History
      </NavLink>

      <NavLink
        as={Link}
        to={notifications}
        className={`${navLinkClassName} ${active(notifications) && `active-nav`}`}
        disabled={active(notifications)}
      >
        Notifications
      </NavLink>

    </Nav>
  );
};

export default UserNavBar;