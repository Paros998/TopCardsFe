import React, { FC, useMemo, useState } from 'react';
import { Star, StarFill } from "react-bootstrap-icons";
import { Button, Spinner } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { useFetchData } from "../../hooks/useFetchData";
import { toast } from "react-toastify";
import Axios from "axios";
import { ProductProps } from "../../interfaces/models/Product";
import { Roles } from "../../interfaces/enums/Roles";
import { AddHistoryCommand } from "../../interfaces/models/command/AddHistoryCommand";
import { HistoryAction } from "../../interfaces/enums/HistoryAction";

interface FollowUnFollowProductProps extends ProductProps {
}

const FollowUnFollowProduct: FC<FollowUnFollowProductProps> = ( { productId } ) => {

  const { currentUser, role } = useCurrentUser();

  const [ isSubmitting, setSubmitting ] = useState<boolean>( false );

  const [ following, fetchFollowing, isPending ] = useFetchData<boolean>( `users/${ currentUser?.userId }/follows/${ productId }` );

  const command = useMemo<AddHistoryCommand>( (): AddHistoryCommand => {
    return {
      historyData: {
        productId: productId as string,
        action: following ? HistoryAction.UNFOLLOW : HistoryAction.FOLLOW,
        content: productId
      },
      userId: currentUser?.userId as string
    }
  }, [ productId, currentUser, following ] )

  const handleOnClick = async () => {

    setSubmitting( true );

    const url = following ? `unfollow-product` : `follow-product`;

    try {

      if ( !following )
        await Axios.put( `users/${ currentUser?.userId }/${ url }/${ productId }` );

      if ( following )
        await Axios.delete( `users/${ currentUser?.userId }/${ url }/${ productId }` );

      if ( following )
        toast.dark( `Product: ${ productId } unfollowed successfully` );
      else toast.success( `Product: ${ productId } added to followed products successfully` );

      setSubmitting( false );

      await fetchFollowing();

    } catch ( e: any ) {

      setSubmitting( false );

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
    return <span
      className={ `d-flex justify-content-center align-items-center mt-2 ${ !currentUser && `d-none` }` }>

     <span className={ `d-flex justify-content-center align-items-center` }>

       <Spinner animation={ "grow" } variant={ "info" }/>

       <span className={ `ms-2` }>
         Checking follow status
       </span>

     </span>

  </span>

  return <span className={ `d-flex justify-content-center align-items-center mt-2 ${ !currentUser && `d-none` } ` }>

     <span className={ `d-flex justify-content-center align-items-center` }>
       {
         following ? <StarFill/> : <Star/>
       }
       <span className={ `ms-2` }>
         { !following ? `Follow for notifications and quick view` : `UnFollow to get rid off notifications` }
       </span>

     </span>

    <Button
      className={ `ms-3 rounded-card-10 d-flex align-items-center justify-content-center gap-1 dark-${ !following ? `success` : `warning` } ${ ( role === Roles.RoleClient ) && `me-3` }` }
      onClick={ handleOnClick }
    >
      { !following ? `Follow` : `UnFollow` }
      { isSubmitting && <Spinner animation={ "border" } size={ "sm" } variant={ !following ? `success` : `warning` }/> }
    </Button>

  </span>

};

export default FollowUnFollowProduct;