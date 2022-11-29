import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Nav, NavLink } from "react-bootstrap";

const AdminNavBar = () => {
  const navLinkClassName = `text-light border-0 inner-nav col-md-2 col-xs-3 text-center`;

  const { pathname } = useLocation();

  const products = '/admin/products';
  const users = '/admin/users';

  const active = ( path: string ) => {
    return pathname === path;
  }

  return (
    <Nav className={ `nav-tabs fs-3 justify-content-center border-top border-light inner-nav-media h-10 nav` }>

      <NavLink
        as={ Link }
        to={ products }
        className={ `${ navLinkClassName } ${ active( products ) && `active-nav` }` }
        disabled={ active( products ) }
      >
        Products
      </NavLink>

      <NavLink
        as={ Link }
        to={ users }
        className={ `${ navLinkClassName } ${ active( users ) && `active-nav` }` }
        disabled={ active( users ) }
      >
        Users
      </NavLink>

    </Nav>
  );
};

export default AdminNavBar;