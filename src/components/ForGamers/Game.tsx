import React, { FC } from 'react';
import { GameWithScores } from "../../interfaces/models/game/GameWithScores";
import { Button, Col } from "react-bootstrap";
import NO_PHOTO from "../../assets/images/no-image.png";
import { useFilterGamesWithScore } from "../../contexts/GameWithScoreModalContext/GameWithScoreModalContext";
import { calculateFont, platformBadge } from "./CommonGameData";
import { PlusCircleFill, XCircleFill } from "react-bootstrap-icons";

interface GameProps {
  game: GameWithScores;
}

const Game: FC<GameProps> = ( { game } ) => {
  const { setGame, setShowDetailsModal, filterGames, setFilterGames } = useFilterGamesWithScore();

  const { name: gameName, platforms: gamePlatforms, fileUrl } = game;

  const showDetails = () => {
    setGame( game );
    setShowDetailsModal( true );
  }

  const switchFilterStatus = () => {
    if ( isAddedToFilters )
      setFilterGames( filterGames.filter( ( { name } ) => name !== gameName ) )
    else
      setFilterGames( [ ...filterGames, { name: gameName, platforms: gamePlatforms } ] );
  }

  const isAddedToFilters: boolean = filterGames.some( ( { name } ) => name === gameName );

  const iconClass = `border border-1 border-dark z-index-1000 fs-3 btn-pointer position-absolute left-95 bottom-95 bg-light
   rounded-circle ${ isAddedToFilters ? 'text-primary hover-primary-dark' : 'text-success hover-success-dark' }`;

  return (
    <Col xs={ 12 } lg={ 6 } xxl={ 4 }
         className={ `bg-dark d-flex position-relative rounded-card-10 border border-3 mnh-300px mh-300px p-1 h-100` }
    >
      {
        isAddedToFilters ? <XCircleFill className={ iconClass } onClick={ switchFilterStatus }/>
          : <PlusCircleFill className={ iconClass } onClick={ switchFilterStatus }/>
      }

      <div className={ `h-100 vstack gap-1 w-50  ms-1` }>
        <span className={ `fs-5 fw-bolder text-light` }>
          { gameName }
        </span>

        <div className={ calculateFont( gamePlatforms ) }>
          { gamePlatforms && gamePlatforms.map( platformBadge ) }
        </div>

        <Button
          className={ `light-dark mx-auto rounded-pill mt-2` }
          onClick={ showDetails }
        >
          Check more
        </Button>

      </div>

      <div className={ `h-100 w-50 d-flex justify-content-end align-items-center` }>
        <img src={ fileUrl ? fileUrl : NO_PHOTO } alt={ `` }
             style={ { width: "80%", height: "90%" } }
             className={ `bg-dark rounded-card-10 border border-1 border-light ratio-21x9` }/>

      </div>
    </Col>
  );
};

export default Game;