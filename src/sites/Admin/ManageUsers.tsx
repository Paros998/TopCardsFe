import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import UserCard from "../../components/Card/UserCard";
import AdminNavBar from "../../components/InnerNavbar/AdminNavBar";
import AllUsers from "../../components/Users/AllUsers";

const ManageUsers = () => {
  return (
    <>
      <TopNavbar/>

      <MainContainer className={`bg-secondary-dark `}>

        <UserCard>
          <AdminNavBar/>
          <AllUsers/>
        </UserCard>

      </MainContainer>

      <Footer/>
    </>
  );
};

export default ManageUsers;