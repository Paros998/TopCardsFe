import React, { useMemo, useState } from 'react';
import BasicUser from "./BasicUser";
import { useFetchData } from "../../hooks/useFetchData";
import { UserModel } from "../../interfaces/models/UserModel";
import { Col, Spinner } from "react-bootstrap";
import { PageRequest } from "../../interfaces/PageRequest";
import { PageResponse } from "../../interfaces/PageResponse";
import Pagination from "@mui/material/Pagination";

const AllUsers = () => {

  const [ page, setPage ] = useState<number>( 1 );

  const params: PageRequest = useMemo( () => {
    return {
      page: page,
      pageLimit: 5,
      sortDir: "asc",
      sortBy: "username"
    }
  }, [ page ] );

  const [ data, fetchUsers, isPending ] = useFetchData<PageResponse<UserModel>>( '/users', { params } );

  if ( isPending )

    return <Col className={ `d-flex align-items-center justify-content-center` }>
      <Spinner
        style={ { width: "3rem", height: "3rem" } } animation={ "border" } variant={ "light" }/>
    </Col>

  return (
    <>
      <div className={ `vstack h-80 w-100 overflow-y-scroll px-3 my-1 mt-2 thumb-slim thumb-light` }>
        {
          data?.content?.map( ( user, index ) => <BasicUser key={index} index={ index } user={ user } fetchUsers={ fetchUsers }/> )
        }
      </div>

      <div className={`d-flex align-items-center justify-content-center`}>

        <Pagination
          count={ data?.totalPages | 1 }
          className={ `bg-light rounded-card-10` }
          color={ "primary" }
          page={ page }
          onChange={ ( event, newPage ) => setPage( newPage ) }
        />

      </div>
    </>
  );
};

export default AllUsers;