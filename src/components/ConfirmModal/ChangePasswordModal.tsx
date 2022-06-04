import React, { FC, SetStateAction } from 'react';
import { Formik } from "formik";
import { Modal } from "react-bootstrap";
import { ChangePasswordFormikValues } from "../../interfaces/formik/ChangePasswordFormikValues";
import ChangePasswordForm from "../Forms/ChangePasswordForm";

interface ChangePasswordModalProps {
  showPasswordModal: boolean;
  setShowPasswordModal: React.Dispatch<SetStateAction<boolean>>;
  onChangePasswordSubmit: ( values: ChangePasswordFormikValues ) => Promise<void>;
}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ( {
                                                              showPasswordModal,
                                                              onChangePasswordSubmit,
                                                              setShowPasswordModal
                                                            } ) => {
  const initialValues: ChangePasswordFormikValues = {
    newPassword: "",
    oldPassword: ""
  }

  return (
    <Modal
      centered
      onHide={ () => setShowPasswordModal( false ) }
      show={ showPasswordModal }
      size='lg'
      contentClassName='rounded-0 border-1 border-light bg-dark  text-light'
    >
      <Modal.Header closeButton>

        <div className={ `d-flex justify-content-center w-100` }>
          <h3>
            Change Password
          </h3>
        </div>

      </Modal.Header>


      <Formik<ChangePasswordFormikValues>
        onSubmit={ onChangePasswordSubmit }
        initialValues={ initialValues }
      >
        <ChangePasswordForm setShowPasswordModal={ setShowPasswordModal }/>
      </Formik>

    </Modal>
  )
    ;
};

export default ChangePasswordModal;