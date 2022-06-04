import React, { FC } from 'react';
import CardTemplate from "../CardTemplate";
import TextWithDiamond from "../../TextWithDiamon/TextWithDiamond";
import { Formik } from "formik";
import RegisterForm from "../../Forms/RegisterForm";
import { RegisterFormikValues } from "../../../interfaces/formik/RegisterFormikValues";
import { RegisterFormikInitialValues } from "../../../constants/InitialValues/RegisterFormikInitialValues";
import { RegisterFormValidationSchema } from "../../../constants/validators/RegisterFormValidationSchema";
import Axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface RegisterCardProps {
  className?: string;
}


const RegisterCard: FC<RegisterCardProps> = ( { className } ) => {

  const navigate = useNavigate();

  const BasicUserPhoto = "ffffffff-ffff-eeee-ffff-ffffffffffff";

  const handleSubmit = async ( values: RegisterFormikValues ) => {

    const formData = new FormData();

    const headers = { 'content-type': 'multipart/form-data' };

    let blob: Blob = new Blob( [ values.avatarFile ] );

    formData.append( 'file', blob );

    console.log(formData)

    try {

      //const { data } = await Axios.post( `files/rest/upload`, formData, { headers } );

      await Axios.post( `users/register`, {
        fileId: BasicUserPhoto,
        username: values.username,
        email: values.email,
        password: values.password
      } );

      toast.info( "Registration completed" );

      navigate( '/login' );

    } catch ( e: any ) {

      toast.error( e );

    }

  }

  return (
    <CardTemplate
      className={ `bg-dark d-flex flex-column align-items-start justify-content-end register-card  ${ className }` }>

      <TextWithDiamond
        className={ ` mb-1 card-title` }
        diamondClassName={ `text-light ms-3` }
        headerClassName={ `fw-light fs-3` }
      >
        Sign Up
      </TextWithDiamond>

      <Formik<RegisterFormikValues>
        initialValues={ RegisterFormikInitialValues }
        onSubmit={ handleSubmit }
        validationSchema={ RegisterFormValidationSchema }
      >
        <RegisterForm/>
      </Formik>

    </CardTemplate>
  );
};

export default RegisterCard;