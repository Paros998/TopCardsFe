import React, {useState} from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import UserCard from "../../components/Card/UserCard";
import Footer from "../../components/Footer/Footer";
import BackButtonArrowCircle from "../../components/BackButton/BackButtonArrowCircle";
import {useParams} from "react-router-dom";
import {DetailedCards} from "../../constants/CardsModels/DetailedCards";
import CardNotFound from "../../components/NotFound/CardNotFound";
import {Button} from "react-bootstrap";
import {Formik} from "formik";
import {CardDetailsModel} from "../../interfaces/models/CardDetailsModel";
import CardNewOrEditForm from "../../components/Forms/CardNewOrEditForm";
import {useCurrentUser} from "../../contexts/UserContext/CurrentUserContext";
import {Roles} from "../../interfaces/enums/Roles";
import FollowUnFollowCard from "../../components/Buttons/FollowUnFollowCard";
import HrBrake from "../../components/Hr/HrBrake";
import FeedBackCard from "../../components/FeedBack/FeedBackCard";
import LocalStores from "../../components/LocalStores/LocalStores";
import OnlineStores from "../../components/OnlineStores/OnlineStores";


const CardDetails = () => {

  const [editable, setEditable] = useState<boolean>(false);

  const {role} = useCurrentUser();

  const {cardId} = useParams<string>();

  const onSubmitEdit = () => {

  }

  const card = DetailedCards.find(card => card.id === cardId);

  if (!card)
    return <CardNotFound cardId={cardId as string}/>;

  return (
    <>
      <TopNavbar/>

      <MainContainer className={`bg-secondary-dark `}>

        <UserCard className={`d-flex flex-column overflow-y-scroll thumb-slim thumb-light `}>

          <div className={`d-flex position-fixed w-95 bg-dark pb-2`}>

            <BackButtonArrowCircle/>

            <span className={` fs-3 fw-light ps-4 align-items-center d-flex mt-1`}>
                Card Details
              </span>

            <FollowUnFollowCard/>

            <Button
              className={` rounded-card-10 mt-2 position-absolute right-1  ${role !== Roles.RoleAdmin && `d-none`}`}
              variant={`outline-info`}
              disabled={editable}
              onClick={() => setEditable(true)}
            >
              Toggle Edit
            </Button>

          </div>

          <Formik<CardDetailsModel>
            initialValues={card}
            onSubmit={onSubmitEdit}
          >
            <CardNewOrEditForm isNewCard={false} editable={editable} setEditable={setEditable} inDetails={true}/>
          </Formik>

          <HrBrake/>

          <FeedBackCard card={card}/>

          <HrBrake/>

          <LocalStores cardId={card.id as string}/>

          <HrBrake/>

          <OnlineStores cardId={card.id as string}/>

        </UserCard>

      </MainContainer>

      <Footer/>
    </>
  );
};

export default CardDetails;