import { Button, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import { CurrencyBitcoin } from "react-bootstrap-icons";
import BitcoinCryptoMining from "./Bitcoin/BitcoinCryptoMining";

const ForMiners = () => {
  const [ crypto, setCrypto ] = useState<'bitcoin' | 'ethereum'>( 'bitcoin' );

  const buttonClass = `d-flex justify-content-center align-items-center dark-light rounded-pill p-2 fs-5 w-25 fw-bold`

  return (
    <>
      <Row className={ `h-10 m-0 align-items-center py-3 mx-1 mx-md-2 mb-1` }>
        <Col xs={ 4 } className={ `fs-3 ` }>
          Available crypto currencies
        </Col>

        <Col xs={ 6 } className={ `hstack justify-content-start gap-4` }>

          <Button
            className={ buttonClass }
            disabled={ crypto === 'bitcoin' }
            onClick={ () => setCrypto( 'bitcoin' ) }
          >
            Bitcoin
            <CurrencyBitcoin className={ `fs-3` }/>
          </Button>

          <Button
            className={ buttonClass }
            disabled={ crypto === 'ethereum' }
            onClick={ () => setCrypto( 'ethereum' ) }
          >
            Ethereum
          </Button>

        </Col>

      </Row>

      <hr className={ `h-2px w-95 mx-auto my-4` }/>

      <div className={ `w-95 mx-auto vstack mnh-700px` }>
        { crypto === 'bitcoin' ? <BitcoinCryptoMining/> : null }
      </div>
    </>
  );
}

export default ForMiners;