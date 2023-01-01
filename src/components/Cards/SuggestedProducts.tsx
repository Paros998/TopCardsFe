import React, { FC, useMemo, useState } from 'react';
import { BasicProductModel } from "../../interfaces/models/BasicProductModel";
import { Col, Row, Spinner } from "react-bootstrap";
import NotFoundPhoto from "../../assets/images/product-not-found.jpg";
import BasicProductInfo from "../Products/BasicProductInfo";
import { ProductType } from "../../interfaces/enums/ProductType";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { useFetchData } from "../../hooks/useFetchData";
import { PageResponse } from "../../interfaces/PageResponse";
import Pagination from "@mui/material/Pagination";

interface SuggestedProductsProps {
  productType: ProductType;
}

const SuggestedProducts: FC<SuggestedProductsProps> = ( { productType } ) => {
  const [ page, setPage ] = useState<number>( 1 );
  const { currentUser } = useCurrentUser();

  const params = useMemo( () => {
    return {
      userId: currentUser?.userId,
      productType: productType,
      page: page,
      pageLimit: 8
    };
  }, [ currentUser?.userId, productType, page ] )

  const [ pageResponse, , isPending ] = useFetchData<PageResponse<BasicProductModel>>( 'products/suggested', { params: params } )

  const products: BasicProductModel[] = useMemo( () => {
    return pageResponse?.content ? pageResponse.content : [];
  }, [ pageResponse?.content ] );

  const totalPages: number = useMemo( () => {
    return pageResponse?.totalPages ? pageResponse.totalPages : 0;
  }, [ pageResponse?.totalPages ] );

  const photoClass = 'mh-100px w-auto';

  if ( isPending )
    return <Col className={ `d-flex align-items-center justify-content-center` }>
      <Spinner className={ `` } animation={ "border" } variant={ "dark" }/>
    </Col>;

  if ( products?.length === 0 )
    return <Row> <Col className={ `d-flex align-items-center justify-content-center` }>
      <img src={ NotFoundPhoto } alt={ '' } className={ `border border-1 border-dark rounded-circle ${ photoClass }` }/>
    </Col> </Row>;

  return <Row>
    {
      products?.map( ( value, index ) =>
        <Col
          key={ index }
          xs={ 12 }
          sm={ 12 }
          lg={ 6 }
          xxl={ 4 }
          className={ `mb-1 mb-md-2 btn-pointer mnh-200px mh-200px` }
        >
          <BasicProductInfo product={ value }
                            className={ `bg-dark  h-100 background-danger-hover text-light` }
                            unavailableColor={ `text-primary-dark` }
                            productPhotoSize={ `sm` }
                            followed={ value.isFollowed }
          />

        </Col>
      )
    }

    <Col xs={ 12 } className={ `d-flex align-items-center justify-content-center` }>

      <Pagination
        count={ totalPages }
        className={ `bg-light rounded-card-10` }
        color={ "primary" }
        page={ page }
        onChange={ ( event, newPage ) => setPage( newPage ) }
      />

    </Col>

  </Row>
};

export default SuggestedProducts;