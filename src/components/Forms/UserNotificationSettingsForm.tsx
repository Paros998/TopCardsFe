import React from 'react';
import { Form, useFormikContext } from "formik";
import { UserNotificationSettingsFormikValues } from "../../interfaces/formik/UserNotificationSettingsFormikValues";
import { Button, Col, Form as FormBoot, Row } from "react-bootstrap";
import SubmitButton from "../SubmitButton/SubmitButton";

const UserNotificationSettingsForm = () => {

  const {
    handleChange,
    resetForm,
    values,
    dirty
  } = useFormikContext<UserNotificationSettingsFormikValues>()

  const rowClass = `w-100 my-4 my-md-0`

  return (
    <Form
      className={ `w-75 h-100 justify-content-around align-items-start d-flex flex-column mt-3 mt-sm-0 notification-form fs-4` }
    >
      <span className={ `w-50 text-start fs-2 fw-normal` }>
        Notify when:
      </span>

      <Row className={ rowClass }>
        <Col xs={ 10 }>
          New products are added
        </Col>
        <Col xs={ 2 }>
          <FormBoot.Switch
            className={ `switch-pointer` }
            name={ `isNewProductAdded` }
            checked={ values.isNewProductAdded }
            onChange={ handleChange }
          />
        </Col>
      </Row>

      <Row className={ rowClass }>
        <Col xs={ 10 }>
          Followed product changes status from unavailable to available
        </Col>
        <Col xs={ 2 }>
          <FormBoot.Switch
            className={ `switch-pointer` }
            name={ `hasFollowedProductBecomeAvailableOnline` }
            checked={ values.hasFollowedProductBecomeAvailableOnline }
            onChange={ handleChange }
          />
        </Col>
      </Row>

      <Row className={ rowClass }>
        <Col xs={ 10 }>
          Followed product gets new best offer
        </Col>
        <Col xs={ 2 }>
          <FormBoot.Switch
            className={ `switch-pointer` }
            name={ `hasFollowedProductLowerPriceOffer` }
            checked={ values.hasFollowedProductLowerPriceOffer }
            onChange={ handleChange }
          />
        </Col>
      </Row>

      <Row className={ rowClass }>
        <Col xs={ 10 }>
          Followed product gets a new review
        </Col>
        <Col xs={ 2 }>
          <FormBoot.Switch
            className={ `switch-pointer` }
            name={ `hasFollowedProductNewReview` }
            checked={ values.hasFollowedProductNewReview }
            onChange={ handleChange }
          />
        </Col>
      </Row>

      <Row className={ rowClass }>
        <Col xs={ 10 }>
          Marked product changes status from unavailable to available
        </Col>
        <Col xs={ 2 }>
          <FormBoot.Switch
            className={ `switch-pointer` }
            name={ `hasMarkedProductBecomeAvailableOnline` }
            checked={ values.hasMarkedProductBecomeAvailableOnline }
            onChange={ handleChange }
          />
        </Col>
      </Row>

      <Row className={ rowClass }>
        <Col xs={ 10 }>
          Marked product gets new best offer
        </Col>
        <Col xs={ 2 }>
          <FormBoot.Switch
            className={ `switch-pointer` }
            name={ `hasMarkedProductLowerPriceOffer` }
            checked={ values.hasMarkedProductLowerPriceOffer }
            onChange={ handleChange }
          />
        </Col>
      </Row>

      <Row className={ rowClass }>
        <Col xs={ 10 }>
          Marked product gets a new review
        </Col>
        <Col xs={ 2 }>
          <FormBoot.Switch
            className={ `switch-pointer` }
            name={ `hasMarkedProductNewReview` }
            checked={ values.hasMarkedProductNewReview }
            onChange={ handleChange }
          />
        </Col>
      </Row>

      <div className={ `w-100 d-flex mt-3 justify-content-center` }>
        <SubmitButton
          className={ `rounded-pill me-3 dark-success` }
          disabled={ !dirty }
        >
          Save Changes
        </SubmitButton>

        <Button
          className={ `rounded-pill dark-danger` }
          disabled={ !dirty }

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

export default UserNotificationSettingsForm;