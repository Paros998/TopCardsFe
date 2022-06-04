import React, { FC, useMemo, useRef } from 'react';
import { HistoryModel } from "../../interfaces/models/HistoryModel";
import { Col, Row } from "react-bootstrap";
import { Trash3Fill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { BasicCards } from "../../constants/CardsModels/BasicCards";
import { toast } from "react-toastify";
import Axios from "axios";
import { useFetchData } from "../../hooks/useFetchData";

interface HistoryRecordProps {
  record: HistoryModel;
  fetchRecords: () => Promise<void>;
}

function getTheme( action: "unfollow" | "follow" | "checkCard" | "checkOffer" | "opinion" ) {
  switch ( action ) {
    case "unfollow":
      return `warning`;
    case "follow":
      return `success`;
    case "checkCard":
      return `secondary`;
    case "checkOffer":
      return `purple-light`;
    case "opinion":
      return `info`;
  }

}

function getHeader( action: "unfollow" | "follow" | "checkCard" | "checkOffer" | "opinion" ) {
  switch ( action ) {
    case "unfollow":
      return `UnFollow `;
    case "follow":
      return `Follow `;
    case "checkCard":
      return `Check `;
    case "checkOffer":
      return `Check `;
    case "opinion":
      return `Opinion `;
  }
}

const HistoryRecord: FC<HistoryRecordProps> = ( { record, fetchRecords } ) => {

  const { cardId, id, action, link } = record;
  const navigate = useNavigate();

  const theme = getTheme( action );
  const header = getHeader( action );

  const isOfferRecord = action === "checkOffer";

  const deleteRecord = async () => {

    try {

      await Axios.delete( `/history/${ id }` );

      await fetchRecords();

    } catch ( e: any ) {

      toast.error( e );

    }
  }

  const onClick = () => {
    if ( isOfferRecord )
      aHref.current?.click();
    else
      navigate( `/card/${ cardId }` );
  }

  const aHref = useRef<HTMLAnchorElement>( null );

  const [ title ] = useFetchData<string>( `/cards/${ cardId }/title` );

  const message = isOfferRecord ? link : `ID: ${ cardId } - Card: ${ title ? title : `Fetching title...` }`

  const rowClass = `border border-1 border-${ theme } rounded-card-10 my-2 w-75`;

  return (
    <Row className={ rowClass }>

      <a className={ `d-none` } href={ link } target={ `_blank` } ref={ aHref }>NothingHere</a>

      <Col xs={ 2 }
           className={ `hstack gap-1 btn-pointer` }
           onClick={ onClick }>

        <span className={ `text-${ theme }` }>
          { header }
        </span>

        <span className={ `d-none d-lg-block` }>
          { ` of ${ isOfferRecord ? ` offer:` : ` card:` }` }
        </span>

      </Col>

      <Col xs={ 8 }
           md={ 9 }
           className={ `${ !isOfferRecord && `text-decoration-underline` } text-truncate text-${ theme } btn-pointer` }
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