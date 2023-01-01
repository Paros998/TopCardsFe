import React, { CSSProperties, ReactNode, useMemo } from 'react';
import MainContainer from "../../components/MainContainer/MainContainer";
import { useNavigate } from "react-router-dom";
import ProductNotFound from "../../components/NotFound/ProductNotFound";
import { Button, Modal, Spinner } from "react-bootstrap";
import { Roles } from "../../interfaces/enums/Roles";
import FollowUnFollowProduct from "../../components/Buttons/FollowUnFollowProduct";
import HrBrake from "../../components/Hr/HrBrake";
import FeedBackCard from "../../components/FeedBack/FeedBackCard";
import StoresOffers from "../../components/Stores/StoresOffers";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { ProductType } from "../../interfaces/enums/ProductType";
import CardDetails from "./CardDetails";
import CardTemplate from "../../components/Card/CardTemplate";
import { usePostCqrs } from "../../hooks/usePostCqrs";
import { AddHistoryCommand } from "../../interfaces/models/command/AddHistoryCommand";
import { HistoryAction } from "../../interfaces/enums/HistoryAction";
import {
  useDatabaseProductsDetailsModal
} from "../../contexts/ModalProductDetailsContext/DatabaseProductDetailsContext";
import ConsoleDetails from "./ConsoleDetails";
import ProcessorDetails from "./ProcessorDetails";
import PcDetails from "./PcDetails";
import LaptopDetails from "./LaptopDetails";
import { useBackground } from "../../contexts/BackgroundContext";

const DatabaseModalProductDetails = () => {
  const { background } = useBackground();

  const { productData, showDetailsModal, setShowDetailsModal, setProductData } = useDatabaseProductsDetailsModal();

  const { productId, productType } = productData;

  const navigate = useNavigate();

  const { role, currentUser } = useCurrentUser();

  const query = useMemo( () => {
    return {
      productType: productType as ProductType,
      productId: productId as string
    }
  }, [ productId, productType ] );

  const command = useMemo<AddHistoryCommand>( (): AddHistoryCommand => {
    return {
      historyData: {
        productId: productId as string,
        action: HistoryAction.CHECK_PRODUCT,
        content: productId as string
      },
      userId: currentUser?.userId as string
    }
  }, [ productId, currentUser ] )

  usePostCqrs( `/history/AddHistoryCommand`, { cqrsBody: command, notExecute: !currentUser, executeOnce: true } );

  const [ productExists, , isPending ] = usePostCqrs<boolean>( `products/ProductExistsQuery`, { cqrsBody: query } );

  const onHide = () => {
    setShowDetailsModal( false );
    setProductData( prevState => prevState );
  }

  const modal = ( children: ReactNode ) => {
    return <Modal
      centered
      onHide={ onHide }
      show={ showDetailsModal }
      fullscreen={ true }
    >
      <Modal.Header closeButton className={ `bg-dark text-light modal-close-light` }
      >
        <div className={ `d-flex justify-content-center w-100` }>
          <h3>
            Product Details
          </h3>
        </div>
      </Modal.Header>

      <Modal.Body className={ `bg-dark text-light p-0 m-0` }
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

  const displayName: string = {
    GPU: 'Graphic Card ',
    CONSOLE: 'Console ',
    CPU: 'Processor ',
    PC: 'Personal Computer ',
    LAPTOP: 'Laptop '
  }[ productType as ProductType ]

  const displayedContent = {
    GPU: <CardDetails productId={ productId as string }/>,
    CONSOLE: <ConsoleDetails productId={ productId as string }/>,
    CPU: <ProcessorDetails productId={ productId as string }/>,
    PC: <PcDetails productId={ productId as string }/>,
    LAPTOP: <LaptopDetails productId={ productId as string }/>
  }[ productType as ProductType ]

  const style: CSSProperties = background ? {
    backgroundImage: `url(${ background })`,
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: "multiply",
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
  } : {};

  return modal(
    <>
      <MainContainer style={ style } className={ `h-100 bg-secondary-dark overflow-y-scroll thumb-slim thumb-light ` }>

        <CardTemplate className={ `d-flex flex-column pt-2 pb-4 ` }>

          <div className={ `ps-3 d-flex flex-column flex-md-row w-100 justify-content-between` }>
              <span className={ ` fs-3 fw-light ps-4 align-items-center d-flex mt-1` }>
                  { displayName }Details
              </span>

            { role !== undefined && <FollowUnFollowProduct productId={ productId as string }/> }

            <Button
              className={ ` rounded-card-10 mt-2 me-3 me-xl-5 dark-info  ${ role !== Roles.RoleAdmin && `d-none` }` }
              onClick={ () => navigate( `/product/edit/${ productId }&${ productType }` ) }
            >
              To Edit
            </Button>
          </div>

          { displayedContent }

          <HrBrake/>

          <FeedBackCard productId={ productId as string }/>

          <HrBrake/>

          <StoresOffers productId={ productId as string }/>

        </CardTemplate>

      </MainContainer>

    </>
  );
};

export default DatabaseModalProductDetails;