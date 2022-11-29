import React, { useMemo, useState } from 'react';
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import UserCard from "../../components/Card/UserCard";
import Footer from "../../components/Footer/Footer";
import BackButtonArrowCircle from "../../components/BackButton/BackButtonArrowCircle";
import { useParams } from "react-router-dom";
import ProductNotFound from "../../components/NotFound/ProductNotFound";
import { Button, Spinner } from "react-bootstrap";
import { ProductType } from "../../interfaces/enums/ProductType";
import CardDetails from "./Card/CardDetails";
import { usePostCqrs } from "../../hooks/usePostCqrs";

const EditProduct = () => {

  const [ editable, setEditable ] = useState<boolean>( true );

  const { productId, productType } = useParams<{ productId: string, productType: ProductType }>();

  const query = useMemo( () => {
    return {
      productType: productType as ProductType,
      productId: productId as string
    }
  }, [ productId, productType ] )

  const [ productExists, , isPending ] = usePostCqrs<boolean>( `products/ProductExistsQuery`, { cqrsBody: query } );

  if ( isPending )
    return <div className={ `d-flex align-items-center justify-content-center h-100 w-100` }>
      <Spinner animation={ "border" } variant={ 'light' }/>
    </div>

  if ( !productExists )
    return (
      <ProductNotFound productId={ productId as string } type={ productId as ProductType }/>
    );

  return (
    <div className={ 'vh-100 vw-100' }>
      <TopNavbar/>

      <MainContainer className={ `bg-secondary-dark ` }>

        <UserCard className={ `vstack` }>

          <div className={ `h-5 hstack` }>

            <BackButtonArrowCircle/>

            <span className={ `w-100 fs-3 fw-light ps-4 align-items-center d-flex mt-1` }>
                Edit Card
              </span>

            <Button
              className={ `w-10 rounded-card-10 mt-3 me-2` }
              variant={ `outline-info` }
              disabled={ editable }
              onClick={ () => setEditable( true ) }
            >
              Toggle Edit
            </Button>

          </div>

          {
            {
              GPU: <CardDetails productId={ productId as string }/>,
              CONSOLE: 'Console ',
              CPU: 'Processor ',
              PC: 'Personal Computer ',
              LAPTOP: 'Laptop '
            }[ productType as ProductType ]
          }

        </UserCard>

        <Footer/>
      </MainContainer>

    </div>
  );
};

export default EditProduct;