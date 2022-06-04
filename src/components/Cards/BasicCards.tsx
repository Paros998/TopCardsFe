import React, { FC } from 'react';
import { BasicCardModel } from "../../interfaces/models/BasicCardModel";
import { Col, Spinner } from "react-bootstrap";
import BasicCardInfo from "../GraphicCard/BasicCardInfo";
import NotFoundPhoto from "../../assets/images/product-not-found.jpg";

interface BasicCardsProps {
  cards: BasicCardModel[] | [];
  isPending: boolean;
}

const BasicCards: FC<BasicCardsProps> = ( { cards, isPending } ) => {

  const photoClass = 'h-100 w-auto ';

  if ( isPending )
    return <Col className={ `d-flex align-items-center justify-content-center` }>
      <Spinner className={ `` } animation={ "border" } variant={ "light" }/>
    </Col>;

  if ( cards?.length === 0 )
    return <Col className={ `d-flex align-items-center justify-content-center h-100` }>
      <img src={ NotFoundPhoto } alt={ '' } className={ `rounded-circle ${ photoClass }` }/>
    </Col>;

  return <>
    {
      cards?.map( ( value, index ) =>
        <Col
          key={ index }
          xs={ 12 }
          sm={ 12 }
          md={ 6 }
          lg={ 4 }
          xl={ 4 }
          xxl={ 3 }
          className={ `mb-1 mb-md-2 btn-pointer mh-50` }
        >
          <BasicCardInfo card={ value } className={ `text-dark background-light-hover` }
                         followed={ value.isFollowed }/>
        </Col>
      )
    }

  </>
};

export default BasicCards;