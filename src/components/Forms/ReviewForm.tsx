import React, {Dispatch, FC, SetStateAction} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import StarRatings from "react-star-ratings";
import {useFormikContext} from "formik";
import {ReviewModel} from "../../interfaces/models/ReviewModel";

interface ReviewFormProps {
  userHasReview: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}


const ReviewForm:FC<ReviewFormProps> = ({userHasReview,setShowModal}) => {

  const {values, setFieldValue, handleChange, handleSubmit} = useFormikContext<ReviewModel>()

  return (
    <Form className={`vstack `} onSubmit={handleSubmit}>

      <Modal.Body className={`vstack gap-3 align-items-center justify-content-around`}>

        <StarRatings
          numberOfStars={5}
          rating={values.score}
          starRatedColor={`gold`}
          starEmptyColor={`#9A9A9A`}
          starHoverColor={`#F7F7F7`}
          starDimension={`1.5rem`}
          changeRating={rating => setFieldValue(`score`,rating)}
        />

        <FloatingLabel controlId="floatingTextarea2" label="Review Opinion" className={`bg-dark w-80`}>
          <Form.Control
            name={`opinion`}
            as="textarea"
            className={`mh-500px mnh-200px bg-dark text-light`}
            value={values.opinion}
            onChange={handleChange}

          />
        </FloatingLabel>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="outline-light"
          onClick={() => setShowModal(false)}>
          Cancel
        </Button>

        <Button
          variant={`outline-${userHasReview ? `success` : `info`}`}
          type={"submit"}
        >
          {
            userHasReview ? `Update` : `Save`
          }
        </Button>

      </Modal.Footer>


    </Form>
  );
};

export default ReviewForm;