import React from 'react';
import Pending from "../components/Pending/Pending";
import { Roles } from "../interfaces/enums/Roles";
import ClientViews from "./AuthorisedViews/ClientViews";
import AdminViews from "./AuthorisedViews/AdminViews";
import UnauthorisedViews from "./UnauthorisedViews/UnauthorisedViews";
import { useInitAxios } from "../hooks/useInitAxios";
import { useCurrentUser } from "../contexts/UserContext/UserContext";

const Views = () => {
  useInitAxios();
  const { role, isPending } = useCurrentUser();

  if ( isPending )
    return <Pending/>

  if ( role === Roles.RoleClient )
    return <ClientViews/>

  if ( role === Roles.RoleAdmin )
    return <AdminViews/>

  return <UnauthorisedViews/>
};

export default Views;