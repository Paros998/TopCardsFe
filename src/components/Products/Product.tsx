import React, { FC } from 'react';
import { BasicProductModel, ProductModelWithPerformance } from "../../interfaces/models/BasicProductModel";
import {
  useDatabaseProductsDetailsModal
} from "../../contexts/ModalProductDetailsContext/DatabaseProductDetailsContext";
import { Button, Col } from "react-bootstrap";
import ProductPhoto from "../../assets/images/product_avatar.png";
import { ProductType } from "../../interfaces/enums/ProductType";
import FollowStar from "../FollowedStar/FollowStar";
import { EmojiFrown } from "react-bootstrap-icons";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";

interface ProductProps {
  product: BasicProductModel | ProductModelWithPerformance;
  withPerformance?: boolean;
}

const Product: FC<ProductProps> = ( { product, withPerformance } ) => {
  const { setShowDetailsModal, setProductData, setShowOffersModal } = useDatabaseProductsDetailsModal();
  const { currentUser } = useCurrentUser();

  const {
    productId,
    productType,
    productPhoto,
    title,
    available,
    isFollowed,
    storesNumber,
    storesLowestPrice
  } = product;

  const showDetails = () => {
    setProductData( { productId: productId, productType: productType } );
    setShowDetailsModal( true );
  }

  const showOffers = () => {
    setProductData( { productId: productId, productType: productType } );
    setShowOffersModal( true );
  }

  const Available = <span className={ `text-success fw-bolder hstack gap-2` }>
    Available
    <Button
      className={ `success-dark rounded-pill text-light` }
      onClick={ showOffers }
    >
      Display Offers
    </Button>
  </span>

  const Unavailable = <span className={ `text-primary fw-bolder` }>
    Unavailable
  </span>

  const content = <span>
    { available
      ? ` in ${ storesNumber } ${ storesNumber > 1 ? `stores` : `store` } at lowest ${ storesLowestPrice } ${ currentUser?.currency || "USD" }`
      : ` in stores` }
    { !available && <EmojiFrown className={ `ms-2 fs-5` }/> }
  </span>

  const productName: string =
    {
      GPU: "Graphic Card",
      CONSOLE: "Console",
      CPU: "Processor",
      PC: "Personal Computer",
      LAPTOP: "Laptop",
    }[ productType as ProductType ]

  const displayPerformance = ( product: ProductModelWithPerformance ) => {
    const { avgPerformance, peakPerformance } = product;

    const calculateTheme = ( value: number ) => {
      if ( !isNumeric( value.toString() ) )
        return "secondary-dark";

      if ( value < 50 )
        return "primary";
      if ( value > 50 && value < 90 )
        return "warning";
      if ( value > 90 )
        return "success";

      return "secondary-dark";
    }

    const isNumeric = ( val: string ): boolean => {
      return !isNaN( Number( val ) ) && isFinite( Number( val ) );
    }

    const calculateWidth = ( val: number ): number => {
      return isNumeric( val.toString() ) ? val : 100;
    }

    return <>
      <div className={ `mb-1 mt-2 w-100 vstack gap-2 justify-content-center align-items-center` }>

        <div className={ `w-100  fw-bold text-center` }>
          Product data related to filtered games
        </div>

        <div className={ `d-flex align-items-center w-100 w-100` }>
          <span className={ `w-40 text-start ps-1` }>
            Avg. Performance
          </span>

          <span className={ `w-60 rounded-pill bg-secondary d-flex justify-content-start` }>
            <span
              style={ { width: calculateWidth( avgPerformance ) + "%" } }
              className={ `bg-${ calculateTheme( avgPerformance ) } rounded-pill p-1 d-flex justify-content-center align-items-center text-light` }>
              { isNumeric( avgPerformance.toString() ) ? avgPerformance + "%" : 'Unknown Data' }
            </span>
          </span>
        </div>

        <div className={ `d-flex align-items-center w-100  w-100` }>
          <span className={ `w-40 text-start ps-1` }>
            Peak Performance
          </span>

          <span className={ `w-60 rounded-pill bg-secondary d-flex justify-content-start` }>
            <span
              style={ { width: calculateWidth( peakPerformance ) + "%" } }
              className={ `bg-${ calculateTheme( peakPerformance ) } rounded-pill p-1 d-flex justify-content-center align-items-center text-light` }>
              { isNumeric( peakPerformance.toString() ) ? peakPerformance + "%" : 'Unknown Data' }
            </span>
          </span>

        </div>

      </div>
    </>;
  }

  return (
    <Col xs={ 12 } lg={ 6 } xxl={ 4 }
         className={ `dark-light rounded-card-10 border-5 ${ withPerformance ? 'mh-400px mnh-400px' : 'mh-300px' +
           ' mnh-300px' } p-1 h-100 align-items-center` }
    >
      <div className={ `h-60 d-flex justify-content-between align-items-center ms-1` }>
        <div className={ `vstack gap-1 pt-2` }>
            <span className={ `fs-5 fw-bolder` }>
              { title }
            </span>

          <span className={ `fs-6` }>
              { productName }
            </span>

          <Button
            className={ `light-dark me-3 mt-1 border-2` }
            onClick={ showDetails }
          >
            Check Details
          </Button>
        </div>

        <img src={ productPhoto ? productPhoto : ProductPhoto } alt={ `` }
             style={ { width: "8rem", height: "8rem" } }
             className={ `bg-dark rounded-card-10 border border-1 border-light` }/>
      </div>

      <div className={ `h-40 d-flex justify-content-around align-items-center ms-1` }>
        <div className={ `d-flex flex-column` }>
          { available ? Available : Unavailable }
          { content }
        </div>

        { currentUser &&
            <FollowStar className={ ` btn-pointer` } followed={ isFollowed } productId={ productId } inDatabaseView/> }
      </div>

      { withPerformance && displayPerformance( product as ProductModelWithPerformance ) }
    </Col>
  );
};

export default Product;