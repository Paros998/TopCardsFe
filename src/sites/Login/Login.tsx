import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import Footer from "../../components/Footer/Footer";
import MainContainer from "../../components/MainContainer/MainContainer";
import LoginCard from "../../components/Card/LoginCard/LoginCard";
import CardTemplate from "../../components/Card/CardTemplate";

const Login = () => {
  let cardClassName = `w-100 h-95 d-flex justify-content-center align-items-center`;

  return (
    <div className={ 'vh-100 vw-100 ' }>
      <TopNavbar/>

      <MainContainer className={ `bg-secondary-light ` }>

        <CardTemplate className={ `${ cardClassName }` }>

          <LoginCard className={ `h-70 w-auto` }/>

        </CardTemplate>

        <Footer/>
      </MainContainer>

    </div>
  );
};

export default Login;