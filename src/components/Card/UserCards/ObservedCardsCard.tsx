import React from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { BasicCards } from "../../../constants/CardsModels/BasicCards";
import ObservedCardInfo from "../../GraphicCard/ObservedCardInfo";
import { useFetchData } from "../../../hooks/useFetchData";
import { BasicCardModel } from "../../../interfaces/models/BasicCardModel";
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import UserObservedCards from "../../GraphicCard/UserObservedCards";

const ObservedCardsCard = () => {

  const { currentUser } = useCurrentUser();

  const [ followedCards, fetchCards, isPending ] = useFetchData<BasicCardModel[]>( `users/${ currentUser?.userId }/followed-cards` );

  return (
    <div className={ `container-fluid h-85 p-0 m-0 my-1 thumb-slim thumb-warning overflow-y-scroll my-md-3 my-2 ` }>
      <Row>

        <UserObservedCards followedCards={followedCards || []} isPending={isPending} fetchCards={fetchCards} />

      </Row>
    </div>
  );
};

export default ObservedCardsCard;