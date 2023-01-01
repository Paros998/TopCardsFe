import React, { FC } from 'react';
import { useNotifications } from "../../../contexts/NotificationsContext/NotificationsContext";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ChevronDoubleRight } from "react-bootstrap-icons";

interface NotificationsReminderProps {

}

const NotificationsReminder: FC<NotificationsReminderProps> = () => {

  const { unReadNotifications, isPending, showCanvas, setShowCanvas } = useNotifications();

  const navigate = useNavigate();

  const handleClick = () => setShowCanvas( !showCanvas );

  const rowClass = 'bg-dark text-light rounded-card-10 align-items-center' +
    ' my-1 py-2 mx-auto w-50 ps-1 ps-md-3 mh-75px mnh-75px ';

  const colClass = `d-flex justify-content-center align-items-center`;

  if ( isPending )
    return (
      <Row className={ rowClass }>
        <Col xs={ 12 } className={ colClass }>
          <span>
            Checking Your notifications...
          </span>

          <Spinner className={ `ms-3` } animation={ "border" } variant={ "info" }/>
        </Col>
      </Row>
    );

  const notificationsNotEmpty = unReadNotifications?.length > 0;

  const canvasButton = <Button
    className={ `rounded-card-10 ms-3 ms-xl-5 dark-info` }
    onClick={ handleClick }
  >
    { showCanvas ? `Close Notifications` : `Check Notifications` }
  </Button>;

  const settingsButton = <Button
    className={ `rounded-card-10 ms-1 ms-xl-2 dark-warning` }
    onClick={ () => navigate( `/user/notifications` ) }
  >
    Adjust Settings
  </Button>;

  return (
    <Row className={ rowClass }>
      <Col xs={ 12 } className={ colClass }>
        <span>
          { notificationsNotEmpty ? `You have ${ unReadNotifications.length } unread notifications` : `No new notifications, maybe` }
        </span>

        { !notificationsNotEmpty && <ChevronDoubleRight className={ `text-warning ms-1 fs-4` }/> }

        { notificationsNotEmpty ? canvasButton : settingsButton }

      </Col>
    </Row>
  )
};

export default NotificationsReminder;