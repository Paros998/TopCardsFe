import React, { FC, ReactNode } from 'react';
import CardTemplate from "./CardTemplate";
import { Container } from "react-bootstrap";

interface BasicCardProps {
  children?: ReactNode
}

const BasicCard: FC<BasicCardProps> = ( { children } ) => {

  return (
    <CardTemplate className={ `bg-light text-dark fs-6 w-100 mnh-95 ` }>
      <Container className={ `p-0 m-0 align-items-center ` } fluid>

        { children }

      </Container>
    </CardTemplate>
  );
};

export default BasicCard;