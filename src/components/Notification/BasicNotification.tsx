import React, {FC} from 'react';
import {NotificationModel} from "../../interfaces/models/NotificationModel";
import {Button, Col, Container, NavLink, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat';

interface BasicNotificationProps {
  className?:string;
  notification: NotificationModel;
}

const BasicNotification:FC<BasicNotificationProps> = ({notification,className}) => {

  const {date:originalDate, type, message, cardId} = notification;
  dayjs.extend(utc);
  dayjs.extend(tz);
  dayjs.extend(customParseFormat);

  const timezone = dayjs.tz.guess();

  let date = dayjs(originalDate, `DD-MM-YYYY`, true).tz(timezone);
  let dateText;

  const today = dayjs().tz(timezone);
  const yesterday = dayjs().subtract(1, `day`).tz(timezone);


  if(date.isSame(today, `day`))
    dateText = `Today`;
  else if(date.isSame(yesterday, `day`))
    dateText = `Yesterday`;
  else dateText = date.format(`DD.MM.YY`);


  return (
    <NavLink
      as={Link}
      to={`/card/${cardId}`}
      className={`${className} p-0 `}
    >
      <Button
        className={`py-1 rounded-card-10 w-100 mb-3 `}
        variant={`outline-${type}`}
      >
        <Container>
          <Row>
            <Col className={`text-start`} xs={9}>
              {message}
            </Col>

            <Col className={`text-end`} xs={3}>
              {dateText}
            </Col>
          </Row>
        </Container>
      </Button>
    </NavLink>
  );
};

export default BasicNotification;