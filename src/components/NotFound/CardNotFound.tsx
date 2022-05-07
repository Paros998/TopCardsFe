import React, {FC} from 'react';
import {GpuCard} from "react-bootstrap-icons";
import BackButtonArrowCircle from "../BackButton/BackButtonArrowCircle";

interface CardNotFoundProps{
  cardId:string;
}

const CardNotFound:FC<CardNotFoundProps> = ({cardId}) => {
  return (
    <main
      className={`d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark text-light`}>

      <BackButtonArrowCircle className={`position-absolute left-5 top-5`} arrowSize={`fs-1`}/>

      <GpuCard
        className={`text-light `}
        fontSize={'30rem'}
      />

      <h1
        className={`mt-lg-4 mt-md-2 mt-sm-1`}
      >
        Product Not Found 404
      </h1>

      <h1
        className={`mt-lg-4 mt-md-2 mt-sm-1`}
      >
        Id: {cardId}
      </h1>

    </main>

  );
};

export default CardNotFound;