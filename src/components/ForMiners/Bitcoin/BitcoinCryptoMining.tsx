import React, { useMemo } from 'react';
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import { useFetchData } from "../../../hooks/useFetchData";
import { BitcoinData } from "../../../interfaces/models/crypto/bitcoin/BitcoinModels";
import { Col, Row, Spinner } from "react-bootstrap";
import BitcoinMiningDataAndProfitability from "./BitcoinMiningDataAndProfitability";

const BitcoinCryptoMining = () => {
  const { currentUser } = useCurrentUser();

  const params = useMemo( () => {
    if ( currentUser )
      return {
        userId: currentUser.userId
      }
    return {}
  }, [ currentUser ] )

  const [ bitcoinInfo, , isPendingInfo ] = useFetchData<BitcoinData>( `crypto-currencies/bitcoin/info`, { params } );

  if ( isPendingInfo )
    return <Col className={ `d-flex align-items-center justify-content-center` }>
      <Spinner className={ `` } animation={ "border" } variant={ "dark" }/>
    </Col>;

  if ( !bitcoinInfo )
    return <></>;

  const { networkHashRate, dailyBitcoinRevenue, dailyBlocks, value } = bitcoinInfo;

  const infoClass = `hstack justify-content-center align-items-center gap-2 fs-4 mt-1`;

  const currency = () => {
    if ( !currentUser )
      return `$`;

    return currentUser.currency === 'USD' ? `$` : currentUser.currency;
  }

  return (
    <>
      <Row className={ `h-25 w-100 m-0 align-items-center py-3 mx-1 mx-md-2 mb-1` }>

        <Col xs={ 12 } className={ `fs-3 ` }>
          Current Bitcoin Info
        </Col>

        <Col xs={ 6 } className={ infoClass }>
          <span>
            Total daily BTC mining rate from a block:
          </span>

          <span id={ 'bitcoin-daily-rate' } className={ `fw-bold` }>
            { dailyBitcoinRevenue + ' BTC' }
          </span>
        </Col>

        <Col xs={ 6 } className={ infoClass }>
          <span>
            Current 1.BTC value:
          </span>

          <span id={ 'bitcoin-value' } className={ `fw-bold d-flex justify-content-center align-items-center` }>
            { value.toFixed( 2 ) + ' ' + currency() }
          </span>
        </Col>

        <Col xs={ 6 } className={ infoClass }>
          <span>
            Total BTC network HashRate:
          </span>

          <span id={ 'bitcoin-total-hash' } className={ `fw-bold` }>
            { networkHashRate.toFixed( 2 ) }
          </span>
        </Col>

        <Col xs={ 6 } className={ infoClass }>
          <span>
            Daily blocks of BTC:
          </span>

          <span id={ 'bitcoin-daily-blocks' } className={ `fw-bold` }>
            { dailyBlocks }
          </span>
        </Col>

      </Row>

      <hr className={ `h-2px w-95 mx-auto my-2` }/>

      <BitcoinMiningDataAndProfitability/>
    </>
  );
};

export default BitcoinCryptoMining;