import React, { Dispatch, FunctionComponent, useEffect } from 'react';
import { ProductProps } from "../../interfaces/models/Product";
import { useFetchData } from "../../hooks/useFetchData";
import { Formik } from "formik";
import { Spinner } from "react-bootstrap";
import ProductNotFound from "../../components/NotFound/ProductNotFound";
import { ProductType } from "../../interfaces/enums/ProductType";
import { useBackground } from "../../contexts/BackgroundContext";
import { LaptopDetailsModel } from "../../interfaces/models/product/LaptopDetailsModel";
import LaptopNewOrEditForm from "../../components/Forms/product/LaptopNewOrEditForm";

interface OwnProps extends ProductProps {
  editable?: boolean;
  setEditable?: Dispatch<React.SetStateAction<boolean>>;
}

type Props = OwnProps;

const LaptopDetails: FunctionComponent<Props> = ( { productId, editable, setEditable } ) => {
  const { setBackground } = useBackground();

  useEffect( () => {
    setBackground( undefined );
  } )

  const [ laptop, , isPending ] = useFetchData<LaptopDetailsModel>( `laptops/${ productId }` );

  if ( isPending )
    return <div className={ `d-flex align-items-center justify-content-center h-100 w-100` }>
      <Spinner animation={ "border" } variant={ 'light' }/>
    </div>

  if ( !laptop )
    return (
      <ProductNotFound productId={ productId as string } type={ productId as ProductType }/>
    );

  return (
    <>
      <Formik<LaptopDetailsModel>
        initialValues={ laptop }
        onSubmit={ () => {
        } }
      >
        <LaptopNewOrEditForm isNewProduct={ false } editable={ editable || false }
                             setEditable={ setEditable ? setEditable : () => {
                             } } inDetails={ true }/>
      </Formik>
    </>
  );
};

export default LaptopDetails;
