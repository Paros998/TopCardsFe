import { Formik } from 'formik';
import React, { useMemo } from 'react';
import { UserNotificationSettingsFormikValues } from "../../../interfaces/formik/UserNotificationSettingsFormikValues";
import UserNotificationSettingsForm from "../../Forms/UserNotificationSettingsForm";
import { useFetchData } from "../../../hooks/useFetchData";
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import { toast } from "react-toastify";
import Axios from "axios";

const NotificationSettingsCard = () => {

  const { currentUser } = useCurrentUser();

  const handleSubmit = async ( values: UserNotificationSettingsFormikValues ) => {
    try {
      await Axios.put( `users/${ currentUser?.userId }/settings`, values );

      toast.success( 'Notification settings updated successfully.' )

      await fetchSettings();
    } catch ( e: any ) {
      toast.error( e )
    }

  }

  const [ settings, fetchSettings ] = useFetchData<UserNotificationSettingsFormikValues>( `users/${ currentUser?.userId }/settings` );

  const initialValues: UserNotificationSettingsFormikValues = useMemo( () => {
    return {
      isNewProductAdded: settings?.isNewProductAdded || false,
      hasFollowedProductBecomeAvailableOnline: settings?.hasFollowedProductBecomeAvailableOnline || false,
      hasFollowedProductLowerPriceOffer: settings?.hasFollowedProductLowerPriceOffer || false,
      hasFollowedProductNewReview: settings?.hasFollowedProductNewReview || false,
      hasMarkedProductBecomeAvailableOnline: settings?.hasMarkedProductBecomeAvailableOnline || false,
      hasMarkedProductLowerPriceOffer: settings?.hasMarkedProductLowerPriceOffer || false,
      hasMarkedProductNewReview: settings?.hasMarkedProductNewReview || false
    }
  }, [ settings ] );

  return (
    <div className={ `w-100 h-90 d-flex flex-column justify-content-start align-items-center fw-light
     overflow-y-scroll thumb-slim thumb-primary pb-3 bg-secondary-dark` }>
      <Formik<UserNotificationSettingsFormikValues>
        onSubmit={ handleSubmit }
        initialValues={ initialValues }
        enableReinitialize
      >
        <UserNotificationSettingsForm/>
      </Formik>

    </div>
  );
};

export default NotificationSettingsCard;