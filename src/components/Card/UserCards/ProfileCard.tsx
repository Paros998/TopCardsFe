import React, { useMemo, useState } from 'react';
import { Button } from "react-bootstrap";
import ProfileCardForm from "../../Forms/ProfileCardForm";
import { Formik } from "formik";
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import * as yup from "yup";
import { ProfileCardFormikValues } from "../../../interfaces/formik/ProfileCardFormikValues";
import { toast } from "react-toastify";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChangePasswordFormikValues } from "../../../interfaces/formik/ChangePasswordFormikValues";
import DeleteAccountModal from "../../ConfirmModal/DeleteAccountModal";
import ChangePasswordModal from "../../ConfirmModal/ChangePasswordModal";

const ProfileCard = () => {

  const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>( false );
  const [ showPasswordModal, setShowPasswordModal ] = useState<boolean>( false );

  const buttonClass = `rounded-pill mx-2 w-15 editable-button`;

  const { currentUser, fetchUser } = useCurrentUser();

  const navigate = useNavigate();

  const initialValues: ProfileCardFormikValues = useMemo( () => {
    return {
      email: currentUser?.email || "",
      username: currentUser?.username || ""
    }
  }, [ currentUser ] )


  const onSubmit = async ( values: ProfileCardFormikValues ) => {

    try {

      await Axios.put( `users/${ currentUser?.userId }`, values );

      await fetchUser();

    } catch ( e: any ) {

      toast.error( e );

    } finally {

      toast.success( "Profile updated successfully" );

    }

  }

  const onDeleteSubmit = async () => {

    try {

      await Axios.delete( `users/${ currentUser?.userId }` );

      await fetchUser();

      setShowDeleteModal( false );

      toast.info( "Account has been deleted" );

    } catch ( e: any ) {

      toast.error( e );

    } finally {

      navigate( "/" );

    }

  }

  const onChangePasswordSubmit = async ( values: ChangePasswordFormikValues ) => {

    try {

      await Axios.put( `users/${ currentUser?.userId }/change-password`, values );

      setShowPasswordModal( false );

      toast.success( "Changed password successfully" );

    } catch ( e: any ) {

      if ( e.response.status !== 400 && e.response.status !== 409 )
        toast.error( e.response.data.message );
      else toast.info( e.response.data.message );

    }

  }

  const ProfileFormValidationSchema = yup.object().shape( {
    username: yup.string()
      .required( `Username cannot be empty` ).min( 6, `Username must have at least 6 symbols` ),
    email: yup.string()
      .required( `Email cannot be empty` ).min( 6, `Email must have at least 6 symbols` ).email( `This email is incorrect` )
  } );

  return (
    <div
      className={ `w-100 bg-secondary-dark d-flex flex-column justify-content-around h-90 overflow-y-scroll thumb-slim thumb-info pb-3 pt-5 pt-md-0` }>

      <Formik<ProfileCardFormikValues>
        validationSchema={ ProfileFormValidationSchema }
        initialValues={ initialValues }
        onSubmit={ onSubmit }
        enableReinitialize
      >
        <ProfileCardForm/>
      </Formik>

      <div className={ `w-100 d-flex justify-content-center align-items-center` }>

        <Button
          className={ `${ buttonClass } dark-primary` }
          onClick={ () => setShowDeleteModal( true ) }
        >
          Delete Account
        </Button>

        <Button
          className={ `${ buttonClass } dark-success` }
          onClick={ () => setShowPasswordModal( true ) }
        >
          Change Password
        </Button>

      </div>

      <DeleteAccountModal showDeleteModal={ showDeleteModal }
                          setShowDeleteModal={ setShowDeleteModal }
                          onDeleteSubmit={ onDeleteSubmit }/>

      <ChangePasswordModal showPasswordModal={ showPasswordModal }
                           setShowPasswordModal={ setShowPasswordModal }
                           onChangePasswordSubmit={ onChangePasswordSubmit }/>

    </div>
  );
};

export default ProfileCard; 