import React from "react";
import { GameWithScores } from "./GameWithScores";
import { PlatformFilterGame } from "./FilterGame";

export interface FilterGamesWithScoreContextInterface {
  showDetailsModal: boolean;
  setShowDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;

  game: GameWithScores;
  setGame: React.Dispatch<React.SetStateAction<GameWithScores>>;
  // new

  filterGames: PlatformFilterGame[];
  setFilterGames: React.Dispatch<React.SetStateAction<PlatformFilterGame[]>>;

  consoles: Console[];

  filterAndFetchGpus: boolean;
  setFilterAndFetchGpus: React.Dispatch<React.SetStateAction<boolean>>;

  filterAndFetchCpus: boolean;
  setFilterAndFetchCpus: React.Dispatch<React.SetStateAction<boolean>>;
}