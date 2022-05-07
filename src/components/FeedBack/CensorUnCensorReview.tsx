import React, {FC} from 'react';
import {ReviewModel} from "../../interfaces/models/ReviewModel";
import {HandThumbsUp, SlashCircle} from "react-bootstrap-icons";

interface CensorUnCensorReviewProps {
  review: ReviewModel;
}

const CensorUnCensorReview:FC<CensorUnCensorReviewProps> = ({review}) => {

  const {censored, id} = review;

  const onClick = () => {

  }

  if(!censored)
    return <SlashCircle className={`text-danger fs-3 btn-pointer`} onClick={onClick}/>

  return <HandThumbsUp className={`text-success fs-3 btn-pointer`} onClick={onClick}/>
};

export default CensorUnCensorReview;