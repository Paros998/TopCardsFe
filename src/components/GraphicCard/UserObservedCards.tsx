import React, { FC } from 'react';
import { BasicProductModel } from "../../interfaces/models/BasicProductModel";
import { Button, Col, Spinner } from "react-bootstrap";
import ObservedProductInfo from "./ObservedProductInfo";
import FollowedCardsNotFound from "../../assets/images/followed-not-found.png";
import { toast } from "react-toastify";
import Axios from "axios";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";

interface UserObservedCardsProps {
  followedCards: BasicProductModel[] | [];
  isPending: boolean;
  fetchCards: () => Promise<void>;
}


const UserObservedCards: FC<UserObservedCardsProps> = ( { fetchCards, followedCards, isPending } ) => {

  const { currentUser } = useCurrentUser();


  const handleUnFollow = async ( cardId: string ) => {

    try {

      await Axios.put( `/users/${ currentUser?.userId }/unfollow-card/${ cardId }` );

      await fetchCards();

    } catch ( e: any ) {
      toast.error( e );
    }

  }


  if ( isPending )
    return <div className={ `d-flex h-50 w-100 justify-content-center align-items-center mt-5` }>
      <Spinner style={ { width: "3rem", height: "3rem" } } animation={ "border" } variant={ "light" }/>
    </div>;

  if ( followedCards?.length === 0 )
    return <div className={ `d-flex h-30 w-100 justify-content-center align-items-center mt-5` }>
      <img src={ FollowedCardsNotFound } alt={ '' } className={ `rounded-circle h-50 w-auto ` }/>
    </div>;

  return (
    <>

      { followedCards.map( ( value, index ) =>
        <Col
          key={ index }
          xs={ 12 }
          sm={ 12 }
          md={ 12 }
          lg={ 6 }
          xl={ 6 }
          xxl={ 6 }
          className={ `d-flex align-items-center ` }
        >
          <ObservedProductInfo product={ value }/>

          <Button
            onClick={ () => handleUnFollow( value.productId ) }
            className={ ` h-30 mx-md-3 mx-2 rounded-card-10 dark-warning` }
          >
            UnFollow
          </Button>

        </Col>
      ) }

    </>
  );
};

export default UserObservedCards;