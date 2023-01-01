import React from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import ProductsNavbar from "../../components/InnerNavbar/ProductsNavbar";
import { EndUserProductUsage } from "../../interfaces/enums/EndUserProductUsage";
import BasicCard from "../../components/Card/BasicCard";
import { Col } from "react-bootstrap";
import NotFound from "../../components/NotFound/NotFound";
import ForGamers from "../../components/ForGamers/ForGamers";

const SpecificSearchProducts = () => {

  const { usage } = useParams<{ usage: EndUserProductUsage }>();

  if ( !usage || !Object.values( EndUserProductUsage ).includes( usage as EndUserProductUsage ) )
    return <NotFound/>

  const hr = <Col xs={ 12 }>
    <hr className={ 'h-2px my-3' }/>
  </Col>;

  const ProductUsage =
    {
      'crypto-miners': 'Graphic Card ',
      'gamers': <ForGamers/>,
      'common-work-study': 'Processor '
    }[ usage as EndUserProductUsage ];

  return (
    <div className={ 'vh-100 vw-100' }>
      <TopNavbar/>

      <MainContainer className={ `bg-light overflow-y-scroll thumb-slim thumb-dark` }>
        <BasicCard>
          <ProductsNavbar/>

          { hr }

          { ProductUsage }
        </BasicCard>

        <Footer/>
      </MainContainer>
    </div>
  );
};

export default SpecificSearchProducts;