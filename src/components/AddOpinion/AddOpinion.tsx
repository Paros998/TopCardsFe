import React, {FC, useEffect, useState} from 'react';
import {Button, Col, Modal} from "react-bootstrap";
import {CardDetailsModel} from "../../interfaces/models/CardDetailsModel";
import {useCurrentUser} from "../../contexts/UserContext/CurrentUserContext";
import {ReviewModel} from "../../interfaces/models/ReviewModel";
import { Formik } from 'formik';
import {ReviewInitialValues} from "../../constants/InitialValues/ReviewInitialValues";
import ReviewForm from "../Forms/ReviewForm";

interface AddOpinionProps {
  reviews: ReviewModel[] | [];
  card: CardDetailsModel;
  xs:number;
  render: boolean;
}

const AddOpinion:FC<AddOpinionProps> = ({card,xs,render,reviews}) => {

  const [showModal,setShowModal] = useState<boolean>(false);

  const [reviewId,setReviewId] = useState<string>();

  const [userHasReview,setUserHasReview] = useState<boolean>(false);

  const {currentUser} = useCurrentUser();

  useEffect(() => {

    reviews.forEach(review => {

      if(review.userId === currentUser?.userId){
        setUserHasReview(true);
        setReviewId(review.id);
      }

    })

  },[reviews]);

  const onSubmit = (values: ReviewModel) => {

    if(!userHasReview){
      values.userId = currentUser?.userId;
      values.avatar = currentUser?.avatarFile;
      values.username = currentUser?.username;
      values.cardId = card.id;
    }

    console.log(values)
  }

  return (
    <Col xs={xs} className={`bg-light rounded-card-10 border border-2
     border-${userHasReview ? `success` : `info`} vstack align-items-center justify-content-center ${render ? `d-flex` : `d-none` }`}>

      <span className={`text-dark d-flex fw-bold justify-content-center`}>
        {
          userHasReview ? `You already reviewed this product` : `Do you have this product?`
        }
      </span>

      <span className={`text-secondary text-wrap text-middle `}>
        {
          userHasReview ? `Want to change something?` : `Rate ${card.title}`
        }
      </span>

      <Button
        className={`rounded-pill w-60 text-light my-1`}
        variant={`${userHasReview ? `success` : `info`}`}
        onClick={() => setShowModal(true)}
      >
        {
          userHasReview ? `Change your opinion` : `Add your opinion`
        }
      </Button>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        size={`lg`}
        centered
        contentClassName={`bg-dark text-light rounded-card-10 border border-1 border-light`}
      >
        <Modal.Header closeButton>

          <Modal.Title className={`fs-5`}>
            {
              userHasReview
                ?
                <div className={`d-flex align-items-center`}>
                  Review Id :
                  <span className={`text-success ms-1`}>
                    {reviewId}
                  </span>
                </div>
                :
                <div className={`d-flex align-items-center`}>
                  Add opinion of card :
                  <span className={`text-info fw-light`}>
                  {card.title}
                  </span>
                </div>
            }
          </Modal.Title>

        </Modal.Header>

          <Formik<ReviewModel>
            initialValues={userHasReview ? reviews.find(review => review.id === reviewId) as ReviewModel : ReviewInitialValues}
            onSubmit={onSubmit}
          >
            <ReviewForm userHasReview={userHasReview} setShowModal={setShowModal}/>
          </Formik>

      </Modal>

    </Col>
  );
};

export default AddOpinion;