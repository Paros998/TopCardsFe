import React from 'react';
import './App.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToasterProps } from "./constants/ToasterProps";
import Views from "./views/Views";
import CurrentUserProvider from "./contexts/UserContext/UserContext";
import NotificationsProvider from "./contexts/NotificationsContext/NotificationsContext";
import NavbarProvider from "./contexts/NavbarsContext/NavbarContext";
import { BackgroundProvider } from "./contexts/BackgroundContext";

function App() {
  return (
    <>
      <CurrentUserProvider>
        <NotificationsProvider>
          <NavbarProvider>
            <BackgroundProvider>
              <Views/>
            </BackgroundProvider>
          </NavbarProvider>
        </NotificationsProvider>
      </CurrentUserProvider>

      <ToastContainer { ...ToasterProps }/>
    </>
  );
}

export default App;
