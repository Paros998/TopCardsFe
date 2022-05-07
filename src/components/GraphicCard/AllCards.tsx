import React from 'react';
import {BasicCards} from "../../constants/CardsModels/BasicCards";
import EditDeleteCards from "./EditDeleteCards";

const AllCards = () => {
  return (
    <>
      {BasicCards.map((card, index) => <EditDeleteCards index={index} card={card}/>)}
    </>
  );
};

export default AllCards;