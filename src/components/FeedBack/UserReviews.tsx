import React, { FC, SetStateAction } from 'react';
import { ReviewModel } from "../../interfaces/models/ReviewModel";
import Review from "./Review";
import HrBrake from "../Hr/HrBrake";
import { Button, Col } from "react-bootstrap";

interface UserReviewsProps {
  reviews: ReviewModel[] | [];
  fetchReviews: () => Promise<void>;
  setPageLimit: React.Dispatch<SetStateAction<number>>;
  totalPages: number;
}

const UserReviews: FC<UserReviewsProps> = ( { reviews, setPageLimit, fetchReviews, totalPages } ) => {

  if ( reviews.length === 0 )
    return <span className={ `fs-4 text-info fw-bold d-flex justify-content-center` }>
      There is no available reviews
    </span>

  return (
    <>
      {
        reviews.map( ( review, index ) => {
          return <div key={ index }>
            <Review review={ review } fetchReviews={ fetchReviews }/>

            {
              index !== ( reviews.length - 1 ) && <HrBrake/>
            }

          </div>
        } )
      }

      <Col xs={ 12 } className={ `d-flex justify-content-center mt-3` }>
        <Button
          className={ `rounded-pill ` }
          variant={`outline-light`}
          disabled={ totalPages === 1 }
          onClick={ () => setPageLimit( prevState => prevState + 3 ) }
        >
          View more
        </Button>
      </Col>

    </>
  );
};

export default UserReviews;