import React, {FC, ReactNode} from 'react';

interface MainContainerProps{
  children?: ReactNode;
  className?:string;
}

const MainContainer:FC<MainContainerProps> = ({children,
                                                className}) => {
  return (
    <div className={`vw-100 vh-100 bg-secondary text-light main-container ${className}`}>
      {children}
    </div>
  );
};

export default MainContainer;