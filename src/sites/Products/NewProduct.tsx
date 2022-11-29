import React, { useState } from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import UserCard from "../../components/Card/UserCard";
import Footer from "../../components/Footer/Footer";
import BackButtonArrowCircle from "../../components/BackButton/BackButtonArrowCircle";
import { Formik } from 'formik';
import { CardInitialValues } from "../../constants/InitialValues/CardInitialValues";
import CardNewOrEditForm from "../../components/Forms/CardNewOrEditForm";
import { CardDetailsModel } from "../../interfaces/models/CardDetailsModel";
import { toast } from "react-toastify";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {

  const [ editable, setEditable ] = useState<boolean>( true );

  const navigate = useNavigate();

  const onSubmit = async ( values: CardDetailsModel ) => {

    try {

      const { data } = await Axios.post( '/cards', {
        ...values,
        cardPhoto: "ffffffff-ffff-ffff-ffff-ffffffffffff"
      } );

      toast.success('Card added successfully');

      navigate(`/card/${data}`);

    } catch ( e: any ) {

      toast.error( e );

    }
  }

  return (
    <>
      <TopNavbar/>

      <MainContainer className={ `bg-secondary-dark ` }>

        <UserCard className={ `vstack` }>

          <div className={ `h-5 hstack` }>

            <BackButtonArrowCircle/>

            <span className={ `w-100 fs-3 fw-light ps-4 align-items-center d-flex mt-1` }>
                New Card
              </span>

          </div>

          <Formik<CardDetailsModel>
            initialValues={ CardInitialValues }
            onSubmit={ onSubmit }
          >
            <CardNewOrEditForm isNewCard={ true } editable={ editable } setEditable={ setEditable }/>
          </Formik>

        </UserCard>

      </MainContainer>

      <Footer/>
    </>
  );
};

export default NewProduct;