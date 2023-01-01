import React, { Context, createContext, FC, ReactNode, useContext, useState } from 'react';
import {
  ModalProductDetailsContextInterface,
  ProductData
} from "../../interfaces/models/ModalProductDetailsContextInterface";
import DatabaseModalProductDetails from "../../sites/Products/DatabaseModalProductDetails";
import DatabaseModalProductOffers from "../../sites/Products/DatabaseModalProductOffers";

const DatabaseProductDetailsContext = createContext<any>( undefined );

export const useDatabaseProductsDetailsModal = () => useContext( DatabaseProductDetailsContext as Context<ModalProductDetailsContextInterface> )

interface ProviderProps {
  children: ReactNode;
}

export const DatabaseProductDetailsProvider: FC<ProviderProps> = ( { children } ) => {
  const [ showDetailsModal, setShowDetailsModal ] = useState<boolean>( false );
  const [ showOffersModal, setShowOffersModal ] = useState<boolean>( false );
  const [ productData, setProductData ] = useState<ProductData>();

  const contextData = {
    showDetailsModal,
    setShowDetailsModal,
    showOffersModal,
    setShowOffersModal,
    productData,
    setProductData
  };

  return (
    <DatabaseProductDetailsContext.Provider value={ contextData }>
      { showDetailsModal && <DatabaseModalProductDetails/> }
      { showOffersModal && <DatabaseModalProductOffers/> }
      { children }
    </DatabaseProductDetailsContext.Provider>
  );
};

export default DatabaseProductDetailsContext;