import React from 'react';
import {Button} from "react-bootstrap";
import ProfileCardForm from "../../Forms/ProfileCardForm";
import {RegisterFormikValues} from "../../../interfaces/formik/RegisterFormikValues";
import {Formik} from "formik";
import {useCurrentUser} from "../../../contexts/UserContext/CurrentUserContext";
import {RegisterFormValidationSchema} from "../../../constants/validators/RegisterFormValidationSchema";

const ProfileCard = () => {
  const buttonClass = `rounded-pill mx-2 w-15 editable-button`;

  const {currentUser} = useCurrentUser();

  const initialValues: RegisterFormikValues = {
    avatarFile: currentUser?.avatarFile || "",
    email: currentUser?.email || "",
    password: currentUser?.password || "",
    username: currentUser?.username || ""
  }

  const onSubmit = (values: RegisterFormikValues) => {

  }

  const onDeleteSubmit = () => {

  }

  return (
    <div className={`w-100 d-flex flex-column justify-content-around h-85 overflow-y-scroll thumb-slim thumb-info pb-3 pt-5 pt-md-0`}>

      <Formik<RegisterFormikValues>
        validationSchema={RegisterFormValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        <ProfileCardForm/>
      </Formik>

      <div className={`w-100 d-flex justify-content-evenly align-items-center`}>
        <Button
          className={`${buttonClass}`}
          variant={`outline-primary`}
        >
          Delete Account
        </Button>

      </div>

    </div>
  );
};

export default ProfileCard; 