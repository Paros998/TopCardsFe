import React, { FC } from 'react';
import { Button, Col } from "react-bootstrap";
import ProductPhoto from "../../assets/images/product_avatar.png";
import { BasicProductModel } from "../../interfaces/models/BasicProductModel";
import { useNavigate } from "react-router-dom";

interface EditDeleteCardsProps {
  index: number;
  product: BasicProductModel;
}

const EditDeleteProduct: FC<EditDeleteCardsProps> = ( { index, product } ) => {

  const navigate = useNavigate();

  const onDelete = () => {

  }

  const goToDetails = () => {
    navigate( `/product/${ product.productId }&${ product.productType }` );
  }

  const colClassName = `d-flex justify-content-center align-items-center`

  return (
    <Col xs={ 12 } key={ index }
         className={ `bg-${ index % 2 === 0 ? `light` : `secondary-light` } text-dark rounded-pill my-2 mx-2 h-15 d-flex danger-hover` }>

      <Col
        xs={ 1 }
        className={ `${ colClassName } btn-pointer` }
        onClick={ goToDetails }
      >
        <img
          src={ product.productPhoto ? product.productPhoto : ProductPhoto } alt={ `` }
          className={ `rounded-circle bg-light border-1 border border-dark mh-75px` }
        />
      </Col>

      <Col xs={ 1 } className={ `${ colClassName } fw-bold` }>
        { product.productType }
      </Col>

      <Col
        xs={ 6 }
        className={ `${ colClassName } text-wrap btn-pointer fw-bold` }
        onClick={ goToDetails }
      >
        { product.title }
      </Col>

      <Col
        xs={ 2 }
        className={ `${ colClassName }` }>
        <Button
          className={ `dark-info btn-pointer rounded-pill w-75 ` }
          onClick={ () => navigate( `/product/edit/${ product.productId }&${ product.productType }` ) }
        >
          Edit
        </Button>
      </Col>

      <Col
        xs={ 2 }
        className={ colClassName }>
        <Button
          className={ `dark-danger btn-pointer rounded-pill w-75 ` }
          onClick={ onDelete }
        >
          Delete
        </Button>
      </Col>

    </Col>
  );
};

export default EditDeleteProduct;