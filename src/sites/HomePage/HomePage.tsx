import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import HomeCard from "../../components/Card/HomeCard/HomeCard";
import { PageRequest } from "../../interfaces/PageRequest";
import { FilterCardsFormikValues } from "../../interfaces/formik/FilterCardsFormikValues";

interface CardPageRequest extends FilterCardsFormikValues, PageRequest {
  userId?: string;
}

const HomePage = () => {

  // const [ filters, setFilters ] = useState<FilterCardsFormikValues>( FilterCardsInitialValues );
  //
  // const handleClose = () => setShowFilters( false );
  // const handleShow = () => setShowFilters( true );
  //
  // const { currentUser } = useCurrentUser();
  //
  // const [ page, setPage ] = useState<number>( 1 );
  //
  // const params: CardPageRequest = useMemo( () => {
  //   return {
  //     page: page,
  //     pageLimit: 12,
  //     sortBy: "cardId",
  //     sortDir: "asc",
  //     userId: currentUser?.userId,
  //     manufacturer: transformArrayToParam(filters.manufacturer as string[]),
  //     technology: transformArrayToParam(filters.technology as string[]),
  //     memory: transformArrayToParam(filters.memory as string[]),
  //     memoryType: transformArrayToParam(filters.memoryType as string[]),
  //     outputsType: transformArrayToParam(filters.outputsType as string[]),
  //     memoryBus: transformArrayToParam(filters.memoryBus as string[]),
  //     availableLocal: filters.availableLocal,
  //     availableOnline: filters.availableOnline,
  //     unavailableLocal: filters.unavailableLocal,
  //     unavailableOnline: filters.unavailableOnline
  //   }
  // }, [ page, currentUser?.userId, filters ] )
  //
  // const [ cards, , isPending ] = useFetchData<PageResponse<BasicCardModel>>( 'cards', { params } );


  return (
    <div className={ 'vh-100 vw-100' }>
      <TopNavbar/>

      <MainContainer className={ `bg-light overflow-y-scroll thumb-dark` }>
        <HomeCard/>

        <Footer/>
      </MainContainer>
    </div>
  );
};

export default HomePage;