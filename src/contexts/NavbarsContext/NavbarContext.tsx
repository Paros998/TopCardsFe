import { Context, createContext, FC, ReactNode, useContext, useState } from "react";
import { NavbarContextInterface } from "../../interfaces/models/NavbarContextInterface";

const NavbarContext = createContext<any>( undefined );

export const useNavbar = () => useContext( NavbarContext as Context<NavbarContextInterface> )

interface ProviderProps {
  children: ReactNode;
}

export const NavbarProvider: FC<ProviderProps> = ( { children } ) => {
  const [ navbarVisible, setNavbarVisible ] = useState( true );
  const [ productNavbarVisible, setProductNavbarVisible ] = useState( true );
  const [ productSpecificNavbarVisible, setProductSpecificNavbarVisible ] = useState( true );

  const contextData = {
    navbarVisible,
    setNavbarVisible,
    productNavbarVisible,
    setProductNavbarVisible,
    productSpecificNavbarVisible,
    setProductSpecificNavbarVisible
  };

  return (
    <NavbarContext.Provider value={ contextData }>
      { children }
    </NavbarContext.Provider>
  );

};

export default NavbarProvider;
