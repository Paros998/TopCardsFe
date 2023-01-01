import React, { FC } from 'react';
import EditDeleteProduct from "./EditDeleteProduct";
import { BasicProductModel } from "../../interfaces/models/BasicProductModel";
import { Row, Spinner } from "react-bootstrap";
import NotFoundPhoto from "../../assets/images/product-not-found.jpg";

export interface ProductsProps {
  products: BasicProductModel[] | [];
  isPending: boolean;
}

const EditDeleteProducts: FC<ProductsProps> = ( { products, isPending } ) => {

  if ( isPending )
    return <div className={ `d-flex justify-content-center align-items-center ` }>
      <Spinner style={ { width: "3rem", height: "3rem" } } animation={ "border" } variant={ "light" }/>
    </div>;

  if ( products?.length === 0 )
    return <div className={ `d-flex justify-content-center align-items-center ` }>
      <img src={ NotFoundPhoto } alt={ '' } className={ `rounded-circle h-50 w-auto` }/>
    </div>;

  return (
    <Row className={ `w-100 justify-content-start d-flex flex-column` }>
      { products.map( ( card, index ) =>
        <EditDeleteProduct index={ index } product={ card }/> ) }
    </Row>
  );
};

export default EditDeleteProducts;