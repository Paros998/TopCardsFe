import React from 'react';
import {NotificationsArray} from "../../constants/Notifications/NotificationsArray";
import BasicNotification from "./BasicNotification";

const Notifications = () => {

  return (
    <>
      {
        NotificationsArray.map((value, index) => {
          return <BasicNotification notification={value} key={index}/>
        })
      }
    </>
  );
};

export default Notifications;