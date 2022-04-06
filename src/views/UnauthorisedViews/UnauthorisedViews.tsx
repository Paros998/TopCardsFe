import React from 'react';
import NotFound from "../../components/NotFound/NotFound";
import {Route, Routes} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import HomePage from "./HomePage/HomePage";
import CardDetails from "./CardDetails/CardDetails";
import Sandbox from "../../components/Sandbox";

const UnauthorisedViews = () => {
  return (
      <Routes>

        <Route
          path='/sandbox'
          element={<Sandbox/>}
        />

        <Route
          path='/'
          element={<HomePage/>}
        />

        <Route
          path='/card/:cardId'
          element={<CardDetails/>}
        />

        <Route
          path='/login'
          element={<Login/>}
        />

        <Route
          path='/register'
          element={<Register/>}
        />

        <Route
          path='*'
          element={<NotFound/>}
        />

      </Routes>
  );
};

export default UnauthorisedViews;