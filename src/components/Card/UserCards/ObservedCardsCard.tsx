import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {BasicCards} from "../../../constants/CardsModels/BasicCards";
import ObservedCardInfo from "../../GraphicCard/ObservedCardInfo";

const ObservedCardsCard = () => {



  const handleUnFollow = (cardId: string) => {

  }

  return (
    <div className={`container-fluid h-85 p-0 m-0 my-1 thumb-slim thumb-warning overflow-y-scroll my-md-3 my-2 `}>
      <Row>
        {BasicCards.map((value, index) =>
          <Col
            key={index}
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            xxl={6}
            className={`d-flex align-items-center `}
          >
            <ObservedCardInfo card={value}/>

            <Button
              onClick={() => handleUnFollow(value.id)}
              className={` h-30 mx-md-3 mx-2 rounded-card-10`}
              variant={`outline-warning`}
            >
              UnFollow
            </Button>

          </Col>
        )}
      </Row>
    </div>
  );
};

export default ObservedCardsCard;