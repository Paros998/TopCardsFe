import React, {FC} from 'react';
import {ReviewModel} from "../../interfaces/models/ReviewModel";
import Review from "./Review";
import HrBrake from "../Hr/HrBrake";
import {Button, Col} from "react-bootstrap";

interface UserReviewsProps {
  reviews: ReviewModel[] | [];
}

const UserReviews: FC<UserReviewsProps> = ({reviews}) => {

  if(reviews.length === 0)
    return <span className={`fs-4 text-info fw-bold d-flex justify-content-center`}>
      There is no available reviews
    </span>

  return (
    <>
      {
        reviews.map((review, index) => {
          return <div key={index}>
            <Review review={review}/>

            {
              index !== (reviews.length - 1) && <HrBrake/>
            }

          </div>
        })
      }

      <Col xs={12} className={`d-flex justify-content-center mt-3`}>
        <Button
          className={`rounded-pill`}
          variant={`secondary-light`}
        >
          View more
        </Button>
      </Col>

    </>
  );
};

export default UserReviews;