import React, { useMemo, useState } from 'react';
import BasicUser from "./BasicUser";
import { useFetchData } from "../../hooks/useFetchData";
import { UserModel } from "../../interfaces/models/UserModel";
import { Col, Row, Spinner } from "react-bootstrap";
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
    <div className={ 'h-85' }>

      <div className={ 'w-100 bg-secondary-dark py-2' }>
        <Row
          className={ `text-light rounded-card-10 fw-bold w-95 mx-auto` }>

          <Col xs={ 1 } className={ 'text-center' }>Photo</Col>

          <Col xs={ 4 } className={ 'text-center' }>Email</Col>

          <Col xs={ 3 } className={ 'text-center' }>Username </Col>

          <Col xs={ 2 }></Col>

          <Col xs={ 2 }></Col>

        </Row>
      </div>

      <div className={ `bg-secondary-dark vstack h-95 w-100 overflow-y-scroll thumb-slim thumb-light pe-0 me-0` }>
        {
          data?.content?.map( ( user, index ) => <BasicUser key={ index } index={ index } user={ user }
                                                            fetchUsers={ fetchUsers }/> )
        }
      </div>

      <div className={ `bg-secondary-dark d-flex align-items-center justify-content-center h-5` }>

        <Pagination
          count={ data?.totalPages | 1 }
          className={ `bg-light rounded-card-10` }
          color={ "primary" }
          page={ page }
          onChange={ ( event, newPage ) => setPage( newPage ) }
        />

      </div>
    </div>
  );
};

export default AllUsers;