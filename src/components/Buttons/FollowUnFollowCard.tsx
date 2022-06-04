import React, { FC, useState } from 'react';
import { Star, StarFill } from "react-bootstrap-icons";
import { Button, Spinner } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { useFetchData } from "../../hooks/useFetchData";
import { toast } from "react-toastify";
import Axios from "axios";
import { Roles } from "../../interfaces/enums/Roles";

interface FollowUnFollowCardProps {
  cardId: string;
}

const FollowUnFollowCard: FC<FollowUnFollowCardProps> = ( { cardId } ) => {

  const { currentUser } = useCurrentUser();

  const [ isSubmitting, setSubmitting ] = useState<boolean>( false );

  const [ following, fetchFollowing, isPending ] = useFetchData<boolean>( `users/${ currentUser?.userId }/follows/${ cardId }` );

  const handleOnClick = async () => {

    setSubmitting( true );

    const url = following ? `unfollow-card` : `follow-card`;

    try {

      await Axios.put( `users/${ currentUser?.userId }/${ url }/${ cardId }` );

      if ( following )
        toast.warning( `Card: ${ cardId } unfollowed successfully` );
      else toast.success( `Card: ${ cardId } added to followed cards successfully` );

      setSubmitting( false );

      await fetchFollowing();

    } catch ( e: any ) {

      setSubmitting( false );

      toast.error( e );

    }


  }


  if ( isPending )
    return <span
      className={ `w-50 d-flex justify-content-center align-items-center mt-2 ${ !currentUser && `d-none` }` }>

     <span className={ `d-flex justify-content-center align-items-center` }>

       <Spinner animation={ "grow" } variant={ "info" }/>

       <span className={ `ms-2` }>
         Checking follow status
       </span>

     </span>

  </span>

  return <span className={ `w-50 d-flex justify-content-center align-items-center mt-2 ${ !currentUser && `d-none` }` }>

     <span className={ `d-flex justify-content-center align-items-center` }>
       {
         following ? <StarFill/> : <Star/>
       }
       <span className={ `ms-2` }>
         { !following ? `Follow for notifications and quick view` : `UnFollow to get rid off notifications` }
       </span>

     </span>

    <Button
      className={ `ms-3 rounded-card-10 d-flex align-items-center justify-content-center gap-1` }
      variant={ `outline-${ !following ? `success` : `warning` }` }
      onClick={ handleOnClick }
    >
      { !following ? `Follow` : `UnFollow` }
      { isSubmitting && <Spinner animation={ "border" } size={"sm"} variant={ !following ? `success` : `warning` }/> }
    </Button>

  </span>

};

export default FollowUnFollowCard;