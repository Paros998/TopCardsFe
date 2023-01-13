import React, { useMemo, useState } from 'react';
import { Col, Form, Row, Spinner } from "react-bootstrap";
// @ts-ignore
import NumericInput from 'react-numeric-input'
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import { useFetchData } from "../../../hooks/useFetchData";
import { PageResponse } from "../../../interfaces/PageResponse";
import { BitcoinCardProfitability } from "../../../interfaces/models/crypto/bitcoin/BitcoinModels";
import Pagination from "@mui/material/Pagination";
import BitcoinCards from "./BitcoinCards";

const BitcoinMiningDataAndProfitability = () => {
  const { currentUser } = useCurrentUser();
  const [ electricityCost, setElectricityCost ] = useState<number>( 0.05 );
  const [ page, setPage ] = useState<number>( 1 );
  const [ query, setQuery ] = useState<string | null>( null );

  const params = useMemo( () => {
    if ( currentUser )
      return {
        userId: currentUser.userId,
        page: page,
        pageLimit: 5,
        electricityCost: electricityCost,
        searchQuery: query
      }

    return {
      page: page,
      pageLimit: 5,
      electricityCost: electricityCost,
      searchQuery: query
    }
  }, [ electricityCost, currentUser, page, query ] );

  const [ gpuBitcoinData, , isPending ] =
    useFetchData<PageResponse<BitcoinCardProfitability>>( `crypto-currencies/bitcoin/estimated-profits`, { params } );

  const infoClass = `hstack justify-content-center align-items-center gap-2 fs-5 mt-1`;

  function myFormat( num: any ) {
    if ( !currentUser || currentUser.currency === 'USD' )
      return num + ' $ per KW/h';
    return num + ` ${ currentUser.currency } per KW/h`;
  }

  function parseNumber( num: string ) {
    if ( !currentUser || currentUser.currency === 'USD' )
      return num.replace( ' $ per KW/h', "" )
    return num.replace( ` ${ currentUser.currency } per KW/h`, "" )
  }

  return (
    <>
      <Row className={ `w-100 m-0 align-items-center py-3 mx-1 mx-md-2 mb-1` }>

        <Col xs={ 12 } className={ `fs-3 ` }>
          Graphic cards applicable for mining bitcoin
        </Col>

        <Col xs={ 6 } className={ infoClass }>
          <span>
            Filter by card name
          </span>
          <Form.Control className={ `mt-1 w-30 bg-light text-dark border border-2 border-dark rounded-pill` }
                        type={ "text" }
                        value={ query !== null ? query : '' }
                        onChange={ event => setQuery( event.target.value ) }/>
        </Col>

        <Col xs={ 6 } className={ infoClass }>
          <span>
            Provide electricity costs
          </span>
          <NumericInput
            className={ ` bg-light text-dark border border-2 border-dark d-flex p-1` }
            value={ electricityCost }
            min={ 0 }
            max={ 1000 }
            step={ 0.01 }
            format={ myFormat }
            parse={ parseNumber }
            onChange={ ( e: any ) => setElectricityCost( e ) }
          />
        </Col>

        {
          isPending && <Col xs={ 12 } className={ `d-flex align-items-center justify-content-center` }>
                <Spinner style={ { width: "5rem", height: "5rem" } } animation={ "border" } variant={ "dark" }/>
            </Col>
        }

        {
          !isPending && gpuBitcoinData && (
            <>
              <hr className={ `h-2px w-95 mx-auto my-4` }/>

              <BitcoinCards bitcoinCards={ gpuBitcoinData.content || [] }/>

              <Col xs={ 12 } className={ `d-flex justify-content-center position-relative bottom-100 w-100 my-1` }>
                <Pagination
                  count={ gpuBitcoinData.totalPages || 1 }
                  className={ `bg-light rounded-card-10 ${ gpuBitcoinData.content ? 'd-flex' : 'd-none' }` }
                  color={ "primary" }
                  page={ page }
                  onChange={ ( event, newPage ) => setPage( newPage ) }
                />
              </Col>
            </>
          )
        }

      </Row>
    </>
  );
};

export default BitcoinMiningDataAndProfitability;