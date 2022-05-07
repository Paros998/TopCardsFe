import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {Nav, NavLink} from "react-bootstrap";

const AdminNavBar = () => {
  const navLinkClassName = `text-light border-0 inner-nav col-md-2 col-xs-3 text-center`;

  const {pathname} = useLocation();

  const suggested = '/admin/suggested';
  const cards = '/admin/cards';
  const users = '/admin/users';

  const active = (path:string) => {
    return pathname === path;
  }

  return (
    <Nav className={`nav-tabs fs-3 justify-content-center border-0 inner-nav-media`} >

      <NavLink
        as={Link}
        to={suggested}
        className={`${navLinkClassName} ${active(suggested) && `active-nav`}`}
        disabled={active(suggested)}
      >
        Suggested
      </NavLink>

      <NavLink
        as={Link}
        to={cards}
        className={`${navLinkClassName} ${active(cards) && `active-nav`}`}
        disabled={active(cards)}
      >
        Cards
      </NavLink>

      <NavLink
        as={Link}
        to={users}
        className={`${navLinkClassName} ${active(users) && `active-nav`}`}
        disabled={active(users)}
      >
        Users
      </NavLink>

    </Nav>
  );
};

export default AdminNavBar;