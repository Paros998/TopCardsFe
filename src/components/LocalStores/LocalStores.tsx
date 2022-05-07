import React, {FC} from 'react';
import {Col, Row} from "react-bootstrap";
import {LocalStoresWithCards} from "../../constants/Stores/LocalStoresWithCards";
import {EmojiFrown} from "react-bootstrap-icons";
import LocalStore from "./LocalStore";

interface LocalStoresProps {
  cardId: string;
}

const LocalStores: FC<LocalStoresProps> = ({cardId}) => {

  const storesWithThisCard = LocalStoresWithCards.filter(store => store.cards.filter(card => card.id === cardId).length > 0)

  const availability: number = storesWithThisCard.length;

  const available: boolean = availability >= 1;

  let availabilityMessage;

  if (!available)
    availabilityMessage = `Not available in local stores`;
  else if (availability === 1)
    availabilityMessage = `Available in 1 store`;
  else if (availability > 1)
    availabilityMessage = `Available in ${availability} stores`;


  return <Row className={`w-100 `}>

    <Col xs={12}>

      <span className={`ms-4 fs-3 fw-light ps-4 align-items-center d-flex mt-1`}>
        Local Stores
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
    </Col>

    {
      storesWithThisCard.map((store, index) =>
        <LocalStore
          store={store}
          cardId={cardId}
          key={index}
          lastStore={storesWithThisCard.length - 1 === index}
          firstStore={index === 0}
        />
      )
    }


  </Row>
};

export default LocalStores;