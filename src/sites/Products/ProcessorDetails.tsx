import React, { Dispatch, FunctionComponent } from 'react';
import { ProductProps } from "../../interfaces/models/Product";
import { useFetchData } from "../../hooks/useFetchData";
import { Formik } from "formik";
import { Spinner } from "react-bootstrap";
import ProductNotFound from "../../components/NotFound/ProductNotFound";
import { ProductType } from "../../interfaces/enums/ProductType";
import ProcessorNewOrEditForm from "../../components/Forms/product/ProcessorNewOrEditForm";
import { CpuDetailsModel } from "../../interfaces/models/product/CpuDetailsModel";

interface OwnProps extends ProductProps {
  editable?: boolean;
  setEditable?: Dispatch<React.SetStateAction<boolean>>;
}

type Props = OwnProps;

const ProcessorDetails: FunctionComponent<Props> = ( { productId, editable, setEditable } ) => {
  const [ processor, , isPending ] = useFetchData<CpuDetailsModel>( `processors/${ productId }` );

  if ( isPending )
    return <div className={ `d-flex align-items-center justify-content-center h-100 w-100` }>
      <Spinner animation={ "border" } variant={ 'light' }/>
    </div>

  if ( !processor )
    return (
      <ProductNotFound productId={ productId as string } type={ productId as ProductType }/>
    );

  return (
    <>
      <Formik<CpuDetailsModel>
        initialValues={ processor }
        onSubmit={ () => {
        } }
      >
        <ProcessorNewOrEditForm isNewProduct={ false } editable={ editable || false }
                                setEditable={ setEditable ? setEditable : () => {
                                } } inDetails={ true }/>
      </Formik>
    </>
  );
};

export default ProcessorDetails;
