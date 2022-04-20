import React from 'react';
import {Route, Routes} from "react-router-dom";
import CardDetails from "../../sites/CardDetails/CardDetails";
import NotFound from "../../components/NotFound/NotFound";
import HomePage from "../../sites/HomePage/HomePage";
import {useCurrentUser} from "../../contexts/UserContext/CurrentUserContext";
import Pending from "../../components/Pending/Pending";
import Profile from "../../sites/User/Profile";
import ObservedCards from "../../sites/User/ObservedCards";
import History from "../../sites/User/History";
import NotificationOptions from "../../sites/User/NotificationOptions";


const ClientViews = () => {

  const {isPending} = useCurrentUser();

  if(isPending)
    return <Pending/>

  return (
    <Routes>

      <Route
        path='/'
        element={<HomePage/>}
      />

      <Route path={`/user`}
      >
        <Route path={`profile`} element={<Profile/>}/>
        <Route path={`observed`} element={<ObservedCards/>}/>
        <Route path={`history`} element={<History/>}/>
        <Route path={`notifications`} element={<NotificationOptions/>}/>
      </Route>

      <Route
        path='/card/:cardId'
        element={<CardDetails/>}
      />

      <Route
        path='*'
        element={<NotFound/>}
      />

    </Routes>
  );
};

export default ClientViews;