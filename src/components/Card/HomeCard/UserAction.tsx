import React, { FC, useRef } from 'react';
import { useFetchData } from "../../../hooks/useFetchData";
import { BasicProductModel } from "../../../interfaces/models/BasicProductModel";
import { useNavigate } from "react-router-dom";
import { HistoryModel } from "../../../interfaces/models/HistoryModel";
import { HistoryAction } from "../../../interfaces/enums/HistoryAction";
import { getTheme } from "../../History/HistoryRecord";
import { Button } from "react-bootstrap";
import { ProductType } from "../../../interfaces/enums/ProductType";
import { toast } from "react-toastify";

interface UserActionProps {
  record: HistoryModel;
}

const UserAction: FC<UserActionProps> = ( { record } ) => {

  function getHeader( action: HistoryAction ) {
    switch ( action ) {
      case HistoryAction.UNFOLLOW:
        return `UnFollowed `;
      case HistoryAction.FOLLOW:
        return `Followed `;
      case HistoryAction.CHECK_PRODUCT:
        return `Checked `;
      case HistoryAction.CHECK_OFFER:
        return `Checked Offer Of `;
      case HistoryAction.OPINION:
        return `Added Opinion For `;
    }
  }

  const { productId, action, content } = record;

  const aHref = useRef<HTMLAnchorElement>( null );
  const navigate = useNavigate();
  const isOfferRecord = action === HistoryAction.CHECK_OFFER;
  const theme = getTheme( action );
  const header = getHeader( action );

  const [ product, , isPending ] = useFetchData<BasicProductModel>( `/products/${ productId }` );

  if ( isPending || !product )
    return (
      <span className={ `rounded-card-10 dark-${ theme } text-truncate` }>
        { header }
      </span>
    );

  const { title, productType } = product;

  const type = {
    GPU: 'GPU',
    CONSOLE: 'Console',
    CPU: 'CPU',
    PC: 'PC',
    LAPTOP: 'Laptop'
  }[ productType as ProductType ];

  const onClick = () => {
    if ( !product ) {
      toast.info( "Still checking product type" );
      return;
    }

    if ( isOfferRecord )
      aHref.current?.click();
    else
      navigate( `/product/${ productId }&${ productType }` );
  }

  return (
    <Button
      className={ `rounded-card-10 dark-${ theme } text-truncate` }
      onClick={ onClick }
    >
      { header + type }
      { ' ' + title }
      { isOfferRecord && <a className={ `d-none` } href={ content } target={ `_blank` } ref={ aHref }>NothingHere</a> }
    </Button>
  );
};

export default UserAction;