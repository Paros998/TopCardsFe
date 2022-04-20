import React, {FC} from 'react';
import CardTemplate from "../CardTemplate";
import {BasicCardModel} from "../../../interfaces/models/BasicCardModel";
import BasicCardInfo from "../../GraphicCard/BasicCardInfo";
import {Button, Col, Container, Pagination, Row} from "react-bootstrap";
import {useCurrentUser} from "../../../contexts/UserContext/CurrentUserContext";
import {useNavigate} from "react-router-dom";
import {Roles} from "../../../interfaces/enums/Roles";

interface MainPageCardsProps {
  className?: string;
  cards: BasicCardModel[] | [];
}

const MainPageCards: FC<MainPageCardsProps> = ({className, cards}) => {

  const {role} = useCurrentUser();
  const navigate = useNavigate();

  const editColClassName = `text-end me-4 ${role === Roles.RoleAdmin ? `d-block` : `d-none`}`

  return (
    <CardTemplate className={`bg-secondary-dark fs-6 pt-0 ${className}`}>
      <Container className={`p-0 m-0 h-100 align-items-center`} fluid>
        <Row className={`h-10 align-items-center`}>
          <Col xs={6} className={`ms-1 ms-md-3 fs-5 font-weight-extra-normal`}>
            All cards
          </Col>

          <Col className={editColClassName}>
            <Button
              className={`py-0 px-4`}
              onClick={() => navigate(`/cards`)}
              variant={`outline-light`}
            >
              Edit
            </Button>
          </Col>
        </Row>

        <Row className={`p-0 mx-1 h-80 overflow-y-scroll thumb-light thumb-slim`}>
          {
            cards.map((value, index) =>
              <Col
                key={index}
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={4}
                xxl={3}
                className={`mb-1 mb-md-2 btn-pointer `}
              >
                <BasicCardInfo card={value} className={`text-dark background-light-hover`} followed={index % 3 === 0}/>
              </Col>
            )
          }

        </Row>

        <Row className={`h-10 align-items-center`}>
          <Col className={`align-items-center`}>
            <Pagination className={`my-0 bottom-50 justify-content-center float-none px-0 `} size={`sm`}>
              <Pagination.First className={`d-none d-md-block z-index-1`}/>
              <Pagination.Prev className={`d-none d-md-block z-index-1`}/>
              <Pagination.Item className={`z-index-1`}>{1}</Pagination.Item>
              <Pagination.Ellipsis className={`z-index-1`}/>

              <Pagination.Item className={`z-index-1`}>{10}</Pagination.Item>
              <Pagination.Item className={`z-index-1`}>{11}</Pagination.Item>
              <Pagination.Item className={`z-index-1`} active >{12}</Pagination.Item>
              <Pagination.Item className={`z-index-1`}>{13}</Pagination.Item>
              <Pagination.Item className={`z-index-1`} disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis className={`z-index-1`}/>
              <Pagination.Item className={`z-index-1`}>{20}</Pagination.Item>
              <Pagination.Next  className={`d-none d-md-block z-index-1`}/>
              <Pagination.Last className={`d-none d-md-block z-index-1`}/>
            </Pagination>
          </Col>
        </Row>

      </Container>
    </CardTemplate>
  );
};

export default MainPageCards;