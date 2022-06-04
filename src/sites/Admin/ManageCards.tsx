import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import UserCard from "../../components/Card/UserCard";
import AdminNavBar from "../../components/InnerNavbar/AdminNavBar";
import ManageAllCards from "../../components/Card/AdminCards/ManageAllCards";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManageCards = () => {

  const navigate = useNavigate();

  return (
    <>
      <TopNavbar/>

      <MainContainer className={`bg-secondary-dark `}>

        <UserCard>
          <Button
            variant={ `outline-success` }
            className={ `rounded-pill w-10 mt-2 position-fixed top-0 left-80` }
            onClick={ () => navigate( `/card/new` ) }
          >
            Add New
          </Button>

          <AdminNavBar/>

          <ManageAllCards/>

        </UserCard>

      </MainContainer>

      <Footer/>
    </>
  );
};

export default ManageCards;