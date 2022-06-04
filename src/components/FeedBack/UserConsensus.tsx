import React, { FC } from 'react';
import StarRatings from 'react-star-ratings';
import { Col } from "react-bootstrap";
import { UserConsensusModel } from "../../interfaces/models/UserConsensusModel";


interface UserConsensusProps {
  consensus: UserConsensusModel;
  xs: number;
}

const UserConsensus: FC<UserConsensusProps> = ( { consensus, xs } ) => {

  return (

    <Col xs={ xs } className={ `vstack align-items-center justify-content-center ` }>

      <div className={ `d-flex align-items-end` }>
          <span className={ `text-light fs-5 fw-bold me-1` }>
            { consensus?.score || 0 }
          </span>

        <span className={ `text-secondary` }>
          / 5.0
          </span>
      </div>

      <div className={ `d-flex` }>
        <StarRatings
          name={ `score` }
          rating={ consensus?.score || 0 }
          starRatedColor={ `gold` }
          starEmptyColor={ `#9A9A9A` }
          starDimension={ `1.5rem` }
        />
      </div>

      <div className={ `text-secondary` }>
        ( { consensus?.totalReviews || 0 } reviews )
      </div>

    </Col>

  );
};

export default UserConsensus;