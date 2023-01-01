import React from 'react';
import SearchProductsByGames from "./SearchProductsByGames";
import FilterGameWithScoreModalContextProvider
  from "../../contexts/GameWithScoreModalContext/GameWithScoreModalContext";

const ForGamers = () => {

  return (
    <>
      <FilterGameWithScoreModalContextProvider>
        <SearchProductsByGames/>
      </FilterGameWithScoreModalContextProvider>

    </>
  );
};

export default ForGamers;