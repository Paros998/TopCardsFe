import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import RegisterCard from "../../components/Card/RegisterCard/RegisterCard";
import CardTemplate from "../../components/Card/CardTemplate";

const Register = () => {
  let cardClassName = `w-100 h-95 d-flex justify-content-center align-items-center`;

  return (
    <div className={ 'vh-100 vw-100' }>
      <TopNavbar/>

      <MainContainer className={ `bg-secondary-light ` }>

        <CardTemplate className={ `${ cardClassName }` }>

          <RegisterCard className={ `h-70 w-70` }/>

        </CardTemplate>

        <Footer/>
      </MainContainer>

    </div>
  );
};

export default Register;