import React from 'react';
import './App.css';
import {ToastContainer} from "react-toastify";
import {ToasterProps} from "./constants/ToasterProps";
import Views from "./views/Views";
import CurrentUserProvider from "./contexts/UserContext/CurrentUserContext";

function App() {
  return (
    <>
      <CurrentUserProvider>
        <Views/>
      </CurrentUserProvider>

      <ToastContainer {...ToasterProps}/>
    </>
  );
}

export default App;