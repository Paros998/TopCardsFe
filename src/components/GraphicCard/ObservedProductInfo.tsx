import React, { FC } from 'react';
import { BasicProductModel } from "../../interfaces/models/BasicProductModel";
import { useNavigate } from "react-router-dom";
import ProductPhoto from "../../assets/images/product_avatar.png";
import { EmojiFrown, Star } from "react-bootstrap-icons";

interface ObservedProductInfoProps {
  className?: string;
  product: BasicProductModel;
}

const ObservedProductInfo: FC<ObservedProductInfoProps> = ( { product, className } ) => {

  const {
    productPhoto,
    title,
    available,
    storesLowestPrice,
    storesNumber,
    productType,
    productId
  } = product;

  const navigate = useNavigate();

  const Available = <span className={ `text-success` }>
    Available
  </span>

  const Unavailable = <span className={ `text-danger` }>
    Unavailable
  </span>

  const content = <span>
    { available
      ? ` in ${ storesNumber } ${ storesNumber > 1 ? `stores` : `store` } at lowest ${ storesLowestPrice } PLN`
      : ` in stores` }

    { !available && <EmojiFrown className={ `ms-2 fs-5` }/> }
  </span>

  const onClick = () => {
    navigate( `/product/${ productId }&${ productType }` );
  }

  const cardText = `ms-2 ms-lg-3 text-wrap text-start w-90 h-30 observed-card-text`;

  return (
    <div className={ `btn-pointer m-2 rounded-card-10 bg-dark hstack observed-card-info ${ className }
          mw-100` }
         style={ { minWidth: `70%` } }
         onClick={ onClick }
    >
      <img src={ productPhoto ? productPhoto : ProductPhoto } alt={ `` }
           style={ { width: `7rem`, height: `7rem` } }
           className={ `bg-light ` }/>

      <div className={ `vstack justify-content-between` }>

        <span className={ cardText }>
          { title }
        </span>

        <span className={ cardText }>
          { available ? Available : Unavailable }
          { content }
        </span>

      </div>

      <Star className={ `position-absolute top-5 right-2 text-warning` }/>

    </div>
  );
};

export default ObservedProductInfo;