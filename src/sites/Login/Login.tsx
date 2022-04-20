import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import Footer from "../../components/Footer/Footer";
import MainContainer from "../../components/MainContainer/MainContainer";
import LoginCard from "../../components/Card/LoginCard/LoginCard";

const Login = () => {
  return (
    <>
      <TopNavbar/>

      <MainContainer className={`bg-secondary-dark d-flex justify-content-center align-items-center`}>
        <LoginCard/>
      </MainContainer>

      <Footer/>
    </>
  );
};

export default Login;