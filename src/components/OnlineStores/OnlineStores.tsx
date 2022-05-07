import React, {FC} from 'react';
import {Col, Row} from "react-bootstrap";
import {EmojiFrown} from "react-bootstrap-icons";
import {OnlineStoresWithCards} from "../../constants/Stores/OnlineStoresWithCards";
import OnlineStore from "./OnlineStore";

interface OnlineStoresProps{
  cardId:string;
}

const OnlineStores:FC<OnlineStoresProps> = ({cardId}) => {

  const storesWithThisCard = OnlineStoresWithCards.filter(store => store.cards.filter(card => card.id === cardId).length > 0)

  const availability: number = storesWithThisCard.length;

  const available: boolean = availability >= 1;

  let availabilityMessage;

  if (!available)
    availabilityMessage = `Not available in online stores`;
  else if (availability === 1)
    availabilityMessage = `Available in 1 store`;
  else if (availability > 1)
    availabilityMessage = `Available in ${availability} stores`;

  return <Row className={`w-100 mb-5`}>

    <Col xs={12}>

      <span className={`ms-4 fs-3 fw-light ps-4 align-items-center d-flex mt-1`}>
        Online Stores
      </span>

    </Col>

    <Col xs={1}/>

    <Col xs={11} className={`my-1 fs-5 fw-light`}>
      {
        availabilityMessage
      }
      {
        !available && <EmojiFrown className={`ms-2 fs-5`}/>
      }

      {
        storesWithThisCard.map((store,index) =>
          <OnlineStore
            firstStore={index === 0}
            cardId={cardId}
            lastStore={storesWithThisCard.length - 1 === index}
            store={store}
          />
        )
      }

    </Col>

  </Row>
};

export default OnlineStores;