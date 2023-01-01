import React from 'react';
import { Row } from "react-bootstrap";
import { useFetchData } from "../../../hooks/useFetchData";
import { BasicProductModel } from "../../../interfaces/models/BasicProductModel";
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import UserObservedProducts from "../../Products/UserObservedProducts";

const ObservedProductsCard = () => {

  const { currentUser } = useCurrentUser();

  const [ followedCards, fetchCards, isPending ] = useFetchData<BasicProductModel[]>( `users/${ currentUser?.userId }/followed-products` );

  return (
    <div className={ `bg-secondary-dark container-fluid h-90 p-0 m-0  thumb-slim thumb-warning overflow-y-scroll   ` }>
      <Row>

        <UserObservedProducts followedProducts={ followedCards || [] } isPending={ isPending }
                              fetchProducts={ fetchCards }/>

      </Row>
    </div>
  );
};

export default ObservedProductsCard;