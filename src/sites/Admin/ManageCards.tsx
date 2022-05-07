import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import UserCard from "../../components/Card/UserCard";
import AdminNavBar from "../../components/InnerNavbar/AdminNavBar";
import ManageAllCards from "../../components/Card/AdminCards/ManageAllCards";

const ManageCards = () => {
  return (
    <>
      <TopNavbar/>

      <MainContainer className={`bg-secondary-dark `}>

        <UserCard>
          <AdminNavBar/>
          <ManageAllCards/>
        </UserCard>

      </MainContainer>

      <Footer/>
    </>
  );
};

export default ManageCards;