import React, { FC } from 'react';
import BasicNotification from "./BasicNotification";
import { NotificationModel } from "../../interfaces/models/NotificationModel";

const Notifications: FC<{ notifications: NotificationModel[] | [] }> = ( { notifications } ) => {

  return (
    <>
      {
        notifications.map( ( value, index ) => {
          return <BasicNotification notification={ value } key={ index }/>
        } )
      }
    </>
  );
};

export default Notifications;