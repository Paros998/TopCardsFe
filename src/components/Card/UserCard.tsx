import React, {FC} from 'react';
import CardTemplate from "./CardTemplate";

interface UserCardProps {

}

const UserCard: FC<UserCardProps> = ({children}) => {
  return <CardTemplate
    className={`bg-dark w-100 h-100 rounded-card-10 px-2`}
  >
    {children}
  </CardTemplate>
};

export default UserCard;