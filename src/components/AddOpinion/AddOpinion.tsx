import React, { FC, useEffect, useState } from 'react';
import { Button, Col, Modal } from "react-bootstrap";
import { ReviewModel } from "../../interfaces/models/ReviewModel";
import { Formik } from 'formik';
import { ReviewInitialValues } from "../../constants/InitialValues/ReviewInitialValues";
import ReviewForm from "../Forms/ReviewForm";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { toast } from "react-toastify";
import Axios from "axios";
import { BasicProductModel } from "../../interfaces/models/BasicProductModel";

interface AddOpinionProps {
  review: ReviewModel | null;
  fetchReviews: () => Promise<void>;
  product: BasicProductModel;
  xs: number;
}

const AddOpinion: FC<AddOpinionProps> = ( { product, xs, review, fetchReviews } ) => {

  const [ showModal, setShowModal ] = useState<boolean>( false );

  const [ reviewId, setReviewId ] = useState<string>();

  const [ userHasReview, setUserHasReview ] = useState<boolean>( false );

  const { currentUser } = useCurrentUser();

  useEffect( () => {

    if ( review !== null ) {
      setUserHasReview( true );
      setReviewId( review?.id );
    }


  }, [ review ] );

  const onSubmit = async ( values: ReviewModel ) => {

    if ( !userHasReview ) {
      values.userId = currentUser?.userId;
      values.productId = product.productId;
    }

    try {

      if ( !userHasReview )
        await Axios.post( `/reviews`, values );

      else
        await Axios.put( `/reviews`, values );

      setShowModal( false );

      if ( !userHasReview )
        toast.success( `Review has been added successfully` );

      else
        toast.info( `Review has been updated successfully` );

      await fetchReviews();

    } catch ( e: any ) {

      toast.error( e );

    }


  }

  return (
    <Col xs={ xs } className={ `bg-light rounded-card-10 border border-2
     border-${ userHasReview ? `success` : `info` } vstack align-items-center justify-content-center d-flex ` }>

      <span className={ `text-dark d-flex fw-bold justify-content-center` }>
        {
          userHasReview ? `You already reviewed this product` : `Do you have this product?`
        }
      </span>

      <span className={ `text-secondary text-wrap text-middle ` }>
        {
          userHasReview ? `Want to change something?` : `Rate ${ product.title }`
        }
      </span>

      <Button
        className={ `rounded-pill w-60 text-light my-1` }
        variant={ `${ userHasReview ? `success` : `info` }` }
        onClick={ () => setShowModal( true ) }
      >
        {
          userHasReview ? `Change your opinion` : `Add your opinion`
        }
      </Button>

      <Modal
        show={ showModal }
        onHide={ () => setShowModal( false ) }
        backdrop="static"
        keyboard={ false }
        size={ `lg` }
        centered
        contentClassName={ `bg-dark text-light rounded-card-10 border border-1 border-light` }
      >
        <Modal.Header closeButton>

          <Modal.Title className={ `fs-5` }>
            {
              userHasReview
                ?
                <div className={ `d-flex align-items-center` }>
                  Review Id :
                  <span className={ `text-success ms-1` }>
                    { reviewId }
                  </span>
                </div>
                :
                <div className={ `d-flex align-items-center` }>
                  Add opinion of card :
                  <span className={ `text-info fw-light` }>
                  { product.title }
                  </span>
                </div>
            }
          </Modal.Title>

        </Modal.Header>

        <Formik<ReviewModel>
          initialValues={ userHasReview ? review as ReviewModel : ReviewInitialValues }
          onSubmit={ onSubmit }
        >
          <ReviewForm userHasReview={ userHasReview } setShowModal={ setShowModal }/>
        </Formik>

      </Modal>

    </Col>
  );
};

export default AddOpinion;