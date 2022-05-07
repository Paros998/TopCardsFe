import React, {useState} from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import UserCard from "../../components/Card/UserCard";
import Footer from "../../components/Footer/Footer";
import BackButtonArrowCircle from "../../components/BackButton/BackButtonArrowCircle";
import {useParams} from "react-router-dom";
import {Formik} from "formik";
import CardNewOrEditForm from "../../components/Forms/CardNewOrEditForm";
import {CardDetailsModel} from "../../interfaces/models/CardDetailsModel";
import {DetailedCards} from "../../constants/CardsModels/DetailedCards";
import CardNotFound from "../../components/NotFound/CardNotFound";
import {Button} from "react-bootstrap";

const EditCard = () => {

  const [editable, setEditable] = useState<boolean>(true);

  const {cardId} = useParams<string>();

  const onSubmit = () => {

  }

  const card = DetailedCards.find(card => card.id === cardId)

  if (!card)
    return (
      <CardNotFound cardId={cardId as string}/>
    );

  return (
    <>
      <TopNavbar/>

      <MainContainer className={`bg-secondary-dark `}>

        <UserCard className={`vstack`}>

          <div className={`h-5 hstack`}>

            <BackButtonArrowCircle/>

            <span className={`w-100 fs-3 fw-light ps-4 align-items-center d-flex mt-1`}>
                Edit Card
              </span>

            <Button
              className={`w-10 rounded-card-10 mt-3 me-2`}
              variant={`outline-info`}
              disabled={editable}
              onClick={() => setEditable(true)}
            >
              Toggle Edit
            </Button>

          </div>

          <Formik<CardDetailsModel>
            initialValues={card}
            onSubmit={onSubmit}
          >
            <CardNewOrEditForm isNewCard={false} editable={editable} setEditable={setEditable}/>
          </Formik>

        </UserCard>

      </MainContainer>

      <Footer/>
    </>
  );
};

export default EditCard;