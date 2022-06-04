import React, { useEffect, useState } from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import UserCard from "../../components/Card/UserCard";
import Footer from "../../components/Footer/Footer";
import BackButtonArrowCircle from "../../components/BackButton/BackButtonArrowCircle";
import { useParams } from "react-router-dom";
import CardNotFound from "../../components/NotFound/CardNotFound";
import { Button, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { CardDetailsModel } from "../../interfaces/models/CardDetailsModel";
import CardNewOrEditForm from "../../components/Forms/CardNewOrEditForm";
import { Roles } from "../../interfaces/enums/Roles";
import FollowUnFollowCard from "../../components/Buttons/FollowUnFollowCard";
import HrBrake from "../../components/Hr/HrBrake";
import FeedBackCard from "../../components/FeedBack/FeedBackCard";
import LocalStores from "../../components/LocalStores/LocalStores";
import OnlineStores from "../../components/OnlineStores/OnlineStores";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { useFetchData } from "../../hooks/useFetchData";
import Axios from "axios";


const CardDetails = () => {

  const [ editable, setEditable ] = useState<boolean>( false );
  const [ historyCreated, setHistoryCreated ] = useState<boolean>( false );

  const { role, currentUser } = useCurrentUser();

  const { cardId } = useParams<string>();

  const onSubmitEdit = async ( values: CardDetailsModel ) => {

  }

  const [ card, fetchCard, isPending ] = useFetchData<CardDetailsModel>( `/cards/${ cardId }` );

  useEffect( () => {

    if ( card && currentUser && !historyCreated )
      Axios.post( '/history',
        {
          action: "checkCard",
          content: card.cardId,
          userId: currentUser.userId
        }
      ).then( () => setHistoryCreated( true ) )

  }, [ card, currentUser ] )

  if ( isPending )
    return <div className={ `d-flex align-items-center justify-content-center h-100 w-100` }>
      <Spinner animation={ "border" } variant={ 'light' }/>
    </div>

  if ( !isPending && !card )
    return <CardNotFound cardId={ cardId as string }/>;

  return (
    <>
      <TopNavbar/>

      <MainContainer className={ `bg-secondary-dark ` }>

        <UserCard className={ `d-flex flex-column overflow-y-scroll thumb-slim thumb-light ` }>

          <div className={ `d-flex position-fixed w-95 bg-dark pb-2 z-index-1000` }>

            <BackButtonArrowCircle/>

            <span className={ ` fs-3 fw-light ps-4 align-items-center d-flex mt-1` }>
                Card Details
              </span>

            { role !== undefined && <FollowUnFollowCard cardId={ cardId as string }/> }

            <Button
              className={ ` rounded-card-10 mt-2 position-absolute right-1  ${ role !== Roles.RoleAdmin && `d-none` }` }
              variant={ `outline-info` }
              disabled={ editable }
              onClick={ () => setEditable( true ) }
            >
              Toggle Edit
            </Button>

          </div>

          <Formik<CardDetailsModel>
            initialValues={ card }
            onSubmit={ onSubmitEdit }
          >
            <CardNewOrEditForm isNewCard={ false } editable={ editable } setEditable={ setEditable }
                               inDetails={ true }/>
          </Formik>

          <HrBrake/>

          <FeedBackCard card={ card }/>

          <HrBrake/>

          {/*TODO fix weird glitch while loading details*/ }
          <LocalStores cardId={ card.cardId as string }/>

          <HrBrake/>

          <OnlineStores cardId={ card.cardId as string }/>

        </UserCard>

      </MainContainer>

      <Footer/>
    </>
  );
};

export default CardDetails;