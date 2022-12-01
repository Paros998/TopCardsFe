import React from 'react';
import './App.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToasterProps } from "./constants/ToasterProps";
import Views from "./views/Views";
import CurrentUserProvider from "./contexts/UserContext/UserContext";
import NotificationsProvider from "./contexts/NotificationsContext/NotificationsContext";

function App() {
  return (
    <>
      <CurrentUserProvider>
        <NotificationsProvider>
          <Views/>
        </NotificationsProvider>
      </CurrentUserProvider>

      <ToastContainer { ...ToasterProps }/>
    </>
  );
}

export default App;
