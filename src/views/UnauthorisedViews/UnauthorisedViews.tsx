import React from 'react';
import NotFound from "../../components/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";
import Login from "../../sites/Login/Login";
import Register from "../../sites/Register/Register";
import ProductDetails from "../../sites/Products/ProductDetails";
import HomePage from "../../sites/HomePage/HomePage";
import HelpPage from "../../sites/Help/HelpPage";
import DatabaseOfProducts from "../../sites/Products/DatabaseOfProducts";
import SpecificSearchProducts from "../../sites/Products/SpecificSearchProducts";

const UnauthorisedViews = () => {
  return (
    <Routes>

      <Route
        path='/help'
        element={ <HelpPage/> }
      />

      <Route
        path='/'
        element={ <HomePage/> }
      />

      <Route
        path='/products/:productType'
        element={ <DatabaseOfProducts/> }
      />

      <Route
        path='/products/for-:usage'
        element={ <SpecificSearchProducts/> }
      />

      <Route
        path='/product/:productId&:productType'
        element={ <ProductDetails/> }
      />

      <Route
        path='/login'
        element={ <Login/> }
      />

      <Route
        path='/register'
        element={ <Register/> }
      />

      <Route
        path='*'
        element={ <NotFound/> }
      />

    </Routes>
  );
};

export default UnauthorisedViews;