import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { ProductType } from "../../interfaces/enums/ProductType";
import ProductsNavbar from "../../components/InnerNavbar/ProductsNavbar";
import NotFound from "../../components/NotFound/NotFound";
import BasicCard from "../../components/Card/BasicCard";
import { Col, Row } from "react-bootstrap";
import { Controller, CpuFill, Laptop, PcDisplay, PciCard } from "react-bootstrap-icons";
import AllGraphicCards from "../../components/GraphicCard/AllGraphicCards";
import {
  DatabaseProductDetailsProvider
} from "../../contexts/ModalProductDetailsContext/DatabaseProductDetailsContext";
import AllProcessors from "../../components/Cpu/AllProcessors";
import AllConsoles from "../../components/Console/AllConsoles";
import AllLaptops from "../../components/Laptop/AllLaptops";
import AllComputers from "../../components/PC/AllComputers";

const DatabaseOfProducts = () => {

  const { productType } = useParams<{ productType: ProductType }>();

  if ( !productType || !Object.keys( ProductType ).includes( productType ) )
    return <NotFound/>

  const hr = <Col xs={ 12 }>
    <hr className={ 'h-2px my-3' }/>
  </Col>;

  const style = { width: "3rem", height: "auto" };
  const className = `ms-3`;

  const ProductIcon =
    {
      GPU: <PciCard style={ style } className={ className }/>,
      CONSOLE: <Controller style={ style } className={ className }/>,
      CPU: <CpuFill style={ style } className={ className }/>,
      PC: <PcDisplay style={ style } className={ className }/>,
      LAPTOP: <Laptop style={ style } className={ className }/>,
    }[ productType as ProductType ]

  const Products =
    {
      GPU: <AllGraphicCards/>,
      CONSOLE: <AllConsoles/>,
      CPU: <AllProcessors/>,
      PC: <AllComputers/>,
      LAPTOP: <AllLaptops/>,
    }[ productType as ProductType ]

  return (
    <div className={ 'vh-100 vw-100' }>
      <TopNavbar/>

      <MainContainer
        className={ `bg-light overflow-y-scroll thumb-slim thumb-dark border-top border-1 border-light` }>
        <BasicCard>
          <ProductsNavbar/>

          { hr }

          <Row className={ `h-10 align-items-center m-0 py-3 mx-1 mx-md-2 mb-1` }>
            <Col xs={ 12 } className={ `fs-4 text-center my-1` }>
              All
              { ' ' + productType + `'s` }
              { ProductIcon }
            </Col>

          </Row>

          <DatabaseProductDetailsProvider>
            { Products }
          </DatabaseProductDetailsProvider>
        </BasicCard>

        <Footer/>
      </MainContainer>
    </div>
  );
};

export default DatabaseOfProducts;