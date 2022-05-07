import {Formik} from 'formik';
import React from 'react';
import {UserNotificationsOptionsFormikValues} from "../../../interfaces/formik/UserNotificationsOptionsFormikValues";
import UserNotificationsOptionsForm from "../../Forms/UserNotificationsOptionsForm";

const NotificationOptionsCard = () => {

  const onSubmit = (values:UserNotificationsOptionsFormikValues) => {
    console.log(values)
  }

  const initialValues: UserNotificationsOptionsFormikValues = {
    followedAvailableLocal: false,
    followedAvailableOnline: true,
    followedNewReview: false,
    followedOnlinePriceLowest: true,
    newCardAdded: false

  }

  return (
    <div className={`w-100 h-85 d-flex flex-column justify-content-start align-items-center fw-light
     overflow-y-scroll thumb-slim thumb-primary pb-3`}>
      <Formik<UserNotificationsOptionsFormikValues>
        onSubmit={onSubmit}
        initialValues={initialValues}
      >
        <UserNotificationsOptionsForm/>
      </Formik>

    </div>
  );
};

export default NotificationOptionsCard;