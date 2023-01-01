import React, { Context, createContext, FC, ReactNode, useContext, useState } from 'react';
import { BackgroundContextInterface } from "../interfaces/models/BackgroundContextInterface";

const BackgroundContext = createContext<any>( undefined );

export const useBackground = () => useContext( BackgroundContext as Context<BackgroundContextInterface> )

interface ProviderProps {
  children: ReactNode;
}

export const BackgroundProvider: FC<ProviderProps> = ( { children } ) => {
  const [ background, setBackground ] = useState<string | undefined>( undefined );

  const contextData = {
    background,
    setBackground
  };

  return (
    <BackgroundContext.Provider value={ contextData }>
      { children }
    </BackgroundContext.Provider>
  );
};

export default BackgroundContext;