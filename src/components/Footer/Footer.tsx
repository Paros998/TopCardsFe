import React from 'react';
import {useCurrentUser} from "../../contexts/UserContext/CurrentUserContext";
import {Roles} from "../../interfaces/enums/Roles";
import AuthorizedFooter from "./AuthorizedFooter";
import UnauthorizedFooter from "./UnauthorizedFooter";


const Footer = () => {

  const {role} = useCurrentUser();

  if(role === Roles.RoleClient || role === Roles.RoleAdmin)
    return <AuthorizedFooter/>

  return <UnauthorizedFooter/>

};

export default Footer;