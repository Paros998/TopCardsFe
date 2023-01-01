import React, { CSSProperties, useMemo } from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import BackButtonArrowCircle from "../../components/BackButton/BackButtonArrowCircle";
import { useNavigate, useParams } from "react-router-dom";
import ProductNotFound from "../../components/NotFound/ProductNotFound";
import { Button } from "react-bootstrap";
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
import Pending from "../../components/Pending/Pending";
import ConsoleDetails from "./ConsoleDetails";
import ProcessorDetails from "./ProcessorDetails";
import PcDetails from "./PcDetails";
import LaptopDetails from "./LaptopDetails";
import { useBackground } from "../../contexts/BackgroundContext";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { background } = useBackground();

  const { role, currentUser, isPending } = useCurrentUser();

  const { productId, productType } = useParams<{ productId: string, productType: ProductType }>() || {};

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

  const [ productExists, , isPendingProduct ] = usePostCqrs<boolean>( `products/ProductExistsQuery`, { cqrsBody: query } );

  if ( isPending || isPendingProduct ) {
    return <Pending/>
  }

  if ( !productExists )
    return (
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
    backgroundBlendMode: "overlay",
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
  } : {};

  return (
    <div className={ 'vh-100 vw-100' }>
      <TopNavbar/>

      <MainContainer style={ style } className={ `bg-secondary-dark overflow-y-scroll thumb-slim thumb-light ` }>

        <CardTemplate className={ `d-flex flex-column pt-2 pb-4 mnh-95 ` }>

          <div className={ `d-flex align-items-center mt-2 position-fixed ms-1 pb-2 z-index-1000` }>
            <BackButtonArrowCircle/>
          </div>

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

        <Footer/>

      </MainContainer>

    </div>
  );
};

export default ProductDetails;