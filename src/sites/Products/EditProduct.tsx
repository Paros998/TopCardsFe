import React, { CSSProperties, useMemo, useState } from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import BackButtonArrowCircle from "../../components/BackButton/BackButtonArrowCircle";
import { useNavigate, useParams } from "react-router-dom";
import ProductNotFound from "../../components/NotFound/ProductNotFound";
import { Button } from "react-bootstrap";
import { ProductType } from "../../interfaces/enums/ProductType";
import CardDetails from "./CardDetails";
import { usePostCqrs } from "../../hooks/usePostCqrs";
import Pending from "../../components/Pending/Pending";
import ConsoleDetails from "./ConsoleDetails";
import ProcessorDetails from "./ProcessorDetails";
import PcDetails from "./PcDetails";
import LaptopDetails from "./LaptopDetails";
import { useBackground } from "../../contexts/BackgroundContext";
import CardTemplate from '../../components/Card/CardTemplate';

const EditProduct = () => {
  const navigate = useNavigate();
  const { background } = useBackground();

  const [ editable, setEditable ] = useState<boolean>( false );

  const { productId, productType } = useParams<{ productId: string, productType: ProductType }>();

  const query = useMemo( () => {
    return {
      productType: productType as ProductType,
      productId: productId as string
    }
  }, [ productId, productType ] )

  const [ productExists, , isPending ] = usePostCqrs<boolean>( `products/ProductExistsQuery`, { cqrsBody: query } );

  if ( isPending )
    return <Pending/>;

  if ( !productExists )
    return (
      <ProductNotFound productId={ productId as string } type={ productId as ProductType }/>
    );

  const style: CSSProperties = background ? {
    backgroundImage: `url(${ background })`,
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: "overlay",
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
  } : {};

  return (
    <div className={ 'vh-100 vw-100' }>
      <TopNavbar/>

      <MainContainer style={ style } className={ `bg-secondary-dark  overflow-y-scroll thumb-slim thumb-light ` }>

        <CardTemplate className={ `d-flex flex-column pt-2 pb-4 mnh-95 ` }>

          <div className={ `h-5 hstack` }>

            <BackButtonArrowCircle className={ `ms-1` }/>

            <span className={ `w-80 fs-3 fw-light ps-4 align-items-center d-flex mt-1` }>
                Edit Card
              </span>

            <Button
              className={ `w-10 rounded-card-10 mt-3 me-3 dark-light` }
              onClick={ () => navigate( `/product/${ productId }&${ productType }` ) }
            >
              To Details
            </Button>

            <Button
              className={ `w-10 rounded-card-10 mt-3 me-2 ${ editable ? 'bg-secondary border-secondary' : 'dark-info ' }` }
              disabled={ editable }
              onClick={ () => setEditable( true ) }
            >
              Toggle Edit
            </Button>

          </div>

          {
            {
              GPU: <CardDetails productId={ productId as string } editable={ editable } setEditable={ setEditable }/>,
              CONSOLE: <ConsoleDetails productId={ productId as string } editable={ editable }
                                       setEditable={ setEditable }/>,
              CPU: <ProcessorDetails productId={ productId as string } editable={ editable }
                                     setEditable={ setEditable }/>,
              PC: <PcDetails productId={ productId as string } editable={ editable } setEditable={ setEditable }/>,
              LAPTOP: <LaptopDetails productId={ productId as string } editable={ editable }
                                     setEditable={ setEditable }/>
            }[ productType as ProductType ]
          }

        </CardTemplate>

        <Footer/>
      </MainContainer>

    </div>
  );
};

export default EditProduct;