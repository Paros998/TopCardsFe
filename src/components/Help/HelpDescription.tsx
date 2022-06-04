import React, { FC } from 'react';

interface HelpDescriptionProps {
  src: string;
  imgClassname?: string;
}

const HelpDescription: FC<HelpDescriptionProps> = ( { imgClassname, src, children } ) => {
  return (
    <div className={ `d-flex justify-content-evenly align-items-center gap-5 bg-dark p-4 rounded-card-10
    border border-2 border-light w-100` }>

      <img
        src={ src }
        alt={ "src" }
        className={ `${ imgClassname } border border-1 border-light ` }
        style={ { width: "48rem", height: "24rem" } }
      />

      <div className={`vstack align-items-start justify-content-center gap-2 fw-light`}>
        {
          children
        }
      </div>

    </div>
  );
};

export default HelpDescription;