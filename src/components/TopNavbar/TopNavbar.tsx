import React from 'react';
import {useCurrentUser} from "../../contexts/UserContext/CurrentUserContext";
import UnauthorizedNavBar from "./UnauthorizedNavBar";
import {Roles} from "../../interfaces/enums/Roles";
import ClientNavBar from "./ClientNavBar";
import AdminNavBar from "./AdminNavBar";

const TopNavbar = () => {
  const {role} = useCurrentUser();

  if(role === Roles.RoleClient)
    return <ClientNavBar/>

  if(role === Roles.RoleAdmin)
    return <AdminNavBar/>

  return <UnauthorizedNavBar/>
};

export default TopNavbar;