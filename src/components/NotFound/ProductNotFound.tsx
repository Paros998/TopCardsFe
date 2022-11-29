import React, { FC } from 'react';
import { Controller, CpuFill, Laptop, Pc, PciCard } from "react-bootstrap-icons";
import BackButtonArrowCircle from "../BackButton/BackButtonArrowCircle";
import { ProductType } from "../../interfaces/enums/ProductType";

interface ProductNotFoundProps {
  productId: string;
  type: ProductType;
}

const ProductNotFound: FC<ProductNotFoundProps> = ( { productId, type } ) => {
  return (
    <main
      className={ `d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark text-light` }>

      <BackButtonArrowCircle className={ `position-absolute left-5 top-5` } arrowSize={ `fs-1` }/>
      {
        {
          GPU: <PciCard className={ `text-light ` } fontSize={ '30rem' }/>,
          CONSOLE: <Controller className={ `text-light ` } fontSize={ '30rem' }/>,
          CPU: <CpuFill className={ `text-light ` } fontSize={ '30rem' }/>,
          PC: <Pc className={ `text-light ` } fontSize={ '30rem' }/>,
          LAPTOP: <Laptop className={ `text-light ` } fontSize={ '30rem' }/>,
        }[ type ]
      }

      <h1
        className={ `mt-lg-4 mt-md-2 mt-sm-1` }
      >
        Product Not Found 404
      </h1>

      <h1
        className={ `mt-lg-4 mt-md-2 mt-sm-1` }
      >
        Id: { productId }
      </h1>

    </main>

  );
};

export default ProductNotFound;