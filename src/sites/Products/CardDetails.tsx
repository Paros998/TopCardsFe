import React, { Dispatch, FunctionComponent, useEffect } from 'react';
import { ProductProps } from "../../interfaces/models/Product";
import { useFetchData } from "../../hooks/useFetchData";
import { CardDetailsModel } from "../../interfaces/models/product/CardDetailsModel";
import CardNewOrEditForm from "../../components/Forms/product/CardNewOrEditForm";
import { Formik } from "formik";
import { Spinner } from "react-bootstrap";
import ProductNotFound from "../../components/NotFound/ProductNotFound";
import { ProductType } from "../../interfaces/enums/ProductType";
import { useBackground } from "../../contexts/BackgroundContext";

interface OwnProps extends ProductProps {
  editable?: boolean;
  setEditable?: Dispatch<React.SetStateAction<boolean>>;
}

type Props = OwnProps;

const CardDetails: FunctionComponent<Props> = ( { productId, editable, setEditable } ) => {
  const { setBackground } = useBackground();

  useEffect( () => {
    setBackground( undefined );
  } )

  const [ card, , isPending ] = useFetchData<CardDetailsModel>( `cards/${ productId }` );

  if ( isPending )
    return <div className={ `d-flex align-items-center justify-content-center h-100 w-100` }>
      <Spinner animation={ "border" } variant={ 'light' }/>
    </div>

  if ( !card )
    return (
      <ProductNotFound productId={ productId as string } type={ productId as ProductType }/>
    );

  return (
    <>
      <Formik<CardDetailsModel>
        initialValues={ card }
        onSubmit={ () => {
        } }
      >
        <CardNewOrEditForm isNewProduct={ false } editable={ editable || false }
                           setEditable={ setEditable ? setEditable : () => {
                           } } inDetails={ true }/>
      </Formik>
    </>
  );
};

export default CardDetails;
