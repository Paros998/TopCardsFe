import React, {FC} from 'react';
import {LoginFormikValues} from "../../../interfaces/formik/LoginFormikValues";
import CardTemplate from "../CardTemplate";
import TextWithDiamond from "../../TextWithDiamon/TextWithDiamond";
import {Formik} from "formik";
import RegisterForm from "../../Forms/RegisterForm";
import {RegisterFormikValues} from "../../../interfaces/formik/RegisterFormikValues";
import {RegisterFormikInitialValues} from "../../../constants/InitialValues/RegisterFormikInitialValues";
import {RegisterFormValidationSchema} from "../../../constants/validators/RegisterFormValidationSchema";

interface RegisterCardProps {
  className?:string;
}

const RegisterCard: FC<RegisterCardProps> = ({className}) => {
  const handleSubmit = async (values:LoginFormikValues) => {
    console.log(values);
  }

  return (
    <CardTemplate className={`bg-dark d-flex flex-column align-items-start justify-content-end register-card  ${className}`}>

      <TextWithDiamond
        className={` mb-1 card-title`}
        diamondClassName={`text-light ms-3`}
        headerClassName={`fw-light fs-3`}
      >
        Sign Up
      </TextWithDiamond>

      <Formik<RegisterFormikValues>
        initialValues={RegisterFormikInitialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterFormValidationSchema}
      >
        <RegisterForm/>
      </Formik>

    </CardTemplate>
  );
};

export default RegisterCard;