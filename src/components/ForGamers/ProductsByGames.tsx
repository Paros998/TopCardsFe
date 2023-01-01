import React, { FC, useEffect, useMemo, useState } from 'react';
import { ProductTypeProps } from "../../interfaces/models/Product";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { PageResponse } from "../../interfaces/PageResponse";
import { ProductModelWithPerformance } from "../../interfaces/models/BasicProductModel";
import { Col, Row, Spinner } from "react-bootstrap";
import NotFoundPhoto from "../../assets/images/product-not-found.jpg";
import Pagination from "@mui/material/Pagination";
import { usePostCqrs } from "../../hooks/usePostCqrs";
import { ProductType } from "../../interfaces/enums/ProductType";
import { useFilterGamesWithScore } from "../../contexts/GameWithScoreModalContext/GameWithScoreModalContext";
import { FilterGame } from "../../interfaces/models/game/FilterGame";
import Product from "../Products/Product";

interface ProductsByGamesProps extends ProductTypeProps {
  fetchData: boolean;
}

const ProductsByGames: FC<ProductsByGamesProps> = ( { productType, fetchData } ) => {
  const [ page, setPage ] = useState<number>( 1 );
  const [ cacheMeta, setCacheMeta ] = useState<string | null>( null );
  const { currentUser } = useCurrentUser();

  const { filterGames, consoles } = useFilterGamesWithScore()

  const params = useMemo( () => {
    return {
      userId: currentUser?.userId,
      page: page,
      pageLimit: 3,
      cacheMeta: cacheMeta,
    };
  }, [ currentUser?.userId, page, cacheMeta ] )

  useEffect( () => {
    setPage( 1 );
    setCacheMeta( null );
  }, [ filterGames ] )

  const body = useMemo( () => {
    if ( productType === ProductType.CONSOLE )
      return {
        productType: productType,
        consoles: consoles,
        games: filterGames as FilterGame[]
      }

    return {
      productType: productType,
      consoles: [],
      games: filterGames as FilterGame[]
    }
  }, [ productType, consoles, filterGames ] );

  const notExecute: boolean = useMemo<boolean>( () => {
    if ( filterGames.length === 0 )
      return true;
    return !fetchData;
  }, [ fetchData, filterGames ] )

  const [ pageResponse, , isPending ] = usePostCqrs<PageResponse<ProductModelWithPerformance>>(
    'products/search-products/by-games', {
      params: params,
      cqrsBody: body,
      notExecute: notExecute,
      errorMessage: `Couldn't search data now, try again later`
    } );

  useEffect( () => {
    if ( pageResponse?.cacheMeta ) {
      const meta = pageResponse.cacheMeta;

      if ( cacheMeta === null )
        setCacheMeta( meta );

      if ( cacheMeta !== null && cacheMeta !== meta )
        setCacheMeta( meta );
    }

  }, [ pageResponse?.cacheMeta ] )

  const products: ProductModelWithPerformance[] = useMemo( () => {
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
      products?.map( ( product, index ) =>

        <Product product={ product } key={ index } withPerformance={ true }/>
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

export default ProductsByGames;