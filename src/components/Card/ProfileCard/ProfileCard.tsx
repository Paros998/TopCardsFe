import React from 'react';
import {Button} from "react-bootstrap";
import ProfileCardForm from "../../Forms/ProfileCardForm";
import {RegisterFormikValues} from "../../../interfaces/formik/RegisterFormikValues";
import {Formik} from "formik";
import {useCurrentUser} from "../../../contexts/UserContext/CurrentUserContext";

const ProfileCard = () => {
  const buttonClass = `rounded-pill mx-2 w-15 editable-button`;

  const {currentUser} = useCurrentUser();

  const initialValues: RegisterFormikValues = {
    avatarFile: currentUser?.avatarFile || "",
    email: currentUser?.email || "",
    password: ``,
    username: currentUser?.username || ""
  }

  const onSubmit = (values: RegisterFormikValues) => {

  }

  const onDeleteSubmit = () => {

  }

  return (
    <div className={`w-100 vstack justify-content-around h-80`}>

      <Formik<RegisterFormikValues>
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