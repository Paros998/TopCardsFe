import React, { FC } from 'react';
import { BasicCardModel } from "../../interfaces/models/BasicCardModel";
import { Col, Spinner } from "react-bootstrap";
import NotFoundPhoto from "../../assets/images/product-not-found.jpg";
import BasicCardInfo from "../GraphicCard/BasicCardInfo";
import AdvertImage from "../advertisment/AdvertImage";

interface SuggestedCardsProps {
  cards: BasicCardModel[] | [];
  isPending: boolean;
}

const SuggestedCards: FC<SuggestedCardsProps> = ( { cards, isPending } ) => {

  const photoClass = 'h-100 w-auto';

  if ( isPending )
    return <Col className={ `d-flex align-items-center justify-content-center` }>
      <Spinner className={ `` } animation={ "border" } variant={ "light" }/>
    </Col>;

  if ( cards?.length === 0 )
    return <Col className={ `h-100 d-flex align-items-center justify-content-center` }>
      <img src={ NotFoundPhoto } alt={ '' } className={ `rounded-circle ${ photoClass }` }/>
    </Col>;

  return <>
    {
      cards?.map( ( value, index ) =>

        <>

          <Col
            key={ index }
            xs={ 12 }
            sm={ 12 }
            md={ 6 }
            lg={ 4 }
            xl={ 4 }
            xxl={ 3 }
            className={ `mb-1 mb-md-2 btn-pointer ` }
          >
            <BasicCardInfo card={ value } className={ `bg-danger fs-8 h-100 background-danger-hover` }
                           unavailableColor={ `text-dark` }
                           cardPhotoSize={ `sm` }
                           followed={ value.isFollowed }
            />

          </Col>

          {

            index % 4 === 0 &&

            <Col
                xs={ 12 }
                sm={ 12 }
                md={ 6 }
                lg={ 4 }
                xl={ 4 }
                xxl={ 3 }
                className={ `mb-1 h-100 btn-pointer` }
            >
                <a
                    href={ `https://pip-frontend-server.herokuapp.com/` }
                    target={ `_blank` }>
                    <AdvertImage/>
                </a>
            </Col>

          }

        </>
      )
    }

  </>
};

export default SuggestedCards;