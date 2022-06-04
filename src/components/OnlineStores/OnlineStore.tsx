import React, { FC } from 'react';
import { OnlineStoreOffer } from "../../interfaces/models/OnlineStoreOffer";
import { Button, Col, Row } from "react-bootstrap";
import HrBrake from "../Hr/HrBrake";
import StarRatings from "react-star-ratings";
import NO_PHOTO from "../../assets/images/no-image.png";
import { toast } from "react-toastify";
import Axios from "axios";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { useFetchData } from "../../hooks/useFetchData";

interface OnlineStoreProps {
  firstStore: boolean;
  lastStore: boolean;
  offer: OnlineStoreOffer;
}

const OnlineStore: FC<OnlineStoreProps> = ( { offer, firstStore, lastStore } ) => {

  const { name, ratingScore, ratingCount, photoId, price, offerWebsite, hasFreeShipping } = offer;

  const { currentUser } = useCurrentUser();

  const [ shopPhoto ] = useFetchData<string>( `/files/${ photoId }` );

  const handleClick = async () => {

    try {

      await Axios.post( `/history`, {
        action: "checkOffer",
        content: offerWebsite,
        userId: currentUser?.userId
      } );


    } catch ( e: any ) {
      toast.error( e );
    }
  }

  return (

    <Col xs={ 12 } as={ Row } className={ `my-1 pe-3` }>

      <Col xs={ 1 }/>

      <Col xs={ 11 } className={ `hstack  bg-light text-dark rounded-card-10 py-3 mnh-100px` }>


        <Col xs={ 1 } className={ `text-center` }>

          <img
            src={ shopPhoto || NO_PHOTO }
            alt={ `` }
            style={{width: "4.8rem",height: "3.2rem"}}
            className={ `rounded-card-10 border border-1 border-dark p-1` }
          />

        </Col>

        <Col xs={ 2 } className={ `text-center text-dark fw-bold` }>
          {
            name
          }
        </Col>

        <Col xs={ 3 } className={ `text-center d-flex align-items-center justify-content-center` }>

          <StarRatings
            name={ `score` }
            rating={ ratingScore }
            starRatedColor={ `gold` }
            starEmptyColor={ `#9A9A9A` }
            starDimension={ `1.2rem` }
          />

          <span className={ `text-secondary fs-7 ` }>
            {
              `( ${ ratingCount } )`
            }
          </span>

        </Col>

        <Col xs={ 3 } className={ `text-center` }>

          <span className={ `rounded-pill bg-dark px-4 py-1 ${ firstStore ? `text-success` : `text-light` }` }>
            {
              `${ price }PLN ${ hasFreeShipping ? `+ free shipping` : `` }`
            }
          </span>

        </Col>

        <Col xs={ 3 } className={ `text-center` }>

          <a
            href={ offerWebsite }
            target={ `_blank` }
          >
            <Button
              className={ `rounded-card-10 text-light px-5 py-1` }
              variant={ `info` }
              onClick={ handleClick }
            >
              Proceed to offer
            </Button>
          </a>


        </Col>


      </Col>

      {
        !lastStore && <HrBrake/>
      }
    </Col>
  );
};

export default OnlineStore;