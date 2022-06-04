import React from 'react';
import {Route, Routes} from "react-router-dom";
import CardDetails from "../../sites/Cards/CardDetails";
import NotFound from "../../components/NotFound/NotFound";
import HomePage from "../../sites/HomePage/HomePage";
import Profile from "../../sites/User/Profile";
import ObservedCards from "../../sites/User/ObservedCards";
import History from "../../sites/User/History";
import NotificationOptions from "../../sites/User/NotificationOptions";
import ManageCards from "../../sites/Admin/ManageCards";
import ManageSuggested from "../../sites/Admin/ManageSuggested";
import ManageUsers from "../../sites/Admin/ManageUsers";
import NewCard from "../../sites/Cards/NewCard";
import EditCard from "../../sites/Cards/EditCard";
import HelpPage from "../../sites/Help/HelpPage";


const AdminViews = () => {
  return (
    <Routes>

      <Route
        path='/'
        element={<HomePage/>}
      />

      <Route
        path='/help'
        element={<HelpPage/>}
      />

      <Route path={`/user`}
      >
        <Route path={`profile`} element={<Profile/>}/>
        <Route path={`observed`} element={<ObservedCards/>}/>
        <Route path={`history`} element={<History/>}/>
        <Route path={`notifications`} element={<NotificationOptions/>}/>
      </Route>

      <Route path={`/admin`}
      >
        <Route path={`suggested`} element={<ManageSuggested/>}/>
        <Route path={`cards`} element={<ManageCards/>}/>
        <Route path={`users`} element={<ManageUsers/>}/>
      </Route>

      <Route
        path={'/card'}
      >
        <Route path={`:cardId`} element={<CardDetails/>}/>
        <Route path={`new`} element={<NewCard/>}/>
        <Route path={`edit/:cardId`} element={<EditCard/>}/>
      </Route>

      <Route
        path='*'
        element={<NotFound/>}
      />

    </Routes>
  );
};

export default AdminViews;