import React, { FC } from 'react';
import { GameWithScores } from "../../interfaces/models/game/GameWithScores";
import NotFoundPhoto from "../../assets/images/product-not-found.jpg";
import { Row } from "react-bootstrap";
import Game from "./Game";


interface GamesProps {
  games: GameWithScores[] | [];
}

const Games: FC<GamesProps> = ( { games } ) => {

  if ( games?.length === 0 )
    return <div className={ `d-flex justify-content-center align-items-center h-100 w-100` }>
      <img src={ NotFoundPhoto } alt={ '' } className={ `rounded-circle h-50 w-auto ` }/>
    </div>;

  return (
    <Row className={ `h-100 w-100 ` }>
      { games.map( ( game, index ) =>
        <Game game={ game } key={ index }/>
      ) }
    </Row>
  );
};

export default Games;