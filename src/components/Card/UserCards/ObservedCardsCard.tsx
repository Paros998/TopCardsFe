import React from 'react';
import { Row } from "react-bootstrap";
import { useFetchData } from "../../../hooks/useFetchData";
import { BasicProductModel } from "../../../interfaces/models/BasicProductModel";
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import UserObservedCards from "../../GraphicCard/UserObservedCards";

const ObservedCardsCard = () => {

  const { currentUser } = useCurrentUser();

  const [ followedCards, fetchCards, isPending ] = useFetchData<BasicProductModel[]>( `users/${ currentUser?.userId }/followed-products` );

  return (
    <div className={ `bg-secondary-dark container-fluid h-90 p-0 m-0  thumb-slim thumb-warning overflow-y-scroll   ` }>
      <Row>

        <UserObservedCards followedCards={ followedCards || [] } isPending={ isPending } fetchCards={ fetchCards }/>

      </Row>
    </div>
  );
};

export default ObservedCardsCard;