import React, { ReactNode } from 'react';
import { Badge, Col, Modal, Row, Spinner } from "react-bootstrap";
import { useFetchData } from "../../hooks/useFetchData";
import { useFilterGamesWithScore } from "../../contexts/GameWithScoreModalContext/GameWithScoreModalContext";
import NotFound from "../NotFound/NotFound";
import { GameData } from "../../interfaces/models/game/GameWithScores";
import NO_PHOTO from "../../assets/images/no-image.png";
import { calculateFont, platformBadge } from "./CommonGameData";
import { Platform } from "../../interfaces/enums/Platform";

const GameModalDetails = () => {
  const { setGame, setShowDetailsModal, showDetailsModal, game } = useFilterGamesWithScore();

  const { gameId, fileUrl, name } = game;

  const [ gameDetails, , isPending ] = useFetchData<GameData>( `games/${ gameId }/details` );

  const onHide = () => {
    setShowDetailsModal( false );
    setGame( prevState => prevState );
  }

  const modal = ( children: ReactNode, title?: string ) => {
    return <Modal
      centered
      onHide={ onHide }
      show={ showDetailsModal }
      fullscreen={ true }
    >
      <Modal.Header closeButton className={ `bg-dark text-light modal-close-light` }
      >
        <div className={ `d-flex justify-content-center w-100` }>
          <h3>
            { title ? `Game Details: ${ title }` : `${ name } - Acquiring Data...` }
          </h3>
        </div>
      </Modal.Header>

      <Modal.Body className={ `bg-dark text-light p-0 m-0` }
      >
        { children }
      </Modal.Body>
    </Modal>
  }

  if ( isPending )
    return modal( <div className={ `d-flex align-items-center justify-content-center h-100 w-100` }>
      <Spinner animation={ "border" } variant={ 'light' }/>
    </div> );

  if ( !gameDetails )
    return modal(
      <NotFound/>
    );

  const {
    title,
    releaseDate,
    platforms,
    requiredSpace,
    description,
    scoreOnPlatforms,
    processorRequirements,
    graphicRequirements,
    requiredRam,
    supportedSystems
  } = gameDetails

  const headerClass = `text-secondary fs-4 fw-bold`;
  const dataClass = `text-light fs-5 ps-1`;

  const hr = <div className={ `d-flex w-100 my-3` }>
    <hr className={ 'h-2px text-light w-95 mx-auto ' }/>
  </div>;

  function calculateTheme( score: number ): string {
    if ( score < 35 )
      return "primary";

    if ( score >= 35 && score < 60 )
      return "danger";

    if ( score >= 60 && score < 89 )
      return "warning"

    return "success";
  }

  const renderScore = ( platform: Platform, score: number, index?: number ) => {
    return <>
      <Col xs={ 6 } md={ 2 }>
        { platformBadge( platform, index ) }
      </Col>

      <Col xs={ 6 } md={ 2 }>
        <Badge
          className={ `me-2 mb-1 ` }
          text={ "light" }
          bg={ calculateTheme( score ) }
          key={ index }
        >
          { score }
        </Badge>
      </Col>
    </>;
  }

  const renderPcInfo = () => {
    return <>
      <Col xs={ 4 }>
        Recommended Cpu
      </Col>

      <Col xs={ 8 }>
        <Badge
          className={ `me-2 mb-1 ` }
          text={ "dark" }
          bg={ "light" }
        >
          { processorRequirements }
        </Badge>
      </Col>

      <Col xs={ 4 }>
        Recommended Gpu
      </Col>

      <Col xs={ 8 }>
        <Badge
          className={ `me-2 mb-1 ` }
          text={ "dark" }
          bg={ "light" }
        >
          { graphicRequirements }
        </Badge>
      </Col>

      <Col xs={ 4 }>
        Required Ram Amount
      </Col>

      <Col xs={ 8 }>
        <Badge
          className={ `me-2 mb-1 ` }
          text={ "dark" }
          bg={ "light" }
        >
          { requiredRam + 'GB' }
        </Badge>
      </Col>

      <Col xs={ 4 }>
        Supported Systems
      </Col>

      <Col xs={ 8 }>

        { supportedSystems.map( ( system, index ) =>
          <Badge
            className={ `me-1 mb-1 ` }
            text={ "dark" }
            bg={ "light" }
            key={ index }
          >
            { system }
          </Badge> )
        }

      </Col>
    </>
  }

  return modal(
    <div className={ `w-100 mnh-100 d-flex-column` }>

      <div className={ `w-100 h-60 d-flex container-fluid` }>
        <div className={ `d-flex h-100 w-25 pt-3 ps-4` }>
          <img src={ fileUrl ? fileUrl : NO_PHOTO } alt={ `` }
               style={ { width: "100%", height: "90%" } }
               className={ `bg-dark rounded-card-10 border border-1 border-light` }/>

        </div>

        <Row className={ ` w-75 pt-3 ps-4 align-items-center` }>

          <Col xs={ 3 } className={ headerClass }>
            Title:
          </Col>

          <Col xs={ 9 } className={ dataClass }>
            { title }
          </Col>

          <Col xs={ 3 } className={ headerClass }>
            First released on:
          </Col>

          <Col xs={ 9 } className={ dataClass }>
            { releaseDate }
          </Col>

          <Col xs={ 3 } className={ headerClass }>
            Description:
          </Col>

          <Col xs={ 9 } className={ dataClass }>
            { description ? description : "Description Unavailable.." }
          </Col>

          <Col xs={ 3 } className={ headerClass }>
            Required free space:
          </Col>

          <Col xs={ 9 } className={ dataClass }>
            { requiredSpace + ' GBs' }
          </Col>

          <Col xs={ 3 } className={ headerClass }>
            Available on:
          </Col>

          <Col xs={ 9 } className={ `${ dataClass } ${ calculateFont( platforms ) } ` }>
            { platforms && platforms.map( platformBadge ) }
          </Col>

        </Row>
      </div>

      { hr }

      <div className={ `w-100 container-fluid ${ scoreOnPlatforms ? 'd-flex-column' : 'd-none' } my-4` }>
        <div className={ `d-flex w-100 ps-4 fw-bold fs-4` }>
          Game score on certain platforms
        </div>

        <Row className={ ` w-100 pt-3 ps-5 align-items-center text-light fs-4` }>
          {
            scoreOnPlatforms && scoreOnPlatforms
              .map( ( { platform, score }, index ) => renderScore( platform, score, index ) )
          }
        </Row>

      </div>

      <div
        className={ `w-100 container-fluid ${ platforms.includes( Platform.PC ) ? 'd-flex-column' : 'd-none' } my-4` }>
        <div className={ `d-flex w-100 ps-4 fw-bold fs-4` }>
          PC | Laptop related info
        </div>

        <Row className={ ` w-100 pt-3 ps-5 align-items-center text-light fs-5` }>
          {
            renderPcInfo()
          }
        </Row>

      </div>

    </div>, title
  );
};

export default GameModalDetails;