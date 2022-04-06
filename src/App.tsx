import React from 'react';
import './App.css';
import {ToastContainer} from "react-toastify";
import {ToasterProps} from "./constants/ToasterProps";
import Views from "./views/Views";

function App() {
  return (
    <>
      <Views/>

      <ToastContainer {...ToasterProps}/>
    </>
  );
}

export default App;
