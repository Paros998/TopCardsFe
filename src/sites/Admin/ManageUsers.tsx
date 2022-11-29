import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import UserCard from "../../components/Card/UserCard";
import AdminNavBar from "../../components/InnerNavbar/AdminNavBar";
import AllUsers from "../../components/Users/AllUsers";

const ManageUsers = () => {
  return (
    <div className={ 'vh-100 vw-100' }>
      <TopNavbar/>

      <MainContainer>

        <UserCard>
          <AdminNavBar/>

          <AllUsers/>
        </UserCard>

        <Footer/>
      </MainContainer>

    </div>
  );
};

export default ManageUsers;