import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import UserCard from "../../components/Card/UserCard";
import AdminNavBar from "../../components/InnerNavbar/AdminNavBar";
import ManageAllProducts from "../../components/Card/AdminCards/ManageAllProducts";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {

  const navigate = useNavigate();

  return (
    <div className={ 'vh-100 vw-100' }>
      <TopNavbar/>

      <MainContainer className={ `bg-secondary-dark ` }>

        <UserCard>
          {/*<Button*/ }
          {/*  variant={ `outline-success` }*/ }
          {/*  className={ `rounded-pill w-10 mt-2 position-absolute top-0 left-80` }*/ }
          {/*  onClick={ () => navigate( `/product/new` ) }*/ }
          {/*>*/ }
          {/*  Add New*/ }
          {/*</Button>*/ }

          <AdminNavBar/>

          <ManageAllProducts/>

        </UserCard>

        <Footer/>
      </MainContainer>

    </div>
  );
};

export default ManageProducts;