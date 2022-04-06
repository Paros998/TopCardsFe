import React from 'react';
import {EmojiExpressionlessFill} from "react-bootstrap-icons";

const NotFound = () => {
  return (
    <main
      className={`d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark`}>

      <EmojiExpressionlessFill
        className={`text-light spin-around`}
        fontSize={'30rem'}
      />

      <h1
        className={`gradient-color mt-lg-4 mt-md-2 mt-sm-1`}
      >
        Not Found 404
      </h1>

    </main>

  );
};

export default NotFound;