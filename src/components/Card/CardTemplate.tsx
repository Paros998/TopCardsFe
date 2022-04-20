import React, {FC} from 'react';

interface CardTemplateProps {
  className?:string;
}

const CardTemplate:FC<CardTemplateProps> = ({className,children}) => {
  return (
    <div className={`${className} rounded-card-10 pt-0`}>
      {children}
    </div>
  );
};

export default CardTemplate;