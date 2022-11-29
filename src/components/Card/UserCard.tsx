import React, {FC} from 'react';
import CardTemplate from "./CardTemplate";

interface UserCardProps {
  className?:string;
}

const UserCard: FC<UserCardProps> = ({children, className}) => {

  return <CardTemplate
    className={`bg-dark w-100 h-95 px-1 pb-0 ${className}`}
  >
    {children}
  </CardTemplate>
};

export default UserCard;