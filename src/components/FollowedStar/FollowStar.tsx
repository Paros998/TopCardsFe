import React, {FC} from 'react';
import {Star, StarFill} from "react-bootstrap-icons";

interface FollowStarProps {
  followed:boolean;
}

const FollowStar:FC<FollowStarProps> = ({followed}) => {

  const onClick = (action: `follow` | `unfollow`) => {
    console.log(action);
  }

  const className = `fs-6 star-hover`

  return (
    followed
      ? <StarFill className={className} onClick={() => onClick("unfollow")}/>
      : <Star className={className} onClick={() => onClick("follow")}/>
  );
};

export default FollowStar;