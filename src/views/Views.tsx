import React from 'react';
import {useCurrentUser} from "../contexts/UserContext/CurrentUserContext";
import Pending from "../components/Pending/Pending";
import {Roles} from "../interfaces/enums/Roles";
import ClientViews from "./AuthorisedViews/ClientViews";
import AdminViews from "./AuthorisedViews/AdminViews";
import UnauthorisedViews from "./UnauthorisedViews/UnauthorisedViews";

const Views = () => {
    const user = useCurrentUser();

    if(user?.isPending)
        return <Pending/>

    if(user?.currentUser?.appUserRole === Roles.RoleClient)
        return <ClientViews/>

    if(user?.currentUser?.appUserRole === Roles.RoleAdmin)
        return <AdminViews/>

    return <UnauthorisedViews/>
};

export default Views;