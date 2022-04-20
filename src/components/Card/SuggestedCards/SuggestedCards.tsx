import React, {FC} from 'react';
import CardTemplate from "../CardTemplate";
import {Button, Col, Container, Row} from "react-bootstrap";
import BasicCardInfo from "../../GraphicCard/BasicCardInfo";
import {BasicCardModel} from "../../../interfaces/models/BasicCardModel";
import AdvertImage from "../../advertisment/AdvertImage";
import {useCurrentUser} from "../../../contexts/UserContext/CurrentUserContext";
import {Roles} from "../../../interfaces/enums/Roles";
import {useNavigate} from "react-router-dom";

interface SuggestedCardsProps {
  className?: string;
  cards: BasicCardModel[] | [];
}

const SuggestedCards: FC<SuggestedCardsProps> = ({className, cards}) => {

  const {role} = useCurrentUser();
  const navigate = useNavigate();

  const editColClassName = `text-end me-4 ${role === Roles.RoleAdmin ? `d-block` : `d-none`}`

  return (
    <CardTemplate className={`bg-secondary-dark fs-6 ${className}`}>
      <Container className={`p-0 m-0 h-100 align-items-center`} fluid>

        <Row className={`h-20 align-items-center`}>
          <Col xs={6} className={`ms-1 ms-md-3 fs-5 font-weight-extra-normal `}>
            Suggested Cards
          </Col>

          <Col className={editColClassName}>
            <Button
              className={`py-0 px-3`}
              onClick={() => navigate(`/suggested`)}
              variant={`outline-danger`}
            >
              Change
            </Button>
          </Col>

        </Row>

        <Row className={`p-0 mx-1 h-70 overflow-y-scroll thumb-danger thumb-slim`}>
          {
            cards.map((value, index) =>
              <>
                <Col
                  key={index}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={4}
                  xxl={3}
                  className={`mb-1 btn-pointer h-100`}
                >
                  <BasicCardInfo card={value} className={`bg-danger fs-8 h-100 background-danger-hover`}
                                 unavailableColor={`text-dark`}
                                 cardPhotoSize={`sm`}
                                 followed={index % 4 === 0}
                  />
                </Col>

                {

                  index % 4 === 0 &&

                  <Col
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      xl={4}
                      xxl={3}
                      className={`mb-1 h-100 btn-pointer`}
                  >
                      <a
                          href={`https://pip-frontend-server.herokuapp.com/`}
                          target={`_blank`}>
                          <AdvertImage/>
                      </a>
                  </Col>

                }

              </>
            )
          }
        </Row>

      </Container>
    </CardTemplate>
  );
};

export default SuggestedCards;