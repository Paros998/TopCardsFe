import React, { FC } from 'react';
import { BasicProductModel } from "../../interfaces/models/BasicProductModel";
import ProductPhoto from "../../assets/images/product_avatar.png";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../interfaces/enums/Roles";
import FollowStar from "../FollowedStar/FollowStar";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { EmojiFrown } from "react-bootstrap-icons";

interface BasicProductInfoProps {
  product: BasicProductModel;
  className?: string;
  unavailableColor?: string;
  productPhotoSize?: 'sm';
  followed: boolean;
}

const BasicProductInfo: FC<BasicProductInfoProps> = ( {
                                                        product,
                                                        className,
                                                        unavailableColor,
                                                        productPhotoSize,
                                                        followed
                                                      } ) => {

  const photoSize = productPhotoSize ? "4rem" : "5rem";

  const navigate = useNavigate();
  const { role } = useCurrentUser();

  const authorized = role === Roles.RoleClient || role === Roles.RoleAdmin;

  const {
    productPhoto,
    title,
    available,
    storesLowestPrice,
    storesNumber,

  } = product;

  const Available = <span className={ `text-success` }>
    Available
  </span>

  const Unavailable = <span className={ `text-primary ${ unavailableColor }` }>
    Unavailable
  </span>

  const content = <span>
    { available
      ? ` in ${ storesNumber } ${ storesNumber > 1 ? `stores` : `store` } at lowest ${ storesLowestPrice } PLN`
      : ` in stores` }
    { !available && <EmojiFrown className={ `ms-2 fs-5` }/> }
  </span>

  const onClick = () => {
    navigate( `/product/${ product.productId }&${ product.productType }` );
  }

  return (
    <div
      className={ `rounded-card-10 bg-light d-flex flex-column fs-7 w-100 h-100 ${ className }` }
    >
      <span
        className={ `h-20 d-flex font-weight-extra-normal px-1 mb-1 mt-2 align-items-center justify-content-between` }>

        <span className={ `text-center text-truncate ${ authorized ? `w-90` : `w-100` }` } onClick={ onClick }>
          { title }
        </span>

        {
          authorized && <FollowStar followed={ followed }/>
        }

      </span>

      <div className={ `d-flex align-items-center mb-1 px-1 h-80` }
           onClick={ onClick }
      >

        <div className={ `w-50 d-flex justify-content-center` }>
          <img src={ productPhoto ? productPhoto : ProductPhoto } alt={ `` }
               style={ { width: photoSize, height: photoSize } }
               className={ `bg-dark rounded-circle border border-1 border-light` }/>
        </div>

        <div className={ `w-50 d-flex flex-column justify-content-center me-0 me-md-2 ` }>

          <span className={ `mb-1` }>
            { available ? Available : Unavailable }
            { content }
          </span>

        </div>

      </div>
    </div>

  );
};

export default BasicProductInfo;