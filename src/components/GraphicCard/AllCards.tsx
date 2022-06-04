import React, { FC } from 'react';
import { BasicCards } from "../../constants/CardsModels/BasicCards";
import EditDeleteCards from "./EditDeleteCards";
import { BasicCardModel } from "../../interfaces/models/BasicCardModel";
import { Col, Spinner } from "react-bootstrap";
import NotFoundPhoto from "../../assets/images/product-not-found.jpg";

interface AllCardsProps {
  cards: BasicCardModel[] | [];
  isPending: boolean;
}

const AllCards: FC<AllCardsProps> = ( { cards, isPending } ) => {

  if ( isPending )
    return <div className={ `d-flex h-50 w-100 justify-content-center align-items-center mt-5` }>
      <Spinner style={{width: "3rem",height: "3rem"}}  animation={ "border" } variant={ "light" }/>
    </div>;

  if ( cards?.length === 0 )
    return <div className={ `d-flex h-50 w-100 justify-content-center align-items-center mt-5` }>
      <img src={ NotFoundPhoto } alt={ '' } className={ `rounded-circle h-100 w-auto` }/>
    </div>;

  return (
    <>
      { cards.map( ( card, index ) => <EditDeleteCards index={ index } card={ card }/> ) }
    </>
  );
};

export default AllCards;