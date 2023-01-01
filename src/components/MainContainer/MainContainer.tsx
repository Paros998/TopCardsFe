import React, { FC, HTMLAttributes, ReactNode } from 'react';

interface MainContainerProps extends HTMLAttributes<any> {
  children?: ReactNode;
  className?: string;
}

const MainContainer: FC<MainContainerProps> = ( {
                                                  children,
                                                  className,
                                                  ...props
                                                } ) => {
  return (
    <div style={ props.style } className={ `w-100 h-90 bg-secondary text-light ${ className }` }>
      { children }
    </div>
  );
};

export default MainContainer;