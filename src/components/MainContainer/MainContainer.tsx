import React, { FC, ReactNode } from 'react';

interface MainContainerProps {
  children?: ReactNode;
  className?: string;
}

const MainContainer: FC<MainContainerProps> = ( {
                                                  children,
                                                  className
                                                } ) => {
  return (
    <div className={ `w-100 h-90 bg-secondary text-light ${ className }` }>
      { children }
    </div>
  );
};

export default MainContainer;