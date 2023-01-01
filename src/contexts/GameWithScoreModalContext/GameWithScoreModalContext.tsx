import React, { Context, createContext, FC, ReactNode, useContext, useMemo, useState } from "react";
import {
  FilterGamesWithScoreContextInterface
} from "../../interfaces/models/game/FilterGamesWithScoreContextInterface";
import { GameWithScores } from "../../interfaces/models/game/GameWithScores";
import GameModalDetails from "../../components/ForGamers/GameModalDetails";
import { PlatformFilterGame } from "../../interfaces/models/game/FilterGame";
import * as Console from "console";
import { Platform } from "../../interfaces/enums/Platform";

const FilterGamesWithScoreContext = createContext<any>( undefined );

export const useFilterGamesWithScore = () => useContext( FilterGamesWithScoreContext as Context<FilterGamesWithScoreContextInterface> )

interface ProviderProps {
  children: ReactNode;
}

export const FilterGameWithScoreModalContextProvider: FC<ProviderProps> = ( { children } ) => {
  const [ showDetailsModal, setShowDetailsModal ] = useState<boolean>( false );
  const [ filterAndFetchGpus, setFilterAndFetchGpus ] = useState<boolean>( false );
  const [ filterAndFetchCpus, setFilterAndFetchCpus ] = useState<boolean>( false );

  const [ game, setGame ] = useState<GameWithScores>();
  const [ filterGames, setFilterGames ] = useState<PlatformFilterGame[]>( [] );

  const consoles: Console[] = useMemo<Console[]>( () => {
    let consoles: Console[] = []

    const distinctPlatforms = [ ...new Set(
      filterGames.flatMap( ( { platforms } ) => platforms )
        .filter( value => value !== Platform.PC ) )
    ];

    distinctPlatforms.forEach( platform => {
      if ( filterGames.every( game => game.platforms.includes( platform ) ) )
        consoles.push( platform as unknown as Console );
    } )

    return consoles;
  }, [ filterGames ] );

  const contextData = {
    showDetailsModal,
    setShowDetailsModal,
    game,
    setGame,
    filterAndFetchGpus,
    setFilterAndFetchGpus,
    filterAndFetchCpus,
    setFilterAndFetchCpus,
    filterGames,
    setFilterGames,
    consoles
  };

  return (
    <FilterGamesWithScoreContext.Provider value={ contextData }>
      { showDetailsModal && <GameModalDetails/> }
      { children }
    </FilterGamesWithScoreContext.Provider>
  );
}

export default FilterGameWithScoreModalContextProvider;