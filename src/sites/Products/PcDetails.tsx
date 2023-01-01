import React, { Dispatch, FunctionComponent, useEffect } from 'react';
import { ProductProps } from "../../interfaces/models/Product";
import { useFetchData } from "../../hooks/useFetchData";
import { Formik } from "formik";
import { Spinner } from "react-bootstrap";
import ProductNotFound from "../../components/NotFound/ProductNotFound";
import { ProductType } from "../../interfaces/enums/ProductType";
import { useBackground } from "../../contexts/BackgroundContext";
import PcNewOrEditForm from "../../components/Forms/product/PcNewOrEditForm";
import { PcDetailsModel } from "../../interfaces/models/product/PcDetailsModel";

interface OwnProps extends ProductProps {
  editable?: boolean;
  setEditable?: Dispatch<React.SetStateAction<boolean>>;
}

type Props = OwnProps;

const PcDetails: FunctionComponent<Props> = ( { productId, editable, setEditable } ) => {
  const { setBackground } = useBackground();

  useEffect( () => {
    setBackground( undefined );
  } )

  const [ card, , isPending ] = useFetchData<PcDetailsModel>( `computers/${ productId }` );

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
      <Formik<PcDetailsModel>
        initialValues={ card }
        onSubmit={ () => {
        } }
      >
        <PcNewOrEditForm isNewProduct={ false } editable={ editable || false }
                         setEditable={ setEditable ? setEditable : () => {
                         } } inDetails={ true }/>
      </Formik>
    </>
  );
};

export default PcDetails;
