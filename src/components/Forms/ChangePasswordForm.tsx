import React, { FC, SetStateAction } from 'react';
import { Button, Col, Container, Form as FormBoot, Modal, Row } from "react-bootstrap";
import { Form, useFormikContext } from "formik";
import { ChangePasswordFormikValues } from "../../interfaces/formik/ChangePasswordFormikValues";
import SubmitButton from "../SubmitButton/SubmitButton";

const ChangePasswordForm:FC<{setShowPasswordModal: React.Dispatch<SetStateAction<boolean>>}> = ({setShowPasswordModal}) => {

  const {
    handleChange,
    errors,
    touched,
    values
  } = useFormikContext<ChangePasswordFormikValues>();

  const colClass = `text-secondary`;
  const formClassName = `profile-form-control w-100 rounded-pill bg-dark text-light`;

  return (
    <Form>
      <Modal.Body className={`d-flex justify-content-center`}>

        <FormBoot.Group as={ Row } className={ `w-100` }>
          <FormBoot.Label className={ colClass }>
            Old Password
          </FormBoot.Label>
          <Col className={ `pe-0` }>
            <FormBoot.Control
              className={ formClassName }
              type={ `password` }
              name={ `oldPassword` }
              defaultValue={ values.oldPassword }
              onChange={ handleChange }
              isInvalid={ touched.oldPassword && !!errors.oldPassword }
              isValid={ touched.oldPassword && !errors.oldPassword }
            />
          </Col>
          <Col xs={ 1 } md={ 4 }/>
        </FormBoot.Group>

        <FormBoot.Group as={ Row } className={ `w-100` }>
          <FormBoot.Label className={ colClass }>
            New Password
          </FormBoot.Label>
          <Col className={ `pe-0` }>
            <FormBoot.Control
              className={ formClassName }
              type={ `password` }
              name={ `newPassword` }
              defaultValue={ values.newPassword }
              onChange={ handleChange }
              isInvalid={ touched.newPassword && !!errors.newPassword }
              isValid={ touched.newPassword && !errors.newPassword }
            />
          </Col>
          <Col xs={ 1 } md={ 4 }/>
        </FormBoot.Group>

      </Modal.Body>

      <Modal.Footer as={ Container } className='position-relative d-flex justify-content-center align-items-center'>

        <Button
          className={ `ms-3 w-30` }
          variant={ "outline-light" }
          onClick={ () => setShowPasswordModal( false ) }
        >
          Cancel
        </Button>

        <Button
          className={ `ms-3 w-30` }
          variant={ "outline-danger" }
          type={ "reset" }
        >
          Reset
        </Button>

        <SubmitButton
          className={ `ms-3 w-30` }
          variant={ "outline-success" }

        >
          Save Changes
        </SubmitButton>

      </Modal.Footer>

    </Form>
  );
};

export default ChangePasswordForm;