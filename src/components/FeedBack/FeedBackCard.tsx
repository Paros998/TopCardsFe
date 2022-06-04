import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Row, Spinner } from "react-bootstrap";
import { ReviewModel } from "../../interfaces/models/ReviewModel";
import UserConsensus from "./UserConsensus";
import ScoreChartProgress from "../ScoreChartProgress/ScoreChartProgress";
import AddOpinion from "../AddOpinion/AddOpinion";
import { CardDetailsModel } from "../../interfaces/models/CardDetailsModel";
import UserReviews from "./UserReviews";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { useFetchData } from "../../hooks/useFetchData";
import { PageResponse } from "../../interfaces/PageResponse";
import { PageRequest } from "../../interfaces/PageRequest";
import { UserConsensusModel } from "../../interfaces/models/UserConsensusModel";
import { ScoreChartModel } from "../../interfaces/models/ScoreChartModel";

interface FeedBackCardProps {
  card: CardDetailsModel;
}

const FeedBackCard: FC<FeedBackCardProps> = ( { card } ) => {

  const { cardId } = card;

  const [ pageLimit, setPageLimit ] = useState<number>( 3 );

  const params: PageRequest = useMemo( () => {
    return {
      page: 1,
      pageLimit: pageLimit,
      sortDir: "desc",
      sortBy: "reviewDate"
    }
  }, [ pageLimit ] );

  const { currentUser } = useCurrentUser();

  const [ reviews, fetchReviews, isPendingReviews ] = useFetchData<PageResponse<ReviewModel>>( `/reviews/card/${ cardId }`, { params } );

  const [ consensus, fetchConsensus, isPendingConsensus ] = useFetchData<UserConsensusModel>( `/reviews/card/${ cardId }/user-consensus` );

  const [ chart, fetchChart, isPendingChart ] = useFetchData<ScoreChartModel>( `/reviews/card/${ cardId }/chart` );

  const [ userReview, fetchUserReview, isPendingUserReview ] = useFetchData<ReviewModel>( `/reviews/card/${ cardId }/user/${ currentUser?.userId }` );

  const updateReviews = useCallback( async () => {
    await fetchReviews();
    await fetchConsensus();
    await fetchChart();
    if ( currentUser )
      await fetchUserReview();
  }, [ fetchReviews, fetchConsensus, fetchChart, fetchUserReview, currentUser ] )

  useEffect( () => {
    const interval = setInterval( updateReviews, 60000 );
    return () => clearInterval( interval );
  }, [] )


  if ( isPendingReviews || isPendingConsensus || isPendingChart || isPendingUserReview || !reviews )
    return <Row className={ `w-100 ` }>

      <Col xs={ 12 }>

      <span className={ `ms-4 fs-3 fw-light ps-4 align-items-center d-flex mt-1` }>
        FeedBack
      </span>

      </Col>

      <Col xs={ 1 }/>

      <Col xs={ 11 } className={ `fs-5 fw-light` }>

        Fetching feedback ...

      </Col>

      <Col xs={ 1 }/>

      <Col xs={ 11 } className={ `d-flex align-items-center justify-content-center` }>
        <Spinner
          animation={ "grow" }
          variant={ "dark" }
          className={ `border border-2 border-light` }
          style={ { width: "12rem", height: "12rem" } }/>
      </Col>

    </Row>

  return <Row className={ `w-100 ` }>

    <Col xs={ 12 }>

      <span className={ `ms-4 fs-3 fw-light ps-4 align-items-center d-flex mt-1` }>
        FeedBack
      </span>

    </Col>

    <Col xs={ 1 }/>

    <Col xs={ 11 }>

      <span className={ `fs-5 fw-light align-items-center d-flex mt-1` }>
        User Consensus
      </span>

    </Col>

    <Col xs={ 1 }/>

    <Col as={ Row } xs={ 11 } className={ `align-items-center` }>

      <UserConsensus xs={ 3 } consensus={ consensus }/>

      <ScoreChartProgress xs={ currentUser ? 5 : 9 } chart={ chart }/>

      { currentUser && <AddOpinion xs={ 4 } card={ card } review={ userReview } fetchReviews={ updateReviews }/> }

    </Col>

    <Col xs={ 1 }/>

    <Col xs={ 11 }>

      <hr/>

    </Col>

    <Col xs={ 1 }/>

    <Col xs={ 11 }>

      <span className={ `fs-5 fw-light align-items-center d-flex mt-1` }>
        User Reviews
      </span>

    </Col>

    <Col xs={ 1 }/>

    <Col as={ Row } xs={ 11 } className={ `align-items-center` }>

      <UserReviews reviews={ reviews?.content } setPageLimit={ setPageLimit } fetchReviews={ fetchReviews }
                   totalPages={ reviews?.totalPages }/>

    </Col>


  </Row>

};

export default FeedBackCard;