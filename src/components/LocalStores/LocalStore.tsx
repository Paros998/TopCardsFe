import React, { FC } from 'react';
import { LocalStoreOffer } from "../../interfaces/models/LocalStoreOffer";
import { Button, Col, Row } from "react-bootstrap";
import HrBrake from "../Hr/HrBrake";

interface LocalStoreProps {
  firstStore: boolean;
  lastStore: boolean;
  offer: LocalStoreOffer;
}

const LocalStore: FC<LocalStoreProps> = ( { offer, lastStore, firstStore } ) => {

  const { address, shopWebsite, phone, name, price } = offer;

  return (

    <>

      <Col xs={ 1 }/>

      <Col xs={ 11 } as={ Row }>

        <Col xs={ 1 }/>

        <Col xs={ 10 } className={ `vstack me-3 bg-light text-dark rounded-card-10` }>

          <div className={ `w-100 d-flex justify-content-between align-items-center` }>
            <span className={ `fw-bold` }>
            Name
            </span>

            <span>
            { name }
            </span>
          </div>

          <div className={ `w-100 d-flex justify-content-between align-items-center my-1` }>

            <span className={ `fw-bold` }>
              Address
            </span>

            <a
              href={ `https://www.google.pl/maps/search/${ address }` }
              target={ `_blank` }
              className={ `dark-light px-2 py-1 rounded-pill btn-pointer` }>
              { address }
            </a>

          </div>

          <div className={ `w-100 d-flex justify-content-between align-items-center my-1` }>
          <span className={ `fw-bold` }>
            Phone
          </span>

            <span>
            { phone ? phone : `No phone number present` }
          </span>
          </div>

          <div className={ `w-100 d-flex justify-content-between align-items-center my-1` }>
          <span className={ `fw-bold` }>
            Price
          </span>

            <span className={ `text-${ firstStore ? `success` : `danger` } fw-bold` }>
            { `${ price }PLN` }
          </span>
          </div>

          <div
            className={ `w-100 justify-content-center align-items-center ${ shopWebsite ? `d-flex` : `d-none` } my-1` }>
            <a
              href={ shopWebsite }
              target={ `_blank` }
            >
              <Button
                className={ `rounded-pill dark-light` }

              >
                Website available
              </Button>
            </a>
          </div>

        </Col>

        {
          !lastStore && <HrBrake/>
        }

      </Col>

    </>
  );
};

export default LocalStore;