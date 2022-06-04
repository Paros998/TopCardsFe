import React, { FC } from 'react';
import { Col } from "react-bootstrap";
import ScoreProgress from "./ScoreProgress";
import { ScoreChartModel } from "../../interfaces/models/ScoreChartModel";

interface ScoreChartProgressProps {
  chart: ScoreChartModel;
  xs: number;
}

const ScoreChartProgress: FC<ScoreChartProgressProps> = ( { chart, xs } ) => {

  const { totalCount, count } = chart || { totalCount: 0, count: [ 0, 0, 0, 0, 0, 0 ] };

  return (
    <Col xs={ xs } className={ `vstack align-items-center justify-content-center` }>

      <ScoreProgress score={ 5 } totalCount={ totalCount } count={ count[ 5 ] }/>

      <ScoreProgress score={ 4 } totalCount={ totalCount } count={ count[ 4 ] }/>

      <ScoreProgress score={ 3 } totalCount={ totalCount } count={ count[ 3 ] }/>

      <ScoreProgress score={ 2 } totalCount={ totalCount } count={ count[ 2 ] }/>

      <ScoreProgress score={ 1 } totalCount={ totalCount } count={ count[ 1 ] }/>

      <ScoreProgress score={ 0 } totalCount={ totalCount } count={ count[ 0 ] }/>

    </Col>
  );
};

export default ScoreChartProgress;