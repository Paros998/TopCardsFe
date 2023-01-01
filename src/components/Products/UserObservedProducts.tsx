import React, { FC } from 'react';
import { BasicProductModel } from "../../interfaces/models/BasicProductModel";
import { Button, Col, Spinner } from "react-bootstrap";
import ObservedProductInfo from "./ObservedProductInfo";
import FollowedCardsNotFound from "../../assets/images/followed-not-found.png";
import { toast } from "react-toastify";
import Axios from "axios";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { ProductType } from "../../interfaces/enums/ProductType";
import { AddHistoryCommand } from "../../interfaces/models/command/AddHistoryCommand";
import { HistoryAction } from "../../interfaces/enums/HistoryAction";

interface UserObservedProductsProps {
  followedProducts: BasicProductModel[] | [];
  isPending: boolean;
  fetchProducts: () => Promise<void>;
}

const UserObservedProducts: FC<UserObservedProductsProps> = ( { fetchProducts, followedProducts, isPending } ) => {

  const { currentUser } = useCurrentUser();

  const handleUnFollow = async ( productId: string ) => {

    const command: AddHistoryCommand = {
      historyData: {
        productId: productId as string,
        action: HistoryAction.UNFOLLOW,
        content: productId
      },
      userId: currentUser?.userId as string
    };

    try {

      await Axios.put( `/users/${ currentUser?.userId }/unfollow-product/${ productId }` );

      toast.info( `Product unfollowed successfully.` )

      await fetchProducts();

    } catch ( e: any ) {
      toast.error( e );
    } finally {
      try {
        await Axios.post( `/history/AddHistoryCommand`, command );
      } catch ( e: any ) {
        toast.error( e );
      }
    }

  }

  if ( isPending )
    return <div className={ `d-flex h-50 w-100 justify-content-center align-items-center mt-5` }>
      <Spinner style={ { width: "3rem", height: "3rem" } } animation={ "border" } variant={ "light" }/>
    </div>;

  if ( followedProducts?.length === 0 )
    return <div className={ `d-flex h-30 w-100 justify-content-center align-items-center mt-5` }>
      <img src={ FollowedCardsNotFound } alt={ '' } className={ `rounded-circle h-50 w-auto ` }/>
    </div>;

  return (
    <>

      { followedProducts.map( ( value, index ) =>
        <Col
          key={ index }
          xs={ 12 }
          lg={ 6 }
          className={ `d-flex align-items-center ` }
        >
          <ObservedProductInfo product={ value }/>

          <Button
            onClick={ () => handleUnFollow( value.productId ) }
            className={ ` h-30 mx-md-3 mx-2 rounded-card-10 dark-warning` }
          >
            UnFollow
            { {
              GPU: ' GPU',
              CONSOLE: ' Console',
              CPU: ' CPU',
              PC: ' PC',
              LAPTOP: ' Laptop'
            }[ value.productType as ProductType ] }
          </Button>

        </Col>
      ) }

    </>
  );
};

export default UserObservedProducts;