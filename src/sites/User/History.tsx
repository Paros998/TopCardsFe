import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import UserNavBar from "../../components/InnerNavbar/UserNavBar";
import UserCard from "../../components/Card/UserCard";
import HistoryCard from "../../components/Card/UserCards/HistoryCard";

const History = () => {
  return (
    <>
      <TopNavbar/>

      <MainContainer className={`bg-secondary-dark `}>
        <UserCard>
          <UserNavBar/>
          <HistoryCard/>
        </UserCard>
      </MainContainer>

      <Footer/>
    </>
  );
};

export default History;