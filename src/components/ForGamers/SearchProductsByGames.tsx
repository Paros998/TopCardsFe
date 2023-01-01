import React, { useMemo, useState } from 'react';
import { Platform } from "../../interfaces/enums/Platform";
import { PageRequest } from "../../interfaces/PageRequest";
import { useFetchData } from "../../hooks/useFetchData";
import { PageResponse } from "../../interfaces/PageResponse";
import { GameWithScores } from "../../interfaces/models/game/GameWithScores";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import TextWithDiamond from "../TextWithDiamon/TextWithDiamond";
import Games from "./Games";
import Pagination from "@mui/material/Pagination";
import { useFilterGamesWithScore } from "../../contexts/GameWithScoreModalContext/GameWithScoreModalContext";
import DisplayGamesInFilter from "./DisplayGamesInFilter";
import DisplayProductsWithPerformance from "./DisplayProductsWithPerformance";
import {
  DatabaseProductDetailsProvider
} from "../../contexts/ModalProductDetailsContext/DatabaseProductDetailsContext";

const SearchProductsByGames = () => {
  const [ page, setPage ] = useState<number>( 1 );
  const [ query, setQuery ] = useState<string | null>( null );
  const [ platform, setPlatform ] = useState<Platform | null>( null );

  const params: PageRequest = useMemo( () => {
    return {
      page: page,
      pageLimit: 15,
      sortDir: "asc",
      sortBy: "title",
      searchTitle: query,
      searchPlatform: platform
    }
  }, [ page, query, platform ] );

  const { filterGames } = useFilterGamesWithScore();

  const resetFilter = () => {
    setPage( 1 );
    setQuery( null );
    setPlatform( null );
  }

  const [ games, , isPending ] = useFetchData<PageResponse<GameWithScores>>( `/games/with-score`, { params } )


  const hr = <Col xs={ 12 }>
    <hr className={ 'h-2px w-95 my-3 mx-auto' }/>
  </Col>;

  const gamesData = () => {
    if ( isPending )
      return <>
        <Col className={ `d-flex align-items-center justify-content-center mnh-95 w-100` }>
          <Spinner style={ { width: "12rem", height: "12rem" } } className={ `` } animation={ "border" }
                   variant={ "dark" }/>
        </Col>
      </>;

    return <>
      <div className={ `d-flex justify-content-center mnh-95 w-100` }>
        <Games games={ games?.content || [] }/>
      </div>

      <div className={ `d-flex justify-content-center w-100 py-1` }>
        <Pagination
          count={ games?.totalPages || 1 }
          className={ `bg-light rounded-card-10 ${ games?.content ? 'd-flex' : 'd-none' }` }
          color={ "primary" }
          page={ page }
          onChange={ ( event, newPage ) => setPage( newPage ) }
        />
      </div>
    </>;
  }

  return (
    <>
      <Row className={ `h-10 m-0 align-items-center py-3 mx-1 mx-md-2 mb-1` }>
        <Col xs={ 12 } className={ `fs-3 ` }>
          Games available for product search
        </Col>

      </Row>

      <div className={ `w-100 d-flex mnh-700px ` }>

        <div
          className={ `d-flex bg-secondary-dark rounded-card-10 flex-column w-20 p-1 text-light px-2 justify-content-start align-items-center m-1 ` }>

          <TextWithDiamond className={ `fs-5 my-1 w-100` } diamondClassName={ `text-light` }>
            Filter Games
          </TextWithDiamond>

          <hr className={ `h-2px w-95 ` }/>

          <span className={ `ms-3 my-1 w-100` }>
          Search Query
          </span>

          <Form.Control className={ `mt-1 w-100` } type={ "text" }
                        onChange={ event => setQuery( event.target.value ) }/>
          <Form.Text muted className={ `w-100 mb-1 px-1` }>
            Searches by game title.
          </Form.Text>

          <hr className={ `h-2px w-95 ` }/>

          <span className={ `ms-3 my-1 w-100` }>
          Choose Platform
          </span>

          <Form.Select className={ `my-1 w-100` } onChange={ event => {
            const data: string = event.target.value;
            const platform: Platform = data as Platform;
            setPlatform( platform );
          } }>
            <option>Platform</option>
            {
              ( Object.keys( Platform ) as Array<keyof typeof Platform> ).map( ( key ) => {
                return <option key={ key } value={ key }>{ key }</option>
              } )
            }
          </Form.Select>
          <Form.Text muted className={ `w-100 mb-1 px-1` }>
            Filters games based on their available platforms PC, PS4, etc..
          </Form.Text>

          <Button
            className={ `mt-4 px-3 py-2 mx-auto light-dark rounded-card-10` }
            onClick={ resetFilter }
          >
            Reset Filters
          </Button>

        </div>

        <div className={ `d-flex flex-column w-80 px-3 justify-content-center align-items-center pt-1` }>
          { gamesData() }
        </div>
      </div>

      { filterGames.length > 0 && hr }

      <DisplayGamesInFilter/>

      <DatabaseProductDetailsProvider>
        <DisplayProductsWithPerformance/>
      </DatabaseProductDetailsProvider>

    </>
  );
};

export default SearchProductsByGames;