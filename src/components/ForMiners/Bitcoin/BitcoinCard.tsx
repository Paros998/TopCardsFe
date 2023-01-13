import React, { FC, useState } from 'react';
import { BitcoinCardProfitability } from "../../../interfaces/models/crypto/bitcoin/BitcoinModels";
import { Button, Col, Row } from "react-bootstrap";
import {
  useDatabaseProductsDetailsModal
} from "../../../contexts/ModalProductDetailsContext/DatabaseProductDetailsContext";
import { CurrencyDollar } from "react-bootstrap-icons";
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import { ProductType } from "../../../interfaces/enums/ProductType";
import BitcoinProfitabilityChart from "./BitcoinProfitabilityChart";

interface BitcoinCardProps {
  cardData: BitcoinCardProfitability;
}

const BitcoinCard: FC<BitcoinCardProps> = ( { cardData } ) => {
  const { currentUser } = useCurrentUser();
  const { setProductData, setShowDetailsModal, setShowOffersModal } = useDatabaseProductsDetailsModal();
  const [ showInvestmentDetails, setShowInvestmentDetails ] = useState<boolean>( false );

  const currency = () => {
    if ( !currentUser )
      return <CurrencyDollar/>;

    return currentUser.currency === 'USD' ? <CurrencyDollar/> : ' ' + currentUser.currency;
  }

  const {
    cardId,
    cardName,
    cardPhoto,
    cardLowestPrice,
    offerUrl,
    bitcoinHashRate,
    dailyBitcoinMiningRate,
    dailyBitcoinRevenue,
    dailyProfit,
    monthlyBitcoinMiningRate,
    monthlyBitcoinRevenue,
    monthlyProfit,
    investmentData
  } = cardData;

  const colClass = `d-flex align-items-center justify-content-center`;

  const dataClass = `text-info ms-1 fw-bold ${ colClass }`;

  const moneyDataClass = `ms-1 fw-bold ${ colClass }`;

  const showDetails = () => {
    setProductData( { productId: cardId, productType: ProductType.GPU } );
    setShowDetailsModal( true );
  }

  const showOffers = () => {
    setProductData( { productId: cardId, productType: ProductType.GPU } );
    setShowOffersModal( true );
  }

  return (
    <Col xs={ 12 } className={ `my-1 w-100 vstack bg-dark rounded-card-10 text-light px-2 mx-2 position-relative` }>

      <div className={ `${ colClass } position-absolute right-2 mt-1` }>
        <Button
          className={ `info-dark rounded-pill` }
          onClick={ showDetails }
        >
          Display GPU Details
        </Button>

        <Button
          className={ `success-dark rounded-pill ms-2 ${ cardLowestPrice === 0 && `d-none` }` }
          onClick={ showOffers }
        >
          Display Available Offers
        </Button>
      </div>

      <Row className={ `w-100 py-2` }>

        <Col xs={ 2 } className={ colClass }>
          <img src={ cardPhoto } alt={ '' } style={ { height: "8rem" } }
               className={ `rounded-circle border border-2 border-light` }/>
        </Col>

        <Col xs={ 4 } className={ colClass }>
          Gpu Name:
          <span className={ dataClass }>
            { cardName }
          </span>
        </Col>

        <Col xs={ 2 } className={ `${ colClass } ` }>
          Gpu MH/s:
          <span className={ dataClass }>
            { bitcoinHashRate.toFixed( 2 ) }
          </span>
        </Col>

        <Col xs={ 2 } className={ `${ colClass } ${ cardLowestPrice === 0 && `d-none` }` }>
          Lowest price:
          <span className={ dataClass }>
            { cardLowestPrice.toFixed( 2 ) + ' ' } { currency() }
          </span>
        </Col>

        <Col xs={ 2 } className={ `${ colClass } ${ cardLowestPrice === 0 && `d-none` } ` }>
          Best offer:
          <a href={ offerUrl } target={ "_blank" } className={ dataClass } rel="noreferrer">
            Offer Link
          </a>
        </Col>

      </Row>

      <Row className={ `w-100 py-2` }>

        <Col xs={ 2 } className={ colClass + ' fw-bold' }>
          Daily Profitability Data
        </Col>

        <Col xs={ 3 } className={ colClass }>
          Daily Bitcoin mining rate:
          <span className={ dataClass }>
            { dailyBitcoinMiningRate.toFixed( 7 ) + ' BTC' }
          </span>
        </Col>

        <Col xs={ 3 } className={ colClass }>
          Daily Bitcoin revenue:
          <span className={ dataClass }>
            { dailyBitcoinRevenue.toFixed( 2 ) }{ currency() }
          </span>
        </Col>

        <Col xs={ 3 } className={ colClass }>
          Daily Bitcoin profit:
          <span className={ `${ moneyDataClass }  ${ dailyProfit > 0 ? `text-success` : `text-primary` }` }>
            { dailyProfit.toFixed( 2 ) }{ currency() }
          </span>
        </Col>

      </Row>

      <Row className={ `w-100 py-2` }>

        <Col xs={ 2 } className={ colClass + ' fw-bold' }>
          Monthly Profitability Data
        </Col>

        <Col xs={ 3 } className={ colClass }>
          Monthly Bitcoin mining rate:
          <span className={ dataClass }>
            { monthlyBitcoinMiningRate.toFixed( 7 ) + ' BTC' }
          </span>
        </Col>

        <Col xs={ 3 } className={ colClass }>
          Monthly Bitcoin revenue:
          <span className={ dataClass }>
            { monthlyBitcoinRevenue.toFixed( 2 ) }{ currency() }
          </span>
        </Col>

        <Col xs={ 3 } className={ colClass }>
          Monthly Bitcoin profit:
          <span className={ `${ moneyDataClass }  ${ monthlyProfit > 0 ? `text-success` : `text-primary` }` }>
            { monthlyProfit.toFixed( 2 ) }{ currency() }
          </span>
        </Col>

      </Row>

      {
        ( cardLowestPrice !== 0 && investmentData !== null ) &&
          <>
              <Button
                  className={ `light-dark rounded-pill mt-1 mb-3 w-20 mx-auto` }
                  onClick={ () => setShowInvestmentDetails( !showInvestmentDetails ) }
              >
                  Toggle investment data
              </Button>

              <Row className={ `w-100 my-2 ${ showInvestmentDetails ? `d-flex` : `d-none` } mnh-400px` }>

                  <BitcoinProfitabilityChart investmentData={ investmentData }/>

              </Row>
          </>
      }

    </Col>
  );
};

export default BitcoinCard;