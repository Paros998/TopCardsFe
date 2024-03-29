import React, { FC } from 'react';
import CardTemplate from "../CardTemplate";
import { Col, Container, Row } from "react-bootstrap";
import SuggestedProducts from "../../Cards/SuggestedProducts";
import { ProductType } from "../../../interfaces/enums/ProductType";
import { Controller, CpuFill, Laptop, PcDisplay, PciCard } from "react-bootstrap-icons";
import WelcomeSegment from "./WelcomeSegment";
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import NotificationsReminder from "./NotificationsReminder";
import ProductsNavbar from "../../InnerNavbar/ProductsNavbar";
import LastUserActions from "./LastUserActions";

interface HomeCardProps {
  className?: string;
}

const HomeCard: FC<HomeCardProps> = ( { className } ) => {

  const { currentUser } = useCurrentUser();

  const hr = <Col xs={ 12 }>
    <hr className={ 'h-2px my-3' }/>
  </Col>;

  const hrInfo = <Col xs={ 12 }>
    <hr className={ 'h-2px mx-3 my-3' }/>
  </Col>;

  const suggested = ` p-0 ps-md-4 mx-2 mx-md-4 mb-5 align-items-center mnh-100px `;
  const iconClass = 'd-flex-column gap-1 justify-content-center';
  const iconDesc = 'fw-bolder text-dark d-flex justify-content-center';
  const style = { width: "100%", height: "auto" };

  return (
    <CardTemplate className={ `bg-light text-dark fs-6 w-100 mnh-95 ${ className }` }>
      <Container className={ `p-0 m-0 align-items-center` } fluid>

        <WelcomeSegment/>

        { currentUser && <NotificationsReminder/> }

        { hrInfo }

        { currentUser && <LastUserActions/> }

        { currentUser && hrInfo }

        <ProductsNavbar/>

        { hrInfo }

        <Row className={ `h-10 align-items-center m-0 py-3` }>
          <Col xs={ 12 } md={ 6 } className={ `ms-1 ms-md-2 fs-4  ` }>
            Suggested Products By Type
          </Col>
        </Row>

        <Row className={ suggested }>
          <Col xs={ 2 } sm={ 1 } className={ iconClass }>
            <PciCard style={ style }/>

            <span className={ iconDesc }>
              { ProductType.GPU }
            </span>
          </Col>

          <Col xs={ 10 } sm={ 11 } className={ `px-3` }>
            <SuggestedProducts productType={ ProductType.GPU }/>
          </Col>
          { hr }
        </Row>

        <Row className={ suggested }>
          <Col xs={ 2 } sm={ 1 } className={ iconClass }>
            <Controller style={ style }/>

            <span className={ iconDesc }>
              { ProductType.CONSOLE }
            </span>
          </Col>

          <Col xs={ 10 } sm={ 11 }>
            <SuggestedProducts productType={ ProductType.CONSOLE }/>
          </Col>
          { hr }
        </Row>

        <Row className={ suggested }>
          <Col xs={ 2 } sm={ 1 }>
            <CpuFill style={ style }/>

            <span className={ iconDesc }>
              { ProductType.CPU }
            </span>
          </Col>

          <Col xs={ 10 } sm={ 11 }>
            <SuggestedProducts productType={ ProductType.CPU }/>
          </Col>
          { hr }
        </Row>

        <Row className={ suggested }>
          <Col xs={ 2 } sm={ 1 }>
            <Laptop style={ style }/>

            <span className={ iconDesc }>
              { ProductType.LAPTOP }
            </span>
          </Col>

          <Col xs={ 10 } sm={ 11 }>
            <SuggestedProducts productType={ ProductType.LAPTOP }/>
          </Col>
          { hr }
        </Row>

        <Row className={ suggested }>
          <Col xs={ 2 } sm={ 1 }>
            <PcDisplay style={ style }/>

            <span className={ iconDesc }>
              { ProductType.PC }
            </span>
          </Col>

          <Col xs={ 10 } sm={ 11 }>
            <SuggestedProducts productType={ ProductType.PC }/>
          </Col>
        </Row>

      </Container>
    </CardTemplate>
  );
};

export default HomeCard;