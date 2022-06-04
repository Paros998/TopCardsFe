import { Formik } from 'formik';
import React, { useMemo } from 'react';
import { UserNotificationsOptionsFormikValues } from "../../../interfaces/formik/UserNotificationsOptionsFormikValues";
import UserNotificationsOptionsForm from "../../Forms/UserNotificationsOptionsForm";
import { useFetchData } from "../../../hooks/useFetchData";
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import { toast } from "react-toastify";
import Axios from "axios";

const NotificationOptionsCard = () => {

  const { currentUser } = useCurrentUser();

  const handleSubmit = async ( values: UserNotificationsOptionsFormikValues ) => {

    console.log( values )

    try {

      await Axios.put( `users/${ currentUser?.userId }/settings`, values );

      await fetchSettings();

    } catch ( e: any ) {

      toast.error( e )

    }

  }

  const [ settings, fetchSettings ] = useFetchData<UserNotificationsOptionsFormikValues>( `users/${ currentUser?.userId }/settings` );

  const initialValues: UserNotificationsOptionsFormikValues = useMemo( () => {
    return {
      isNewCardAdded: settings?.isNewCardAdded || false,
      hasFollowedCardBecomeAvailableOnline: settings?.hasFollowedCardBecomeAvailableOnline || false,
      hasFollowedCardLowerOnlinePrice: settings?.hasFollowedCardLowerOnlinePrice || false,
      hasFollowedCardNewReview: settings?.hasFollowedCardNewReview || false,
      hasFollowedCardBecomeAvailableLocally: settings?.hasFollowedCardBecomeAvailableLocally || false
    }
  }, [ settings ] );

  return (
    <div className={ `w-100 h-85 d-flex flex-column justify-content-start align-items-center fw-light
     overflow-y-scroll thumb-slim thumb-primary pb-3` }>
      <Formik<UserNotificationsOptionsFormikValues>
        onSubmit={ handleSubmit }
        initialValues={ initialValues }
        enableReinitialize
      >
        <UserNotificationsOptionsForm/>
      </Formik>

    </div>
  );
};

export default NotificationOptionsCard;