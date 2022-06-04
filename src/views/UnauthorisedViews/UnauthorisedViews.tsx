import React from 'react';
import NotFound from "../../components/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";
import Login from "../../sites/Login/Login";
import Register from "../../sites/Register/Register";
import CardDetails from "../../sites/Cards/CardDetails";
import HomePage from "../../sites/HomePage/HomePage";
import HelpPage from "../../sites/Help/HelpPage";

const UnauthorisedViews = () => {
  return (
      <Routes>

        <Route
          path='/help'
          element={<HelpPage/>}
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