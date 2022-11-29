import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import UserNavBar from "../../components/InnerNavbar/UserNavBar";
import ProfileCard from "../../components/Card/UserCards/ProfileCard";
import UserCard from "../../components/Card/UserCard";

const Profile = () => {
  return (
    <div className={'vh-100 vw-100'}>
      <TopNavbar/>

      <MainContainer className={`bg-light `}>

        <UserCard>
          <UserNavBar/>
          <ProfileCard/>
        </UserCard>

       <Footer/>
      </MainContainer>

    </div>
  );
};

export default Profile;