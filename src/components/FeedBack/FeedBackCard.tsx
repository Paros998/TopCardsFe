import React, {FC} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {ReviewModel} from "../../interfaces/models/ReviewModel";
import {Reviews} from "../../constants/Reviews/Reviews";
import UserConsensus from "./UserConsensus";
import ScoreChartProgress from "../ScoreChartProgress/ScoreChartProgress";
import AddOpinion from "../AddOpinion/AddOpinion";
import {CardDetailsModel} from "../../interfaces/models/CardDetailsModel";
import {useCurrentUser} from "../../contexts/UserContext/CurrentUserContext";
import UserReviews from "./UserReviews";

interface FeedBackCardProps {
  card: CardDetailsModel;
}

const FeedBackCard:FC<FeedBackCardProps> = ({card}) => {

  const {id} = card;

  const reviews: ReviewModel[] = Reviews.filter(review => review.cardId === id);

  const {currentUser} = useCurrentUser();

  return <Row className={`w-100 `}>

    <Col xs={12}>

      <span className={`ms-4 fs-3 fw-light ps-4 align-items-center d-flex mt-1`}>
        FeedBack
      </span>

    </Col>

    <Col xs={1}/>

    <Col xs={11}>

      <span className={`fs-5 fw-light align-items-center d-flex mt-1`}>
        User Consensus
      </span>

    </Col>

    <Col xs={1}/>

    <Col as={Row} xs={11} className={`align-items-center`}>

      <UserConsensus xs={3} reviews={reviews}/>

      <ScoreChartProgress xs={currentUser ? 5 : 9} reviews={reviews}/>

      <AddOpinion xs={4} card={card} render={!!currentUser} reviews={reviews}/>

    </Col>

    <Col xs={1}/>

    <Col xs={11}>

      <hr/>

    </Col>

    <Col xs={1}/>

    <Col xs={11}>

      <span className={`fs-5 fw-light align-items-center d-flex mt-1`}>
        User Reviews
      </span>

    </Col>

    <Col xs={1}/>

    <Col as={Row} xs={11} className={`align-items-center`}>

      <UserReviews reviews={reviews} />

    </Col>


  </Row>

};

export default FeedBackCard;