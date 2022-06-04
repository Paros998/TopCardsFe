import React, { FC, useMemo } from 'react';
import CardTemplate from "../CardTemplate";
import { Button, Col, Container, Row } from "react-bootstrap";
import BasicCardInfo from "../../GraphicCard/BasicCardInfo";
import { BasicCardModel } from "../../../interfaces/models/BasicCardModel";
import AdvertImage from "../../advertisment/AdvertImage";
import { Roles } from "../../../interfaces/enums/Roles";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import { useFetchData } from "../../../hooks/useFetchData";
import SuggestedCards from "../../Cards/SuggestedCards";

interface SuggestedCardsProps {
  className?: string;
}

const Suggested: FC<SuggestedCardsProps> = ( { className } ) => {

  const { role, currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const editColClassName = `text-end me-4 ${ role === Roles.RoleAdmin ? `d-block` : `d-none` }`;

  const params = useMemo( () => {
    return {
      userId: currentUser?.userId
    };
  }, [ currentUser?.userId ] )

  const [ cards,,isPending ] = useFetchData<BasicCardModel[]>( 'cards/suggested', { params: params } )

  return (
    <CardTemplate className={ `bg-secondary-dark fs-6 ${ className }` }>
      <Container className={ `p-0 m-0 h-100 align-items-center` } fluid>

        <Row className={ `h-20 align-items-center` }>
          <Col xs={ 6 } className={ `ms-1 ms-md-3 fs-5 font-weight-extra-normal ` }>
            Suggested Cards
          </Col>

          <Col className={ editColClassName }>
            <Button
              className={ `py-0 px-3` }
              onClick={ () => navigate( `admin/suggested` ) }
              variant={ `outline-danger` }
            >
              Change
            </Button>
          </Col>

        </Row>

        <Row className={ `p-0 mx-1 h-70 overflow-y-scroll thumb-danger thumb-slim` }>

          <SuggestedCards cards={cards} isPending={isPending} />

        </Row>

      </Container>
    </CardTemplate>
  );
};

export default Suggested;