import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import HomeCard from "../../components/Card/HomeCard/HomeCard";

const HomePage = () => {
  return (
    <div className={ 'vh-100 vw-100' }>
      <TopNavbar/>

      <MainContainer className={ `bg-light overflow-y-scroll thumb-dark` }>
        <HomeCard/>

        <Footer/>
      </MainContainer>
    </div>
  );
};

export default HomePage;