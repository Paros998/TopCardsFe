import React from 'react';
import { Route, Routes } from "react-router-dom";
import ProductDetails from "../../sites/Products/ProductDetails";
import NotFound from "../../components/NotFound/NotFound";
import HomePage from "../../sites/HomePage/HomePage";
import Profile from "../../sites/User/Profile";
import ObservedProducts from "../../sites/User/ObservedProducts";
import History from "../../sites/User/History";
import NotificationOptions from "../../sites/User/NotificationOptions";
import ManageProducts from "../../sites/Admin/ManageProducts";
import ManageUsers from "../../sites/Admin/ManageUsers";
import NewProduct from "../../sites/Products/NewProduct";
import EditProduct from "../../sites/Products/EditProduct";
import HelpPage from "../../sites/Help/HelpPage";


const AdminViews = () => {
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

      <Route path={ `/admin` }
      >
        <Route path={ `products` } element={ <ManageProducts/> }/>
        <Route path={ `users` } element={ <ManageUsers/> }/>
      </Route>

      <Route
        path={ '/product' }
      >
        <Route path={ `:productId&:productType` } element={ <ProductDetails/> }/>
        <Route path={ `new` } element={ <NewProduct/> }/>
        <Route path={ `edit/:productId&:productType` } element={ <EditProduct/> }/>
      </Route>

      <Route
        path='*'
        element={ <NotFound/> }
      />

    </Routes>
  );
};

export default AdminViews;