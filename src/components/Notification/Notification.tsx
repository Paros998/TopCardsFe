import React from 'react';
import { BellFill } from "react-bootstrap-icons";
import NotificationCanvas from "../OfCanvas/NotificationCanvas";
import { Spinner } from "react-bootstrap";
import { useNotifications } from "../../contexts/NotificationsContext/NotificationsContext";

const Notification = () => {

  const { unReadNotifications, isPending, showCanvas, setShowCanvas } = useNotifications();

  const handleClick = () => setShowCanvas( !showCanvas );
  const handleClose = () => setShowCanvas( false );

  return (
    <>
      <span
        className={ `bg-light rounded-circle p-1 d-flex justify-content-center align-items-center btn-pointer
         position-relative notification-span z-index-1000` }
        onClick={ handleClick }
      >

        {
          isPending && <div className={ `w-100 rounded-circle d-flex justify-content-center align-items-center
         text-light position-absolute bottom-80 left-50  bg-dark border border-1 border-light py-1` }>
                <Spinner animation={ "border" } variant={ `light` } size={ "sm" }/>
            </div>
        }

        { !isPending && unReadNotifications &&
            <div className={ `w-100 rounded-circle d-flex justify-content-center align-items-center
         text-light position-absolute bottom-80 left-50  bg-dark border border-1 border-light` }>
              { unReadNotifications.length > 9 ? '9+' : unReadNotifications.length }
            </div>
        }

        <BellFill className={ `${ showCanvas ? `text-primary` : `text-dark` }` }/>
      </span>

      <NotificationCanvas handleClose={ handleClose }/>
    </>
  );
};

export default Notification;