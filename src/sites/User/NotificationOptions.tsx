import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import UserNavBar from "../../components/InnerNavbar/UserNavBar";
import UserCard from "../../components/Card/UserCard";
import NotificationOptionsCard from "../../components/Card/UserCards/NotificationOptionsCard";

const NotificationOptions = () => {
  return (
    <>
      <TopNavbar/>

      <MainContainer className={`bg-secondary-dark `}>
        <UserCard>
          <UserNavBar/>
          <NotificationOptionsCard/>
        </UserCard>
      </MainContainer>

      <Footer/>
    </>
  );
};

export default NotificationOptions;