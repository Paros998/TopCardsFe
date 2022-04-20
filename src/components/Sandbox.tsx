import React from 'react';
import TopNavbar from "./TopNavbar/TopNavbar";
import Footer from "./Footer/Footer";
import MainContainer from "./MainContainer/MainContainer";
import FilterButton from "./Buttons/FilterButton";

const Sandbox = () => {
  return (
    <>
      <TopNavbar/>
      <MainContainer className={`bg-secondary-light`}>

        <FilterButton/>

      </MainContainer>
      <Footer/>
    </>
  );
};

export default Sandbox;