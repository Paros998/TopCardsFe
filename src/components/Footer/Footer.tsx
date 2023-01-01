import React from 'react';

import { Roles } from "../../interfaces/enums/Roles";
import AuthorizedFooter from "./AuthorizedFooter";
import UnauthorizedFooter from "./UnauthorizedFooter";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";


const Footer = () => {

  const { role } = useCurrentUser();

  if ( role === Roles.RoleClient || role === Roles.RoleAdmin )
    return <AuthorizedFooter/>

  return <UnauthorizedFooter/>

};

export default Footer;