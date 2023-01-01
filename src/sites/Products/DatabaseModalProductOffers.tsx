import React, { ReactNode, useMemo } from 'react';
import ProductNotFound from "../../components/NotFound/ProductNotFound";
import { Modal, Spinner } from "react-bootstrap";
import StoresOffers from "../../components/Stores/StoresOffers";
import { ProductType } from "../../interfaces/enums/ProductType";
import { usePostCqrs } from "../../hooks/usePostCqrs";
import {
  useDatabaseProductsDetailsModal
} from "../../contexts/ModalProductDetailsContext/DatabaseProductDetailsContext";

const DatabaseModalProductOffers = () => {

  const { productData, showOffersModal, setShowOffersModal, setProductData } = useDatabaseProductsDetailsModal();

  const { productId, productType } = productData;

  const query = useMemo( () => {
    return {
      productType: productType as ProductType,
      productId: productId as string
    }
  }, [ productId, productType ] );

  const [ productExists, , isPending ] = usePostCqrs<boolean>( `products/ProductExistsQuery`, { cqrsBody: query } );

  const onHide = () => {
    setShowOffersModal( false );
    setProductData( prevState => prevState );
  }

  const displayName: string = {
    GPU: 'Graphic Card ',
    CONSOLE: 'Console ',
    CPU: 'Processor ',
    PC: 'Personal Computer ',
    LAPTOP: 'Laptop '
  }[ productType as ProductType ]

  const modal = ( children: ReactNode ) => {
    return <Modal
      centered
      onHide={ onHide }
      show={ showOffersModal }
      fullscreen
    >
      <Modal.Header closeButton className={ `bg-dark text-light modal-close-light` }
      >
        <div className={ `d-flex justify-content-center w-100` }>
          <h3>
            { displayName } Product Offers
          </h3>
        </div>
      </Modal.Header>

      <Modal.Body className={ `bg-dark text-light p-0 m-0 overflow-y-scroll thumb-slim thumb-success` }
      >
        { children }
      </Modal.Body>
    </Modal>
  }

  if ( isPending )
    return modal( <div className={ `d-flex align-items-center justify-content-center h-100 w-100` }>
      <Spinner animation={ "border" } variant={ 'light' }/>
    </div> );

  if ( !productExists )
    return modal(
      <ProductNotFound productId={ productId as string } type={ productId as ProductType }/>
    );

  return modal(
    <StoresOffers productId={ productId as string }/>
  );
};

export default DatabaseModalProductOffers;