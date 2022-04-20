import React, {FC} from 'react';
import {BasicCardModel} from "../../interfaces/models/BasicCardModel";
import {useNavigate} from "react-router-dom";
import ProductPhoto from "../../assets/images/product_avatar.png";
import {Star} from "react-bootstrap-icons";

interface ObservedCardInfoProps {
  className?: string;
  card: BasicCardModel;
}

const ObservedCardInfo: FC<ObservedCardInfoProps> = ({card, className}) => {

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

  const navigate = useNavigate();

  const available = <span className={`text-success`}>
    Available
  </span>

  const unavailable = <span className={`text-primary-light`}>
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

  const cardText = `ms-2 ms-lg-3 text-wrap text-start w-90 h-30 observed-card-text`;

  return (
    <div className={`btn-pointer m-2 rounded-card-10 bg-dark hstack observed-card-info ${className}
          mw-100`}
         style={{minWidth:`70%`}}
         onClick={onClick}
    >
      <img src={cardPhoto ? cardPhoto : ProductPhoto} alt={``}
           style={{width: `7rem`, height: `7rem`}}
           className={`bg-light `}/>

      <div className={`vstack justify-content-between`}>

        <span className={cardText}>
          {title}
        </span>

        <span className={cardText}>
          {availableLocal ? available : unavailable}
          {local}
        </span>

        <span className={cardText}>
          {availableOnline ? available : unavailable}
          {online}
        </span>

      </div>

      <Star className={`position-absolute top-5 right-2 text-warning`}/>

    </div>
  );
};

export default ObservedCardInfo;