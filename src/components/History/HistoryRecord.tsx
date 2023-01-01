import React, { FC, useRef } from 'react';
import { HistoryModel } from "../../interfaces/models/HistoryModel";
import { Col, Row } from "react-bootstrap";
import { Trash3Fill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";
import { useFetchData } from "../../hooks/useFetchData";
import { HistoryAction } from "../../interfaces/enums/HistoryAction";
import { BasicProductModel } from "../../interfaces/models/BasicProductModel";

interface HistoryRecordProps {
  record: HistoryModel;
  fetchRecords: () => Promise<void>;
}

export function getTheme( action: HistoryAction ) {
  switch ( action ) {
    case HistoryAction.UNFOLLOW:
      return `warning`;
    case HistoryAction.FOLLOW:
      return `success`;
    case HistoryAction.CHECK_PRODUCT:
      return `light`;
    case HistoryAction.CHECK_OFFER:
      return `purple-light`;
    case HistoryAction.OPINION:
      return `info`;
  }

}

export function getHeader( action: HistoryAction ) {
  switch ( action ) {
    case HistoryAction.UNFOLLOW:
      return `UnFollow `;
    case HistoryAction.FOLLOW:
      return `Follow `;
    case HistoryAction.CHECK_PRODUCT:
      return `Check `;
    case HistoryAction.CHECK_OFFER:
      return `Check `;
    case HistoryAction.OPINION:
      return `Opinion `;
  }
}

const HistoryRecord: FC<HistoryRecordProps> = ( { record, fetchRecords } ) => {

  const { productId, historyId, action, content } = record;
  const navigate = useNavigate();

  const theme = getTheme( action );
  const header = getHeader( action );

  const isOfferRecord = action === HistoryAction.CHECK_OFFER;

  const deleteRecord = async () => {

    try {

      await Axios.delete( `/history/${ historyId }` );

      await fetchRecords();

    } catch ( e: any ) {

      toast.error( e );

    }
  }

  const onClick = () => {
    if ( !product ) {
      toast.info( "Still checking product type" );
      return;
    }

    if ( isOfferRecord )
      aHref.current?.click();
    else
      navigate( `/product/${ productId }&${ product.productType }` );
  }

  const aHref = useRef<HTMLAnchorElement>( null );

  const [ product ] = useFetchData<BasicProductModel>( `/products/${ productId }` );

  const message = isOfferRecord ? content : `ID: ${ productId } -> Product: ${ product ? product.title : `Fetching title...` }`

  const rowClass = `border border-1 border-${ theme } bg-dark rounded-card-10 my-2 w-90`;

  return (
    <Row className={ rowClass }>

      <a className={ `d-none` } href={ content } target={ `_blank` } ref={ aHref }>NothingHere</a>

      <Col xs={ 2 }
           className={ `hstack gap-1 btn-pointer` }
           onClick={ onClick }>

        <span className={ `text-${ theme }` }>
          { header }
        </span>

        <span className={ `d-none d-lg-block text-berry-red` }>
          { ` of ${ isOfferRecord ? ` offer:` : ` product:` }` }
        </span>

      </Col>

      <Col xs={ 8 }
           md={ 9 }
           className={ `${ !isOfferRecord && `text-decoration-underline` } text-truncate text-${ theme } btn-pointer text-center` }
           onClick={ onClick }>
        { message }
      </Col>

      <Col xs={ 2 }
           md={ 1 }
           className={ `text-danger d-flex justify-content-center align-items-center` }>
        <Trash3Fill onClick={ deleteRecord } className={ `btn-pointer` }/>
      </Col>

    </Row>
  );
};

export default HistoryRecord;