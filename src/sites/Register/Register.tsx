import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import RegisterCard from "../../components/Card/RegisterCard/RegisterCard";

const Register = () => {
  return (
    <>
      <TopNavbar/>

      <MainContainer className={`bg-secondary-dark d-flex justify-content-center align-items-center`}>
        <RegisterCard/>
      </MainContainer>

      <Footer/>
    </>
  );
};

export default Register;