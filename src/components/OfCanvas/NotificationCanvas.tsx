import React, { FC } from 'react';
import { Offcanvas, OffcanvasProps, Spinner } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";
import Notifications from "../Notification/Notifications";
import { NotificationModel } from "../../interfaces/models/NotificationModel";

interface NotificationCanvasProps extends OffcanvasProps {
  show: boolean;
  handleClose: () => void;
  notifications: NotificationModel[] | [];
  isPending: boolean;
}

const NotificationCanvas: FC<NotificationCanvasProps> = ( {
                                                            show,
                                                            handleClose,
                                                            notifications,
                                                            isPending,
                                                            ...props
                                                          } ) => {
  let spanFlex = `w-100 d-flex align-items-center`;
  return <Offcanvas show={ show }
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
      className={ `pt-0 vstack align-items-center me-1 p-0 overflow-y-scroll thumb-slim thumb-primary-light mb-5 ps-2 ` }>

      {
        isPending
          ? <Spinner animation={ "border" } variant={ 'danger' } style={ { width: "3rem", height: "3rem" } }/>
          : <Notifications notifications={ notifications }/>
      }

    </Offcanvas.Body>

  </Offcanvas>
};

export default NotificationCanvas;