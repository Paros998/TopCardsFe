import React, { FC } from 'react';
import { Button, Offcanvas, OffcanvasProps, Spinner } from "react-bootstrap";
import { ChevronDoubleDown, XCircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../contexts/NotificationsContext/NotificationsContext";
import Notifications from "../Notification/Notifications";

interface NotificationCanvasProps extends OffcanvasProps {
  handleClose: () => void;
}

const NotificationCanvas: FC<NotificationCanvasProps> = ( {
                                                            handleClose,
                                                            ...props
                                                          } ) => {
  const navigate = useNavigate();

  const { showCanvas, isPending, readNotifications, unReadNotifications } = useNotifications();

  const settingsButton = <Button
    className={ `rounded-card-10 ms-1 ms-xl-2 dark-warning` }
    onClick={ () => {
      handleClose();
      navigate( `/user/notifications` );
    } }
  >
    Adjust Settings
  </Button>;

  const emptyNotificationsSegment = <div
    className={ `d-flex flex-column gap-2 justify-content-center align-items-center text-warning fs-5` }>
    No new notifications, maybe

    <ChevronDoubleDown className={ `fs-4` }/>

    { settingsButton }
  </div>

  let spanFlex = `w-100 d-flex align-items-center`;
  return <Offcanvas show={ showCanvas }
                    onHide={ handleClose }
                    { ...props }
                    backdrop={ false }
                    placement={ `end` }
                    className={ `bg-dark text-light align-items-center border
                     border-primary-light rounded-start-10 top-10 z-index-1001 notification-canvas` }
  >

    <Offcanvas.Header className={ `flex-column w-100 pb-0 text-primary-light` }>

      <span className={ `${ spanFlex } btn-pointer` }
            onClick={ handleClose }
      >

        <Offcanvas.Title className={ 'w-80 text-center ms-3' }>Notifications</Offcanvas.Title>
        <XCircleFill
          style={ { fontSize: "1.5rem" } } className={ `` }/>
      </span>

      <span className={ `${ spanFlex } justify-content-center` }>
        <hr className={ `w-100 ` }/>
      </span>

    </Offcanvas.Header>

    <Offcanvas.Body
      className={ `pt-0 vstack align-items-center justify-content-start pe-1 p-0 overflow-y-scroll  thumb-slim thumb-primary-light mb-3 ps-2 ` }>

      {
        isPending
          ? <Spinner animation={ "border" } variant={ 'danger' } style={ { width: "3rem", height: "3rem" } }/>
          : <>
            <span
              className={ `text-start text-primary-light ms-1 w-100 mb-1  ${ unReadNotifications.length === 0 ? 'd-none' : 'd-block' }` }>
                New notifications
            </span>
            <Notifications notifications={ unReadNotifications || [] }/>
          </>
      }

      {
        !isPending && !( unReadNotifications.length > 0 ) && emptyNotificationsSegment
      }

      <span className={ `${ spanFlex } justify-content-center` }>
        <hr className={ `w-100 ` }/>
      </span>

      {
        !isPending && ( readNotifications.length > 0 ) && <>
            <span className={ `text-start text-light ms-1 w-100 mb-1  ` }>
                Already checked notifications
            </span>
              <Notifications notifications={ readNotifications || [] }/>
          </>
      }

    </Offcanvas.Body>

    <div className={ 'w-100 d-flex justify-content-start align-items-center ps-1 pb-1' }>
      <Button
        className={ '' }
        variant={ "outline-primary-light" }
        onClick={ handleClose }
      >
        Close
      </Button>
    </div>

  </Offcanvas>
};

export default NotificationCanvas;