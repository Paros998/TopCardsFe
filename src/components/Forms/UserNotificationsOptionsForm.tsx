import React from 'react';
import {Form, useFormikContext} from "formik";
import {UserNotificationsOptionsFormikValues} from "../../interfaces/formik/UserNotificationsOptionsFormikValues";
import {Button, Col, Form as FormBoot, Row} from "react-bootstrap";

const UserNotificationsOptionsForm = () => {

  const {handleChange, resetForm, values, dirty} = useFormikContext<UserNotificationsOptionsFormikValues>()

  const rowClass = `w-100 my-4 my-md-0 `

  return (
    <>
      <Form
        className={`w-50 h-90 justify-content-around align-items-start d-flex flex-column mt-3 mt-sm-0 notification-form`}
      >
      <span className={`w-50 text-start fs-4 fw-normal`}>
        Notify when:
      </span>

        <Row className={rowClass}>
          <Col xs={10}>
            New cards are added
          </Col>
          <Col xs={2}>
            <FormBoot.Switch
              className={`switch-pointer`}
              name={`newCardAdded`}
              checked={values.newCardAdded}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className={rowClass}>
          <Col xs={10}>
            Followed card changes status from unavailable to available locally
          </Col>
          <Col xs={2}>
            <FormBoot.Switch
              className={`switch-pointer`}
              name={`followedAvailableLocal`}
              checked={values.followedAvailableLocal}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className={rowClass}>
          <Col xs={10}>
            Followed card changes status from unavailable to available online
          </Col>
          <Col xs={2}>
            <FormBoot.Switch
              className={`switch-pointer`}
              name={`followedAvailableOnline`}
              checked={values.followedAvailableOnline}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className={rowClass}>
          <Col xs={10}>
            Followed card gets a new review
          </Col>
          <Col xs={2}>
            <FormBoot.Switch
              className={`switch-pointer`}
              name={`followedNewReview`}
              checked={values.followedNewReview}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className={rowClass}>
          <Col xs={10}>
            Followed card lowest online price changes
          </Col>
          <Col xs={2}>
            <FormBoot.Switch
              className={`switch-pointer`}
              name={`followedOnlinePriceLowest`}
              checked={values.followedOnlinePriceLowest}
              onChange={handleChange}
            />
          </Col>
        </Row>

      </Form>

      <div className={`w-100 d-flex mt-3 justify-content-center ${dirty ? `d-block` : `d-none`}`}>
        <Button
          className={`rounded-pill me-3`}
          variant={`outline-secondary`}
          type={`submit`}
        >
          Save Changes
        </Button>

        <Button
          className={`rounded-pill`}
          variant={`outline-danger`}
          type={`reset`}
          onClick={() => {
            resetForm();
          }}
        >
          Discard Changes
        </Button>
      </div>

    </>
  );
};

export default UserNotificationsOptionsForm;