import React, {FC} from 'react';
import {BasicCardModel} from "../../interfaces/models/BasicCardModel";
import ProductPhoto from "../../assets/images/product_avatar.png";

interface AdminSuggestedCardInfoProps {
  card: BasicCardModel;
  variant: `suggested` | `notSuggested`;
}

const AdminSuggestedCardInfo:FC<AdminSuggestedCardInfoProps> = ({card, variant}) => {

  const bgColor = variant === "suggested" ? `primary` : `secondary-light`;
  const textColor = variant === "suggested" ? `light` : `dark`;

  return (
    <div className={`hstack bg-${bgColor} text-${textColor} rounded-pill h-100`}>

      <div className={`d-flex align-items-center justify-content-center bg-light my-2 ms-2 p-1 px-2 h-100 w-40 rounded-pill`}>
        <img
          src={card.cardPhoto ? card.cardPhoto : ProductPhoto} alt={``}
          style={{width: `60%`, height: `auto`}}
          className={`manage-suggested-image`}
        />
      </div>

      <div className={`d-flex align-items-center justify-content-center h-100 w-60`}>
        <span className={`text-wrap h-70 d-flex align-items-center justify-content-center ms-3 me-1 manage-suggested-span`}>
          {card.title}
        </span>
      </div>
    </div>
  );
};

export default AdminSuggestedCardInfo;