import React, { FC, useCallback, useEffect } from 'react';
import { Col, Row, Spinner } from "react-bootstrap";
import { EmojiFrown } from "react-bootstrap-icons";
import LocalStore from "./LocalStore";
import { useFetchData } from "../../hooks/useFetchData";
import { LocalStoreOffer } from "../../interfaces/models/LocalStoreOffer";
import RecordsNotFound from "../../assets/images/records-not-found.png";

interface LocalStoresProps {
  cardId: string;
}

const LocalStores: FC<LocalStoresProps> = ( { cardId } ) => {

  const [ localStoreOffers, fetchOffers, isPending ] = useFetchData<LocalStoreOffer[]>( `/local-offers/card/${ cardId }` );

  const availability: number = localStoreOffers?.length;

  const available: boolean = availability >= 1;

  let availabilityMessage;

  const updateOffers = useCallback( async () => {
    await fetchOffers();
  }, [ fetchOffers ] )

  useEffect( () => {
    const interval = setInterval( updateOffers, 60000 );
    return () => clearInterval( interval );
  }, [] )

  if ( !available )
    availabilityMessage = `Not available in local stores`;
  else if ( availability === 1 )
    availabilityMessage = `Available in 1 store`;
  else if ( availability > 1 )
    availabilityMessage = `Available in ${ availability } stores`;

  if ( isPending )
    return <Row className={ `w-100 ` }>

      <Col xs={ 12 }>

      <span className={ `ms-4 fs-3 fw-light ps-4 align-items-center d-flex mt-1` }>
        Local Stores
      </span>

      </Col>

      <Col xs={ 1 }/>

      <Col xs={ 11 } className={ `my-1 fs-5 fw-light` }>

        Checking for local offers...

      </Col>

      <Col xs={ 1 }/>

      <Col xs={ 11 } className={`d-flex justify-content-center align-items-center mb-5`}>
        <Spinner
          animation={ "grow" }
          variant={ "dark" }
          className={`border border-2 border-light`}
          style={ { width: "12rem", height: "12rem" } }/>
      </Col>
    </Row>

  if ( !isPending && localStoreOffers?.length === 0 )
    return <Row className={ `w-100 ` }>

      <Col xs={ 12 }>

      <span className={ `ms-4 fs-3 fw-light ps-4 align-items-center d-flex mt-1` }>
        Local Stores
      </span>

      </Col>

      <Col xs={ 1 }/>

      <Col xs={ 11 } className={ `my-1 fs-5 fw-light` }>

        {
          availabilityMessage
        }
        {
          !available && <EmojiFrown className={ `ms-2 fs-5` }/>
        }
      </Col>

      <Col xs={ 1 }/>

      <Col xs={ 11 } className={ `d-flex align-items-center justify-content-center` }>
        <img src={ RecordsNotFound } alt={ '' } className={ `rounded-circle w-30 h-auto` }/>
      </Col>

    </Row>

  return <Row className={ `w-100 ` }>

    <Col xs={ 12 }>

      <span className={ `ms-4 fs-3 fw-light ps-4 align-items-center d-flex mt-1` }>
        Local Stores
      </span>

    </Col>

    <Col xs={ 1 }/>

    <Col xs={ 11 } className={ `my-1 fs-5 fw-light` }>

      {
        availabilityMessage
      }
      {
        !available && <EmojiFrown className={ `ms-2 fs-5` }/>
      }
    </Col>

    {
      localStoreOffers?.map( ( offer, index ) =>
        <LocalStore
          offer={ offer }
          key={ index }
          lastStore={ localStoreOffers.length - 1 === index }
          firstStore={ index === 0 }
        />
      )
    }

  </Row>
};

export default LocalStores;