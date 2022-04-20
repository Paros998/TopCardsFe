import React, {FC} from 'react';
import {BasicCardModel} from "../../interfaces/models/BasicCardModel";
import ProductPhoto from "../../assets/images/product_avatar.png";
import {useNavigate} from "react-router-dom";
import {useCurrentUser} from "../../contexts/UserContext/CurrentUserContext";
import {Roles} from "../../interfaces/enums/Roles";
import FollowStar from "../FollowedStar/FollowStar";

interface BasicCardInfoProps {
  card: BasicCardModel;
  className?: string;
  unavailableColor?: string;
  cardPhotoSize?: 'sm';
  followed: boolean;
}

const BasicCardInfo: FC<BasicCardInfoProps> = ({
                                                 card,
                                                 className,
                                                 unavailableColor,
                                                 cardPhotoSize,
                                                 followed
                                               }) => {

  const photoSize = cardPhotoSize ? "4rem" : "5rem";

  const navigate = useNavigate();
  const {role} = useCurrentUser();

  const authorized = role === Roles.RoleClient || role === Roles.RoleAdmin;

  const {
    cardPhoto,
    title,
    availableOnline,
    availableLocal,
    localStoresLowestPrice,
    localStoresNumber,
    onlineStoresLowestPrice,
    onlineStoresNumber
  } = card;

  const available = <span className={`text-success`}>
    Available
  </span>

  const unavailable = <span className={`text-primary ${unavailableColor}`}>
    Unavailable
  </span>

  const local = <span>
    {availableLocal
      ? ` locally in ${localStoresNumber} ${localStoresNumber > 1 ? `stores` : `store`} at lowest $${localStoresLowestPrice}`
      : ` in local stores :(`}
  </span>

  const online = <span>
    {availableOnline
      ? ` online in ${onlineStoresNumber} ${onlineStoresNumber > 1 ? `stores` : `store`} at lowest $${onlineStoresLowestPrice}`
      : ` in online stores :(`}
  </span>

  const onClick = () => {
    navigate(`/card/${card.id}`);
  }

  return (
    <div
      className={`rounded-card-10 bg-light d-flex flex-column fs-7 w-100 h-100 ${className}`}
    >
      <span
        className={`h-20 d-flex font-weight-extra-normal px-1 mb-1 mt-2 align-items-center justify-content-between`}>

        <span className={`text-center text-truncate ${authorized ? `w-90` : `w-100`}`} onClick={onClick}>
          {title}
        </span>

        {
          authorized && <FollowStar followed={followed}/>
        }

      </span>

      <div className={`d-flex align-items-center mb-1 px-1 h-80`}
           onClick={onClick}
      >

        <div className={`w-50 d-flex justify-content-center`}>
          <img src={cardPhoto ? cardPhoto : ProductPhoto} alt={``}
               style={{width: photoSize, height: photoSize}}
               className={`bg-dark rounded-circle`}/>
        </div>

        <div className={`w-50 d-flex flex-column justify-content-center me-0 me-md-2 `}>

          <span className={`mb-1`}>
            {availableLocal ? available : unavailable}
            {local}
          </span>

          <span>
          {availableOnline ? available : unavailable}
            {online}
          </span>

        </div>

      </div>
    </div>

  );
};

export default BasicCardInfo;