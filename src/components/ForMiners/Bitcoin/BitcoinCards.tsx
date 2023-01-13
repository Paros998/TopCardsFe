import React, { FC } from 'react';
import { BitcoinCardProfitability } from "../../../interfaces/models/crypto/bitcoin/BitcoinModels";
import BitcoinCard from "./BitcoinCard";
import {
  DatabaseProductDetailsProvider
} from "../../../contexts/ModalProductDetailsContext/DatabaseProductDetailsContext";
import { Col, Row } from "react-bootstrap";
import NotFoundPhoto from "../../../assets/images/product-not-found.jpg";

interface BitcoinCardsProps {
  bitcoinCards: BitcoinCardProfitability[] | [];
}

const BitcoinCards: FC<BitcoinCardsProps> = ( { bitcoinCards } ) => {
  return (
    <Row id={ 'bitcoin-cards' } className={ `vstack mt-3 mb-1 w-100 gap-2` }>
      <Col xs={ 12 } className={ `fs-4` }>
        Cards that match your filter sorted by their bitcoin miner hash rate (Gpu MH/s)
      </Col>

      {
        bitcoinCards.length === 0 && <Col className={ `d-flex align-items-center justify-content-center h-100` }>
              <img src={ NotFoundPhoto } alt={ '' } className={ `rounded-circle h-60` }/>
          </Col>
      }

      <DatabaseProductDetailsProvider>
        {
          bitcoinCards.map( ( cardData, index ) => <BitcoinCard key={ index } cardData={ cardData }/> )
        }
      </DatabaseProductDetailsProvider>
    </Row>
  );
};

export default BitcoinCards;