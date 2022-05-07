import React, {FC} from 'react';
import {ReviewModel} from "../../interfaces/models/ReviewModel";
import {Col} from "react-bootstrap";
import ScoreProgress from "./ScoreProgress";

interface ScoreChartProgressProps {
  reviews: ReviewModel[] | [];
  xs:number;
}

function countScore(reviews: ReviewModel[], score: number): number {

  return reviews.filter(review => review.score === score).length;

}

const ScoreChartProgress: FC<ScoreChartProgressProps> = ({reviews,xs}) => {

  const count = reviews.length;

  return (
    <Col xs={xs} className={`vstack align-items-center justify-content-center`}>

      <ScoreProgress score={5} totalCount={count} count={countScore(reviews,5)}/>

      <ScoreProgress score={4} totalCount={count} count={countScore(reviews,4)}/>

      <ScoreProgress score={3} totalCount={count} count={countScore(reviews,3)}/>

      <ScoreProgress score={2} totalCount={count} count={countScore(reviews,2)}/>

      <ScoreProgress score={1} totalCount={count} count={countScore(reviews,1)}/>

      <ScoreProgress score={0} totalCount={count} count={countScore(reviews,0)}/>

    </Col>
  );
};

export default ScoreChartProgress;