import React, { useMemo, useState } from 'react';
import EditDeleteProducts from "../../Products/EditDeleteProducts";
import { PageRequest } from "../../../interfaces/PageRequest";
import { useFetchData } from "../../../hooks/useFetchData";
import { PageResponse } from "../../../interfaces/PageResponse";
import { BasicProductModel } from "../../../interfaces/models/BasicProductModel";
import Pagination from "@mui/material/Pagination";
import TextWithDiamond from "../../TextWithDiamon/TextWithDiamond";
import { Form } from 'react-bootstrap';
import { ProductType } from "../../../interfaces/enums/ProductType";
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";

interface ProductPageRequest extends PageRequest {

}

const ManageAllProducts = () => {

  const [ page, setPage ] = useState<number>( 1 );
  const [ type, setType ] = useState<ProductType | null>( null );
  const [ query, setQuery ] = useState<string | null>( null );

  const { currentUser } = useCurrentUser();

  const params: ProductPageRequest = useMemo( () => {
    return {
      page: page,
      pageLimit: 5,
      sortBy: "title",
      sortDir: "asc",
      userId: currentUser?.userId,
      productType: type,
      searchQuery: query
    }
  }, [ page, currentUser?.userId, type, query ] )

  const [ products, , isPending ] = useFetchData<PageResponse<BasicProductModel>>( 'products', { params } );

  return (
    <div className={ `w-100 d-flex bg-secondary-dark h-90 ` }>
      <div
        className={ `d-flex bg-dark rounded-card-10 flex-column w-20 px-2 justify-content-start align-items-center m-1` }>

        <TextWithDiamond className={ `fs-5 my-1 w-100` } diamondClassName={ `text-light` }>
          Filter Products
        </TextWithDiamond>

        <hr className={ `h-2px w-95` }/>

        <span className={ `ms-3 my-1 w-100` }>
          Choose Category
        </span>

        <Form.Select className={ `my-1 w-100` } onChange={ event => {
          const data: string = event.target.value;
          const type: ProductType = data as ProductType;
          setType( type );
        } }>
          <option>Category</option>
          {
            ( Object.keys( ProductType ) as Array<keyof typeof ProductType> ).map( ( key ) => {
              return <option value={ key }>{ key }</option>
            } )
          }
        </Form.Select>

        <hr className={ `h-2px w-95 ` }/>

        <span className={ `ms-3 my-1 w-100` }>
          Search Query
        </span>

        <Form.Control className={ `mt-1 w-100` } type={ "text" } onChange={ event => setQuery( event.target.value ) }/>
        <Form.Text muted className={ `w-100 mb-1 px-1` }>
          Usually searches only by product title
        </Form.Text>
      </div>

      <div className={ `d-flex flex-column w-80 h-100 px-3 justify-content-center align-items-center` }>

        <div className={ `d-flex justify-content-center h-95 w-100` }>
          <EditDeleteProducts products={ products?.content || [] } isPending={ isPending }/>
        </div>

        <div className={ `d-flex justify-content-center  w-100 my-1` }>
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

export default ManageAllProducts;