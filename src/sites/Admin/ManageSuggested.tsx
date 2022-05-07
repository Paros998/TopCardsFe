import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import UserCard from "../../components/Card/UserCard";
import AdminNavBar from "../../components/InnerNavbar/AdminNavBar";
import ManageSuggestedCards from "../../components/Card/AdminCards/ManageSuggestedCards";

const ManageSuggested = () => {
  return (
    <>
      <TopNavbar/>

      <MainContainer className={`bg-secondary-dark `}>

        <UserCard>
          <AdminNavBar/>
          <ManageSuggestedCards/>
        </UserCard>

      </MainContainer>

      <Footer/>
    </>
  );
};

export default ManageSuggested;