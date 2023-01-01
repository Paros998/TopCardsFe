import React, { FC } from 'react';
import { XCircleFill } from "react-bootstrap-icons";
import { useFilterGamesWithScore } from "../../contexts/GameWithScoreModalContext/GameWithScoreModalContext";

interface GameInFilterProps {
  name: string;
  index: number;
}

const GameInFilter: FC<GameInFilterProps> = ( { name: gameName, index } ) => {

  const { setFilterGames, filterGames } = useFilterGamesWithScore();

  const onClick = () => {
    setFilterGames( filterGames.filter( ( { name } ) => name !== gameName ) )
  }

  return (
    <div
      className={ `fs-5 mb-2 me-1 d-flex justify-content-center align-items-center
       rounded-pill ${ index % 2 === 0 ? `bg-salmon text-light` : `bg-primary-light text-salmon` } px-2` }>
      <span>
        { gameName }
      </span>

      <XCircleFill className={ `ms-2 hover-primary btn-pointer` } onClick={ onClick }/>
    </div>
  );
};

export default GameInFilter;