import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Col, Row, Spinner } from "react-bootstrap";
import { EmojiFrown } from "react-bootstrap-icons";
import { useFetchData } from "../../hooks/useFetchData";
import { StoreOffer } from "../../interfaces/models/StoreOffer";
import RecordsNotFound from "../../assets/images/records-not-found.png";
import { ProductProps } from "../../interfaces/models/Product";
import Offer from "./Offer";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";

interface StoresOffersProps extends ProductProps {
}

const StoresOffers: FC<StoresOffersProps> = ( { productId } ) => {

  const { currentUser } = useCurrentUser();

  const params = useMemo( () => {
    return {
      userId: currentUser ? currentUser.userId : null
    }
  }, [ currentUser ] );

  const [ offers, fetchOffers, isPending ] = useFetchData<StoreOffer[]>( `products/offers/${ productId }`, { params } );

  const availability: number = offers?.length;

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
    availabilityMessage = `Not available in any store currently`;
  else if ( availability === 1 )
    availabilityMessage = `Available in 1 store`;
  else if ( availability > 1 )
    availabilityMessage = `Available in ${ availability } stores`;

  if ( isPending )
    return <Row className={ `w-100 pb-md-3` }>

      <Col xs={ 12 }>

      <span className={ `ms-4 fs-3 fw-light ps-4 align-items-center d-flex mt-1` }>
        Stores offers
      </span>

      </Col>

      <Col xs={ 1 }/>

      <Col xs={ 11 } className={ `my-1 fs-5 fw-light` }>

        Checking for store offers...

      </Col>

      <Col xs={ 1 }/>

      <Col xs={ 11 } className={ `d-flex justify-content-center align-items-center mb-5` }>
        <Spinner
          animation={ "grow" }
          variant={ "dark" }
          className={ `border border-2 border-light` }
          style={ { width: "12rem", height: "12rem" } }/>
      </Col>
    </Row>

  if ( !isPending && offers?.length === 0 )
    return <Row className={ `w-100 pb-md-3` }>

      <Col xs={ 12 }>

      <span className={ `ms-4 fs-3 fw-light ps-4 align-items-center d-flex mt-1` }>
        Stores offers
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
        <img src={ RecordsNotFound } alt={ '' }
             className={ `rounded-card-10 mh-300px` }/>
      </Col>

    </Row>

  return <Row className={ `w-100 pb-md-3` }>

    <Col xs={ 12 }>

      <span className={ `ms-4 fs-3 fw-light ps-4 align-items-center d-flex mt-1` }>
        Stores offers
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
      offers?.map( ( offer, index ) =>
        <Offer
          offer={ offer }
          productId={ productId }
          key={ index }
          lastStore={ offers.length - 1 === index }
          firstStore={ index === 0 }
        />
      )
    }

  </Row>
};

export default StoresOffers;