import React, { FC, useState } from 'react';
import { ReviewModel } from "../../interfaces/models/ReviewModel";
import { HandThumbsUp, SlashCircle } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import Axios from "axios";
import { Spinner } from "react-bootstrap";

interface CensorUnCensorReviewProps {
  fetchReviews: () => Promise<void>;
  review: ReviewModel;
}

const CensorUnCensorReview: FC<CensorUnCensorReviewProps> = ( { review, fetchReviews } ) => {

  const { isCensored, id } = review;

  const [ isPending, setIsPending ] = useState<boolean>( false );

  const onClick = async () => {
    setIsPending( true );

    try {

      await Axios.patch( `/reviews/${ id }` );

      toast.info( `${ isCensored ? `Uncesored review` : `Censored review` }` );

      await fetchReviews();

    } catch ( e: any ) {

      toast.error( e );

    }

    setIsPending( false );

  }

  if ( isPending )
    return <Spinner animation={ "border" } variant={ !isCensored ? "primary" : "success" }/>

  if ( !isCensored )
    return <SlashCircle className={ `text-danger fs-3 btn-pointer` } onClick={ onClick }/>

  return <HandThumbsUp className={ `text-success fs-3 btn-pointer` } onClick={ onClick }/>
};

export default CensorUnCensorReview;