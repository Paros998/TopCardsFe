import React from 'react';
import {Star, StarFill} from "react-bootstrap-icons";
import {Button} from "react-bootstrap";
import {useCurrentUser} from "../../contexts/UserContext/CurrentUserContext";

const FollowUnFollowCard = () => {

  const following = Math.floor(Math.random() * 5) % 2 === 0;

  const {currentUser} = useCurrentUser();

  return <span className={`w-50 d-flex justify-content-center align-items-center mt-2 ${!currentUser && `d-none`}`}>

     <span className={`d-flex justify-content-center align-items-center`}>
       {
         following ? <StarFill/> : <Star/>
       }
       <span className={`ms-2`}>
         {!following ? `Follow for notifications and quick view` : `UnFollow to get rid off notifications`}
       </span>

     </span>

    <Button
      className={`ms-3 rounded-card-10`}
      variant={`outline-${!following ? `success` : `warning`}`}
    >
      {!following ? `Follow` : `UnFollow`}
    </Button>

  </span>

};

export default FollowUnFollowCard;