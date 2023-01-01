import React, { useEffect, useMemo } from 'react';
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useFetchData } from "../../../hooks/useFetchData";
import { PageResponse } from "../../../interfaces/PageResponse";
import { HistoryModel } from "../../../interfaces/models/HistoryModel";
import { PageRequest } from "../../../interfaces/PageRequest";
import { useNavigate } from "react-router-dom";
import UserAction from "./UserAction";
import RecordsNotFound from "../../../assets/images/records-not-found.png";

const LastUserActions = () => {
  const { currentUser } = useCurrentUser();

  const navigate = useNavigate();

  const navigateToHistory = () => {
    navigate( '/user/history' )
  }

  const params: PageRequest = useMemo( () => {
    return {
      page: 1,
      pageLimit: 3,
      sortDir: "desc",
      sortBy: "dateTime"
    }
  }, [] );

  const [ actions, fetchActions, isPending ] = useFetchData<PageResponse<HistoryModel>>( `/history/${ currentUser?.userId }`, { params } );

  useEffect( () => {
    const interval = setInterval( fetchActions, 60000 );
    return () => clearInterval( interval );
  }, [] )

  if ( isPending )
    return (
      <Row className={ 'align-items-center m-0 py-3 ps-1 ps-md-2 fs-4' }>
        <Col xs={ 6 } className={ `fs-3 hstack gap-3` }>
          Acquiring last actions
          <Spinner animation={ "grow" }/>
        </Col>

      </Row>
    );

  const actionsEmpty: boolean = actions?.content?.length === 0;

  if ( actionsEmpty || ( actions?.content === undefined ) )
    return (
      <>

        <Row className={ 'align-items-center m-0 py-3 ps-1 ps-md-2 fs-4' }>
          <Col xs={ 2 } className={ `fs-3 hstack gap-1` }>
            <span>
              There are no last actions
            </span>
          </Col>

          <Col xs={ 8 } className={ `hstack gap-2 align-items-center justify-content-around` }>
            <img src={ RecordsNotFound } alt={ '' } style={ { height: "8rem" } }
                 className={ `rounded-circle w-auto` }/>
          </Col>

          <Col xs={ 2 } className={ `fs-3 d-flex align-items-center justify-content-end pe-4` }>
            <Button
              className={ `rounded-card-10 fs-5 info-light` }
              onClick={ navigateToHistory }
            >
              Check More
            </Button>
          </Col>
        </Row>

      </>
    );

  return (
    <>

      <Row className={ 'align-items-center m-0 py-3 ps-1 ps-md-2 fs-4' }>
        <Col xs={ 2 } className={ `fs-3 hstack gap-1` }>
          { `Last ${ actions?.content?.length < 2 ? "action" : actions?.content.length + ' actions' }` }
        </Col>

        <Col xs={ 8 } className={ `hstack gap-2 align-items-center justify-content-around` }>
          { actions.content?.map( ( action, index ) =>
            <UserAction key={ index } record={ action }/>
          )
          }
        </Col>

        <Col xs={ 2 } className={ `fs-3 d-flex align-items-center justify-content-end pe-4` }>
          <Button
            className={ `rounded-card-10 fs-5 info-light` }
            onClick={ navigateToHistory }
          >
            Check More
          </Button>
        </Col>
      </Row>

    </>
  );
};

export default LastUserActions;