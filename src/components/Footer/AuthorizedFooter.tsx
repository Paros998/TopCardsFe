import React from 'react';
import {ArrowRightCircle, EnvelopeFill, Github, Linkedin} from "react-bootstrap-icons";
import {NavLink} from "react-bootstrap";
import Notification from "../Notification/Notification";

const AuthorizedFooter = () => {
  return (
    <footer
      className={`py-2 py-md-0 text-light bg-dark d-flex flex-column flex-md-row align-items-center min-vw-100 position-absolute bottom-0 px-1 font-italic footer`}>

      <span className={`ms-md-4 font-weight-extra-normal `}>
        © 2022 P.Grzywacz Dev.
        <span className={`d-none d-lg-inline-block ms-md-3`}>
          All rights reserved
        </span>
      </span>

      <span className={`ms-md-5 ms-sm-2 ms-1 d-flex align-items-center fw-light contact`}>
        Contact
        <ArrowRightCircle className={`ms-md-2 ms-1 me-md-5`}/>

        <NavLink href={`https://www.linkedin.com/in/patryk-grzywacz-6082b121b/`}
                 target={`_blank`}
                 className={`py-md-2 py-0 d-flex align-items-center ms-md-5 ms-1`}>
          <Linkedin className={`text-light `}/>
        </NavLink>

        <NavLink href={`https://github.com/Paros998`}
                 target={`_blank`}
                 className={`py-md-2 py-0 d-flex align-items-center ms-md-5 ms-1`}>
          <Github className={`text-light `}/>
        </NavLink>

        <NavLink
          href={`https://mail.google.com/mail/u/0/#inbox?compose=CllgCJlHFTSqZZWVkWrRkvsDNnPfzqqmKFKqWKsnJCspLfVgfsPTgkKkHVkHGKMDnClvgBNmNXB`}
          target={`_blank`}
          className={`py-md-2 py-0 d-flex align-items-center ms-md-5 ms-1`}>
          <EnvelopeFill className={`text-light `}/>
        </NavLink>

      </span>

      <Notification/>

    </footer>
  );
};

export default AuthorizedFooter;