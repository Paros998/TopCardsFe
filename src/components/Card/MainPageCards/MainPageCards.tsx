import React, { FC, SetStateAction } from 'react';
import CardTemplate from "../CardTemplate";
import { BasicCardModel } from "../../../interfaces/models/BasicCardModel";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../../interfaces/enums/Roles";
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import Pagination from '@mui/material/Pagination'
import BasicCards from "../../Cards/BasicCards";

interface MainPageCardsProps {
  className?: string;
  cards: BasicCardModel[] | [];
  isPending: boolean;
  page: number;
  totalPages: number;
  setPage: React.Dispatch<SetStateAction<number>>;
}

const MainPageCards: FC<MainPageCardsProps> = ( { className, cards, isPending, page, setPage, totalPages } ) => {

  const { role } = useCurrentUser();
  const navigate = useNavigate();

  const editColClassName = `text-end me-4 ${ role === Roles.RoleAdmin ? `d-block` : `d-none` }`

  return (
    <CardTemplate className={ `bg-secondary-dark fs-6 pt-0 ${ className }` }>
      <Container className={ `p-0 m-0 h-100 align-items-center` } fluid>
        <Row className={ `h-10 align-items-center` }>
          <Col xs={ 6 } className={ `ms-1 ms-md-3 fs-5 font-weight-extra-normal` }>
            All cards
          </Col>

          <Col className={ editColClassName }>
            <Button
              className={ `py-0 px-4` }
              onClick={ () => navigate( `admin/cards` ) }
              variant={ `outline-light` }
            >
              Edit
            </Button>
          </Col>
        </Row>

        <Row className={ `p-0 mx-1 h-80 overflow-y-scroll thumb-light thumb-slim` }>

          <BasicCards cards={ cards } isPending={ isPending }/>

        </Row>

        <Row className={ `h-10 align-items-center` }>
          <Col className={ `d-flex align-items-center justify-content-center` }>

            <Pagination
              count={ totalPages }
              className={ `bg-light rounded-card-10` }
              color={ "primary" }
              page={ page }
              onChange={ ( event, newPage ) => setPage( newPage ) }
            />

          </Col>
        </Row>

      </Container>
    </CardTemplate>
  );
};

export default MainPageCards;