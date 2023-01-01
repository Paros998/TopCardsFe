import React, { FC } from 'react';
import { ProductsProps } from "./EditDeleteProducts";
import { Row, Spinner } from "react-bootstrap";
import NotFoundPhoto from "../../assets/images/product-not-found.jpg";
import Product from "./Product";

interface DatabaseProductsProps extends ProductsProps {

}

const Products: FC<DatabaseProductsProps> = ( { products, isPending } ) => {
  if ( isPending )
    return <div className={ `d-flex justify-content-center align-items-center h-100 w-100` }>
      <Spinner style={ { width: "12rem", height: "12rem" } } animation={ "border" } variant={ "dark" }/>
    </div>;

  if ( products?.length === 0 )
    return <div className={ `d-flex justify-content-center align-items-center h-100 w-100` }>
      <img src={ NotFoundPhoto } alt={ '' } className={ `rounded-circle h-50 w-auto ` }/>
    </div>;

  return (
    <Row className={ `h-100 w-100 ` }>
      { products.map( ( product, index ) =>
        <Product product={ product } key={ index }/>
      ) }
    </Row>
  );
};

export default Products;