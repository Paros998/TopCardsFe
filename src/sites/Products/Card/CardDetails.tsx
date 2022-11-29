import React, { FunctionComponent } from 'react';
import { ProductProps } from "../../../interfaces/models/Product";
import { useFetchData } from "../../../hooks/useFetchData";
import { CardDetailsModel } from "../../../interfaces/models/CardDetailsModel";

interface OwnProps extends ProductProps {
}

type Props = OwnProps;

const CardDetails: FunctionComponent<Props> = ( { productId } ) => {

  const [ card, , isPending ] = useFetchData<CardDetailsModel>( `cards/${ productId }` );

  console.log( card )

  return (
    <>
    </>
  );
};

export default CardDetails;
