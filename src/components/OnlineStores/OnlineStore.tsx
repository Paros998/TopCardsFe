import React, {FC} from 'react';
import {OnlineStoreModel} from "../../interfaces/models/OnlineStoreModel";
import {Button, Col, Row} from "react-bootstrap";
import HrBrake from "../Hr/HrBrake";
import StarRatings from "react-star-ratings";

interface OnlineStoreProps {
  firstStore: boolean;
  lastStore: boolean;
  cardId: string;
  store: OnlineStoreModel;
}

const OnlineStore: FC<OnlineStoreProps> = ({store, firstStore, lastStore, cardId}) => {

  const {name, ratingScore, ratingCount, photo} = store;

  const card = store.cards.find(card => card.id === cardId);

  return (

    <Col xs={12} as={Row} className={`my-1 pe-3`}>

      <Col xs={1}/>

      <Col xs={11} className={`hstack  bg-light text-dark rounded-card-10 py-3 mnh-100px`}>


        <Col xs={1} className={`text-center`}>

          <img
            src={photo}
            alt={``}
            className={`rounded-card-10 border border-1 border-dark w-100 h-auto p-1`}
          />

        </Col>

        <Col xs={2} className={`text-center text-dark fw-bold`}>
          {
            name
          }
        </Col>

        <Col xs={3} className={`text-center d-flex align-items-center justify-content-center`}>

          <StarRatings
            name={`score`}
            rating={ratingScore}
            starRatedColor={`gold`}
            starEmptyColor={`#9A9A9A`}
            starDimension={`1.2rem`}
          />

          <span className={`text-secondary fs-7 `}>
            {
              `( ${ratingCount} )`
            }
          </span>

        </Col>

        <Col xs={3} className={`text-center`}>

          <span className={`rounded-pill bg-dark px-4 py-1 ${firstStore ? `text-success` : `text-light`}`}>
            {
              `${card?.price}$ ${card?.hasFreeShipping ? `+ free shipping` : ``}`
            }
          </span>

        </Col>

        <Col xs={3} className={`text-center`}>

          <a
            href={card?.offerWebsite}
            target={`_blank`}
          >
            <Button
              className={`rounded-card-10 text-light px-5 py-1`}
              variant={`info`}
            >
              Proceed to offer
            </Button>
          </a>


        </Col>


      </Col>

      {
        !lastStore && <HrBrake/>
      }
    </Col>
  );
};

export default OnlineStore;