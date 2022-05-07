import React, {FC} from 'react';
import {ReviewModel} from "../../interfaces/models/ReviewModel";
import StarRatings from 'react-star-ratings';
import {Col} from "react-bootstrap";


interface UserConsensusProps {
  reviews: ReviewModel[] | [];
  xs:number;
}

function calculateScore(reviews: ReviewModel[]): number {

  let score: number = 0;

  reviews.map(review => {
    score += review.score;
  })

  score = score / reviews.length;

  return Math.round((score + Number.EPSILON) * 100) / 100

}

const UserConsensus: FC<UserConsensusProps> = ({reviews,xs}) => {

  const score = reviews.length === 0 ? 0 : calculateScore(reviews);

  return (

    <Col xs={xs} className={`vstack align-items-center justify-content-center`}>

      <div className={`d-flex align-items-end`}>
          <span className={`text-light fs-5 fw-bold me-1`}>
            {score}
          </span>

        <span className={`text-secondary`}>
          / 5.0
          </span>
      </div>

      <div className={`d-flex`}>
        <StarRatings
          name={`score`}
          rating={score}
          starRatedColor={`gold`}
          starEmptyColor={`#9A9A9A`}
          starDimension={`1.5rem`}
        />
      </div>

      <div className={`text-secondary`}>
        ( {reviews.length} reviews )
      </div>

    </Col>

  );
};

export default UserConsensus;