import React, {FC} from 'react';
import {ReviewModel} from "../../interfaces/models/ReviewModel";
import {Col, Row} from "react-bootstrap";
import StarRatings from "react-star-ratings";
import {Dot} from "react-bootstrap-icons";
import dayjs, {extend} from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {useCurrentUser} from "../../contexts/UserContext/CurrentUserContext";
import {Roles} from "../../interfaces/enums/Roles";
import CensorUnCensorReview from "./CensorUnCensorReview";

interface ReviewProps {
  review: ReviewModel;
}

const Review: FC<ReviewProps> = ({review}) => {

  const {score, avatar, username, opinion, date, censored} = review;

  dayjs.extend(utc);
  dayjs.extend(tz);
  dayjs.extend(customParseFormat);

  const timezone = dayjs.tz.guess();

  const getDateMessage = (): string => {

    const normalizedDate = dayjs(date, `DD.MM.YYYY`, true).tz(timezone)

    if (dayjs().diff(normalizedDate, `day`) === 0)
      return "Today";

    if (dayjs().diff(normalizedDate, `day`) === 1)
      return "Yesterday";

    if (dayjs().diff(normalizedDate, `month`) > 1)
      return "Less than month ago";

    if (dayjs().diff(normalizedDate, `month`) <= 1 && dayjs().diff(normalizedDate, `month`) > 6)
      return "More than month ago";

    if (dayjs().diff(normalizedDate, `month`) < 6)
      return "Less than half year ago"

    if (dayjs().diff(normalizedDate, `month`) >= 6 && dayjs().diff(normalizedDate, `year`) < 1)
      return "More than half year ago"

    if (dayjs().diff(normalizedDate, `year`) >= 1)
      return "More than year ago"

    return normalizedDate.toString();
  }

  const dateMessage = getDateMessage();

  const {role} = useCurrentUser();

  const isAdmin = role === Roles.RoleAdmin;

  return (
    <Col as={Row} xs={12} className={`hstack my-2`}>

      <Col xs={1}/>

      <Col xs={1}>
        <img
          className={`rounded-circle border border-1 border-light`}
          src={avatar}
          style={{
            width: "100%",
            height: "auto"
          }}
          alt={``}
        />
      </Col>

      <Col xs={1} className={`text-light fs-5 fw-bold`}>
        {username}
      </Col>

      <Col xs={isAdmin ? 8 : 9} className={`vstack gap-2`}>

        <div className={`d-flex align-items-center justify-content-start`}>

          <div className={`d-flex align-items-center justify-content-center pb-2`}>

            <StarRatings
              rating={score}
              starRatedColor={`gold`}
              starEmptyColor={`#9A9A9A`}
              starDimension={`1.2rem`}
            />

          </div>

          <Dot className={`mx-2 text-secondary`}/>

          <span className={`text-secondary d-flex `}>
            {dateMessage}
          </span>

        </div>

        <div className={`text-wrap`}>
          {
            !censored ? opinion :
              <span
                className={`text-danger`}
              >
                Message censored due to inapropriate language usage and violation of good behaviour rules
              </span>
          }
        </div>

      </Col>

      {
        isAdmin &&
        <Col xs={1}>
            <CensorUnCensorReview review={review}/>
        </Col>
      }

    </Col>
  );
};

export default Review;