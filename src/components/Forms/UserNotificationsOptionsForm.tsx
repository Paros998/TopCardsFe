import React from 'react';
import { Form, useFormikContext } from "formik";
import { UserNotificationsOptionsFormikValues } from "../../interfaces/formik/UserNotificationsOptionsFormikValues";
import { Button, Col, Form as FormBoot, Row } from "react-bootstrap";
import SubmitButton from "../SubmitButton/SubmitButton";

const UserNotificationsOptionsForm = () => {

  const {
    handleChange,
    resetForm,
    values,
    dirty
  } = useFormikContext<UserNotificationsOptionsFormikValues>()

  const rowClass = `w-100 my-4 my-md-0`

  return (
      <Form
        className={ `w-50 h-100 justify-content-around align-items-start d-flex flex-column mt-3 mt-sm-0 notification-form` }
      >
      <span className={ `w-50 text-start fs-4 fw-normal` }>
        Notify when:
      </span>

        <Row className={ rowClass }>
          <Col xs={ 10 }>
            New cards are added
          </Col>
          <Col xs={ 2 }>
            <FormBoot.Switch
              className={ `switch-pointer` }
              name={ `isNewCardAdded` }
              checked={ values.isNewCardAdded }
              onChange={ handleChange }
            />
          </Col>
        </Row>

        <Row className={ rowClass }>
          <Col xs={ 10 }>
            Followed card changes status from unavailable to available locally
          </Col>
          <Col xs={ 2 }>
            <FormBoot.Switch
              className={ `switch-pointer` }
              name={ `hasFollowedCardBecomeAvailableLocally` }
              checked={ values.hasFollowedCardBecomeAvailableLocally }
              onChange={ handleChange }
            />
          </Col>
        </Row>

        <Row className={ rowClass }>
          <Col xs={ 10 }>
            Followed card changes status from unavailable to available online
          </Col>
          <Col xs={ 2 }>
            <FormBoot.Switch
              className={ `switch-pointer` }
              name={ `hasFollowedCardBecomeAvailableOnline` }
              checked={ values.hasFollowedCardBecomeAvailableOnline }
              onChange={ handleChange }
            />
          </Col>
        </Row>

        <Row className={ rowClass }>
          <Col xs={ 10 }>
            Followed card gets a new review
          </Col>
          <Col xs={ 2 }>
            <FormBoot.Switch
              className={ `switch-pointer` }
              name={ `hasFollowedCardNewReview` }
              checked={ values.hasFollowedCardNewReview }
              onChange={ handleChange }
            />
          </Col>
        </Row>

        <Row className={ rowClass }>
          <Col xs={ 10 }>
            Followed card lowest online price changes
          </Col>
          <Col xs={ 2 }>
            <FormBoot.Switch
              className={ `switch-pointer` }
              name={ `hasFollowedCardLowerOnlinePrice` }
              checked={ values.hasFollowedCardLowerOnlinePrice }
              onChange={ handleChange }
            />
          </Col>
        </Row>


        <div className={ `w-100 d-flex mt-3 justify-content-center ${ dirty ? `d-block` : `d-none` }` }>
          <SubmitButton
            className={ `rounded-pill me-3` }
            variant={ `outline-secondary` }
          >
            Save Changes
          </SubmitButton>

          <Button
            className={ `rounded-pill` }
            variant={ `outline-danger` }
            type={ `reset` }
            onClick={ () => {
              resetForm();
            } }
          >
            Discard Changes
          </Button>
        </div>

      </Form>
  );
};

export default UserNotificationsOptionsForm;