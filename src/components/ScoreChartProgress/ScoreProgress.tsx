import React, {FC} from 'react';
import {Col, ProgressBar, Row} from "react-bootstrap";
import {StarFill} from "react-bootstrap-icons";

interface ScoreProgressProps {
  score:number;
  totalCount:number;
  count:number;
}

const ScoreProgress:FC<ScoreProgressProps> = ({score,count,totalCount}) => {

  const percentage = ( count / totalCount ) * 100;

  return (
    <Col xs={12} as={Row} className={`fs-7 align-items-center text-secondary`}>

      <Col xs={2} className={`d-flex justify-content-evenly align-items-center`}>
        <StarFill className={`me-1`}/>
        {score}
      </Col>

      <Col>
        <ProgressBar variant={`dark`} now={percentage} className={`rounded-pill border border-1 border-light rounded-pill-progress`}/>
      </Col>

      <Col xs={1} className={`p-0`}>
        {count}
      </Col>

    </Col>
  );
};

export default ScoreProgress;