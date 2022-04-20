import React, {useState} from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import FilterButton from "../../components/Buttons/FilterButton";
import Footer from "../../components/Footer/Footer";
import FilterCanvas from "../../components/OfCanvas/FilterCanvas";
import SuggestedCards from "../../components/Card/SuggestedCards/SuggestedCards";
import {FilterSquare} from "react-bootstrap-icons";
import MainPageCards from "../../components/Card/MainPageCards/MainPageCards";
import {BasicCards} from "../../constants/CardsModels/BasicCards";

const HomePage = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const handleClose = () => setShowFilters(false);
  const handleShow = () => setShowFilters(true);

  let cardClassName = `${showFilters ? `mw-80` : `mw-90`}  mx-md-3 me-lg-0 pt-0 px-0 card-sm-w-100 h-100`;
  return (
    <>
      <FilterSquare
        className={`d-block d-md-none position-absolute top-5 left-50 translate-middle text-light z-index-1000 fs-1 btn-pointer `}
        onClick={() => setShowFilters(!showFilters)}
      />

      <TopNavbar/>

      <MainContainer className={`bg-secondary `}>

        <FilterCanvas show={showFilters}
                      handleClose={handleClose}
                      scroll={true}
                      backdrop={false}/>

        <div className={`w-100 h-30 d-flex flex-md-nowrap row ms-0 justify-content-end card-section`}>

          <FilterButton onClick={handleShow}
                        className={`d-none d-md-block mx-2 me-lg-3`}/>

          <SuggestedCards className={`${cardClassName}`} cards={BasicCards}/>
        </div>

        <div className={`w-100 h-70 row pt-1 flex-md-nowrap  ms-0 justify-content-end card-section`}>

          <span style={{width: "6.5rem", height: "2.5rem"}}
                className={'d-none d-md-block me-lg-2'}/>

          <MainPageCards className={cardClassName} cards={BasicCards}/>
        </div>

      </MainContainer>
      <Footer/>
    </>
  );
};

export default HomePage;