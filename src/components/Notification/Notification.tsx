import React, { useCallback, useEffect, useState } from 'react';
import { BellFill } from "react-bootstrap-icons";
import NotificationCanvas from "../OfCanvas/NotificationCanvas";
import { useFetchData } from "../../hooks/useFetchData";
import { NotificationModel } from "../../interfaces/models/NotificationModel";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { Spinner } from "react-bootstrap";

const Notification = () => {

  const [ showCanvas, setShowCanvas ] = useState<boolean>( false );

  const { currentUser } = useCurrentUser();

  const handleClick = () => setShowCanvas( !showCanvas );
  const handleClose = () => setShowCanvas( false );

  const [ notifications, fetchNotifications, isPending ] = useFetchData<NotificationModel[]>( `/users/${ currentUser?.userId }/notifications` );

  const updateNotifications = useCallback(async () => {
    await fetchNotifications();
  }, [fetchNotifications]);


  useEffect( () => {
    const interval = setInterval(updateNotifications, 30000);
    return () => clearInterval(interval);
  }, [] )

  return (
    <>
      <span
        className={ `bg-light rounded-circle p-1 d-flex justify-content-center align-items-center btn-pointer
         position-absolute notification-span z-index-1000` }
        onClick={ handleClick }
      >

        {
          isPending && <div className={ `w-100 rounded-circle d-flex justify-content-center align-items-center
         text-light position-absolute bottom-80 left-50  bg-dark border border-1 border-light py-1` }>
            <Spinner animation={"border"} variant={`light`} size={"sm"}/>
          </div>
        }

        { !isPending && notifications &&
        <div className={ `w-100 rounded-circle d-flex justify-content-center align-items-center
         text-light position-absolute bottom-80 left-50  bg-dark border border-1 border-light` }>
          { notifications.length > 9 ? '9+' : notifications.length }
        </div>
        }

        <BellFill className={ `${ showCanvas ? `text-primary` : `text-dark` }` }/>
      </span>

      <NotificationCanvas show={ showCanvas }
                          handleClose={ handleClose }
                          notifications={ notifications || [] }
                          isPending={ isPending }/>
    </>
  );
};

export default Notification;