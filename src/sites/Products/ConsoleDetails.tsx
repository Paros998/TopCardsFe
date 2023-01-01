import React, { Dispatch, FunctionComponent } from 'react';
import { ProductProps } from "../../interfaces/models/Product";
import { useFetchData } from "../../hooks/useFetchData";
import { Formik } from "formik";
import { Spinner } from "react-bootstrap";
import ProductNotFound from "../../components/NotFound/ProductNotFound";
import { ProductType } from "../../interfaces/enums/ProductType";
import { ConsoleDetailsModel } from "../../interfaces/models/product/ConsoleDetailsModel";
import ConsoleNewOrEditForm from "../../components/Forms/product/ConsoleNewOrEditForm";

interface OwnProps extends ProductProps {
  editable?: boolean;
  setEditable?: Dispatch<React.SetStateAction<boolean>>;
}

type Props = OwnProps;

const ConsoleDetails: FunctionComponent<Props> = ( { productId, editable, setEditable } ) => {

  const [ console, , isPending ] = useFetchData<ConsoleDetailsModel>( `consoles/${ productId }` );

  if ( isPending )
    return <div className={ `d-flex align-items-center justify-content-center h-100 w-100` }>
      <Spinner animation={ "border" } variant={ 'light' }/>
    </div>

  if ( !console )
    return (
      <ProductNotFound productId={ productId as string } type={ productId as ProductType }/>
    );

  return (
    <>
      <Formik<ConsoleDetailsModel>
        initialValues={ console }
        onSubmit={ () => {
        } }
      >
        <ConsoleNewOrEditForm isNewProduct={ false } editable={ editable || false }
                              setEditable={ setEditable ? setEditable : () => {
                              } } inDetails={ true }/>
      </Formik>
    </>
  );
};

export default ConsoleDetails;
