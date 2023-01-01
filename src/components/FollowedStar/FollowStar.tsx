import React, { FC, useEffect, useMemo, useState } from 'react';
import { Star, StarFill } from "react-bootstrap-icons";
import Axios from "axios";
import { toast } from "react-toastify";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { Spinner } from "react-bootstrap";
import { AddHistoryCommand } from "../../interfaces/models/command/AddHistoryCommand";
import { HistoryAction } from "../../interfaces/enums/HistoryAction";

interface FollowStarProps {
  followed: boolean;
  productId: string;
  inDatabaseView?: boolean;
  className?: string;
}

const FollowStar: FC<FollowStarProps> = ( { followed, productId, inDatabaseView, className } ) => {
  const [ isSubmitting, setSubmitting ] = useState<boolean>( false );
  const [ following, setFollowing ] = useState( false );

  useEffect( () => {
    setFollowing( followed );
  }, [ followed ] );

  const { currentUser } = useCurrentUser()

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

      setFollowing( !following );

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

  const normal = `fs-6 star-hover`;
  const dbView = `ms-1 fs-4 star-hover-dark`;
  const flex = `d-flex justify-content-center align-items-center`;

  if ( isSubmitting )
    return <Spinner animation={ "border" } size={ "sm" } variant={ !following ? `success` : `warning` }/>;

  if ( inDatabaseView )
    return (
      following
        ? <div className={ flex }>
          Following
          <StarFill className={ `${ dbView } text-success ${ className }` } onClick={ handleOnClick }/>
        </div>

        : <div className={ flex }>
          Not Followed
          <StarFill className={ `${ dbView } text-primary ${ className }` } onClick={ handleOnClick }/>
        </div>
    );

  return (
    following
      ? <StarFill className={ `${ normal } ${ className }` } onClick={ handleOnClick }/>
      : <Star className={ `${ normal } ${ className }` } onClick={ handleOnClick }/>
  );
};

export default FollowStar;