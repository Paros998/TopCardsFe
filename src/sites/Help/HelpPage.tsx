import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import BackButtonArrowCircle from "../../components/BackButton/BackButtonArrowCircle";
import Helps from "../../components/Help/Helps";
import Links from "../../components/Help/Links";

const HelpPage = () => {
  return (
    <>
      <TopNavbar/>

      <MainContainer
        className={ `bg-secondary-dark overflow-y-scroll thumb-light thumb-1002 vstack ps-6 align-items-start gap-3` }>

        <BackButtonArrowCircle className={ `position-absolute left-2 top-13` } arrowSize={ `fs-1` }/>

        <h2 className={ `fw-light mb-4` }>
          Help Page
        </h2>

        <Links/>

        <span className={`w-100`}>
          <hr/>
        </span>

        <Helps/>

        <span className={`w-100`}>
          <hr/>
        </span>

      </MainContainer>

      <Footer/>
    </>
  );
};

export default HelpPage;