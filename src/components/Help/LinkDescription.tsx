import React, { FC } from 'react';
import { NavLink } from "react-router-dom";

interface LinkDescriptionProps {
  linkTo: string;
  linkName: string;
  linkDesc: string;
}

const LinkDescription: FC<LinkDescriptionProps> = ( { linkDesc, linkTo, linkName } ) => {

  const linkClass = `text-light ms-5 hstack align-items-center gap-1`;
  const linkHrefClass = `text-light`;

  return (
    <span
      className={ linkClass }
    >

      <NavLink to={ linkTo }
               className={ linkHrefClass }
      >
        { linkName }
      </NavLink>

      { linkDesc }

    </span>
  );
};

export default LinkDescription;