import React from 'react';
import { Route, Routes } from "react-router-dom";
import ProductDetails from "../../sites/Products/ProductDetails";
import NotFound from "../../components/NotFound/NotFound";
import HomePage from "../../sites/HomePage/HomePage";
import Pending from "../../components/Pending/Pending";
import Profile from "../../sites/User/Profile";
import ObservedProducts from "../../sites/User/ObservedProducts";
import History from "../../sites/User/History";
import NotificationOptions from "../../sites/User/NotificationOptions";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import HelpPage from "../../sites/Help/HelpPage";
import DatabaseOfProducts from "../../sites/Products/DatabaseOfProducts";
import SpecificSearchProducts from "../../sites/Products/SpecificSearchProducts";


const ClientViews = () => {

  const { isPending } = useCurrentUser();

  if ( isPending )
    return <Pending/>

  return (
    <Routes>

      <Route
        path='/'
        element={ <HomePage/> }
      />

      <Route
        path='/help'
        element={ <HelpPage/> }
      />

      <Route path={ `/user` }
      >
        <Route path={ `profile` } element={ <Profile/> }/>
        <Route path={ `observed` } element={ <ObservedProducts/> }/>
        <Route path={ `history` } element={ <History/> }/>
        <Route path={ `notifications` } element={ <NotificationOptions/> }/>
      </Route>

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
        path='*'
        element={ <NotFound/> }
      />

    </Routes>
  );
};

export default ClientViews;