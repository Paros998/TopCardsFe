import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import UserNavBar from "../../components/InnerNavbar/UserNavBar";
import ProfileCard from "../../components/Card/UserCards/ProfileCard";
import UserCard from "../../components/Card/UserCard";

const Profile = () => {
  return (
    <>
      <TopNavbar/>

      <MainContainer className={`bg-secondary-dark `}>

        <UserCard>
          <UserNavBar/>
          <ProfileCard/>
        </UserCard>

      </MainContainer>

      <Footer/>
    </>
  );
};

export default Profile;