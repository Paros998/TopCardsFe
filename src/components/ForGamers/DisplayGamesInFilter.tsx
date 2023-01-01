import React from 'react';
import GameInFilter from "./GameInFilter";
import { useFilterGamesWithScore } from "../../contexts/GameWithScoreModalContext/GameWithScoreModalContext";
import { platformBadge } from "./CommonGameData";
import { Platform } from "../../interfaces/enums/Platform";
import { Button } from "react-bootstrap";

const DisplayGamesInFilter = () => {
  const { filterGames, consoles, setFilterGames } = useFilterGamesWithScore();

  const checkingForPcStuff: boolean = filterGames.every( game => game.platforms.includes( Platform.PC ) );

  const resetFilter = () => {
    setFilterGames( [] );
  }

  return (
    <>

      <div
        className={ `w-100 d-flex-column m-0 align-items-center py-3 mx-1 mx-md-2 mb-1 ${ filterGames.length > 0 ? 'd-block' : 'd-none' }` }>
        <div className={ `fs-3 w-100 mx-1 mx-md-2` }>
          Currently filtering by games:
        </div>

        <div className={ `container w-100 d-flex mt-2` }>

          {
            filterGames.map( ( game, index ) => <GameInFilter key={ index } name={ game.name } index={ index }/> )
          }
        </div>

        <div className={ `w-100 d-flex` }>
          <Button
            className={ `px-3 py-2 mx-auto dark-light rounded-card-10` }
            onClick={ resetFilter }
          >
            Reset Filters
          </Button>
        </div>

        <div className={ `fs-4 w-100 mx-1 mx-md-2 ps-3 ${ consoles.length > 0 ? 'd-block' : 'd-none' }` }>
          Checking for consoles:
        </div>

        <div className={ `container w-100 d-flex mt-2 fs-5` }>
          { consoles && consoles.map( platformBadge ) }
        </div>

        <div className={ `fs-4 w-100 mx-1 mx-md-2 ps-3` }>
          Checking for PC platform related hardware:
          <span className={ `ms-3 fw-bolder fs-3 ${ checkingForPcStuff ? 'text-success' : 'text-danger' }` }>
            { checkingForPcStuff ? 'Yes' : 'No' }
          </span>
        </div>

      </div>
    </>
  );
};

export default DisplayGamesInFilter;