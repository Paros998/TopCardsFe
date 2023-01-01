import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import UserNavBar from "../../components/InnerNavbar/UserNavBar";
import UserCard from "../../components/Card/UserCard";
import ObservedProductsCard from "../../components/Card/UserCards/ObservedProductsCard";

const ObservedProducts = () => {
  return (
    <div className={ 'vh-100 vw-100' }>
      <TopNavbar/>

      <MainContainer className={ `bg-secondary-dark ` }>

        <UserCard>
          <UserNavBar/>
          <ObservedProductsCard/>
        </UserCard>

        <Footer/>
      </MainContainer>

    </div>
  );
};

export default ObservedProducts;