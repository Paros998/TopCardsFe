import React, { useMemo, useState } from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import FilterButton from "../../components/Buttons/FilterButton";
import Footer from "../../components/Footer/Footer";
import FilterCanvas from "../../components/OfCanvas/FilterCanvas";
import Suggested from "../../components/Card/SuggestedCards/Suggested";
import { FilterSquare } from "react-bootstrap-icons";
import MainPageCards from "../../components/Card/MainPageCards/MainPageCards";
import { useFetchData } from "../../hooks/useFetchData";
import { BasicCardModel } from "../../interfaces/models/BasicCardModel";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { PageResponse } from "../../interfaces/PageResponse";
import { PageRequest } from "../../interfaces/PageRequest";
import { FilterCardsFormikValues } from "../../interfaces/formik/FilterCardsFormikValues";
import { FilterCardsInitialValues } from "../../constants/InitialValues/FilterCardsInitialValues";
import { transformArrayToParam } from "../../utils/transformArrayToParam";

interface CardPageRequest extends FilterCardsFormikValues, PageRequest {
  userId?: string;
}

const HomePage = () => {
  const [ showFilters, setShowFilters ] = useState<boolean>( false );

  const [ filters, setFilters ] = useState<FilterCardsFormikValues>( FilterCardsInitialValues );

  const handleClose = () => setShowFilters( false );
  const handleShow = () => setShowFilters( true );

  const { currentUser } = useCurrentUser();

  const [ page, setPage ] = useState<number>( 1 );

  const params: CardPageRequest = useMemo( () => {
    return {
      page: page,
      pageLimit: 12,
      sortBy: "cardId",
      sortDir: "asc",
      userId: currentUser?.userId,
      manufacturer: transformArrayToParam(filters.manufacturer as string[]),
      technology: transformArrayToParam(filters.technology as string[]),
      memory: transformArrayToParam(filters.memory as string[]),
      memoryType: transformArrayToParam(filters.memoryType as string[]),
      outputsType: transformArrayToParam(filters.outputsType as string[]),
      memoryBus: transformArrayToParam(filters.memoryBus as string[]),
      availableLocal: filters.availableLocal,
      availableOnline: filters.availableOnline,
      unavailableLocal: filters.unavailableLocal,
      unavailableOnline: filters.unavailableOnline
    }
  }, [ page, currentUser?.userId, filters ] )

  const [ cards, , isPending ] = useFetchData<PageResponse<BasicCardModel>>( 'cards', { params } );

  let cardClassName = `${ showFilters ? `mw-80` : `mw-90` }  mx-md-3 me-lg-0 pt-0 px-0 card-sm-w-100 h-100`;

  return (
    <>
      <FilterSquare
        className={ `d-block d-md-none position-absolute top-5 left-50 translate-middle text-light z-index-1000 fs-1 btn-pointer ` }
        onClick={ () => setShowFilters( !showFilters ) }
      />

      <TopNavbar/>

      <MainContainer className={ `bg-secondary ` }>

        <FilterCanvas show={ showFilters }
                      handleClose={ handleClose }
                      setFilters={ setFilters }
                      filters={ filters }
                      scroll={ true }
                      backdrop={ false }/>

        <div className={ `w-100 h-30 d-flex flex-md-nowrap row ms-0 justify-content-end card-section` }>

          <FilterButton onClick={ handleShow }
                        className={ `d-none d-md-block mx-2 me-lg-3` }/>

          <Suggested className={ `${ cardClassName }` }/>
        </div>

        <div className={ `w-100 h-70 row pt-1 flex-md-nowrap  ms-0 justify-content-end card-section` }>

          <span style={ { width: "6.5rem", height: "2.5rem" } }
                className={ 'd-none d-md-block me-lg-2' }/>

          <MainPageCards
            className={ cardClassName }
            cards={ cards?.content }
            isPending={ isPending }
            page={ page }
            setPage={ setPage }
            totalPages={ cards?.totalPages }
          />
        </div>

      </MainContainer>
      <Footer/>
    </>
  );
};

export default HomePage;