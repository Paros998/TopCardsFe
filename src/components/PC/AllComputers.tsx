import React, { useMemo, useState } from 'react';
import { ProductType } from "../../interfaces/enums/ProductType";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { useFetchData } from "../../hooks/useFetchData";
import { PageResponse } from "../../interfaces/PageResponse";
import { BasicProductModel } from "../../interfaces/models/BasicProductModel";
import TextWithDiamond from "../TextWithDiamon/TextWithDiamond";
import { Form } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import Products from "../Products/Products";
import { PageRequest } from "../../interfaces/PageRequest";

interface ProductPageRequest extends PageRequest {
  productType: ProductType | null;
}

const AllComputers = () => {
  const [ page, setPage ] = useState<number>( 1 );
  const type: ProductType = ProductType.PC;
  const [ query, setQuery ] = useState<string | null>( null );

  const { currentUser } = useCurrentUser();

  const params: ProductPageRequest = useMemo( () => {
    return {
      page: page,
      pageLimit: 12,
      sortBy: "title",
      sortDir: "asc",
      userId: currentUser?.userId,
      productType: type,
      searchQuery: query
    }
  }, [ page, currentUser?.userId, type, query ] )

  const [ products, , isPending ] = useFetchData<PageResponse<BasicProductModel>>( 'products', { params } );

  return (
    <div className={ `w-100 d-flex mnh-700px ` }>
      <div
        className={ `d-flex bg-secondary-dark rounded-card-10 flex-column w-20 p-1 text-light px-2 justify-content-start align-items-center m-1 ` }>

        <TextWithDiamond className={ `fs-5 my-1 w-100` } diamondClassName={ `text-light` }>
          Filter Personal Computers
        </TextWithDiamond>

        <hr className={ `h-2px w-95 ` }/>

        <span className={ `ms-3 my-1 w-100` }>
          Search Query
        </span>

        <Form.Control className={ `mt-1 w-100` } type={ "text" } onChange={ event => setQuery( event.target.value ) }/>
        <Form.Text muted className={ `w-100 mb-1 px-1` }>
          Usually searches only by product title
        </Form.Text>
      </div>

      <div className={ `d-flex flex-column w-80 px-3 justify-content-center align-items-center` }>

        <div className={ `d-flex justify-content-center mnh-95 w-100` }>
          <Products products={ products?.content || [] } isPending={ isPending }/>
        </div>

        <div className={ `d-flex justify-content-center w-100 py-1` }>
          <Pagination
            count={ products?.totalPages || 1 }
            className={ `bg-light rounded-card-10 ${ products?.content ? 'd-flex' : 'd-none' }` }
            color={ "primary" }
            page={ page }
            onChange={ ( event, newPage ) => setPage( newPage ) }
          />
        </div>

      </div>

    </div>
  );
};

export default AllComputers;