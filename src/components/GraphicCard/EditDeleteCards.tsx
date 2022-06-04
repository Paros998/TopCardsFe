import React, {FC} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import ProductPhoto from "../../assets/images/product_avatar.png";
import {BasicCardModel} from "../../interfaces/models/BasicCardModel";
import {useNavigate} from "react-router-dom";

interface EditDeleteCardsProps {
  index: number;
  card: BasicCardModel;
}

const EditDeleteCards:FC<EditDeleteCardsProps> = ({index,card}) => {

  const navigate = useNavigate();

  const onDelete = () => {

  }

  const colClassName = `d-flex justify-content-center h-100 align-items-center`

  return (
    <Row key={index} className={`bg-${index % 2 === 0 ? `light` : `secondary-light`} text-dark rounded-pill my-2 h-15 mx-2`}>

      <Col
        xs={2}
        className={`${colClassName} btn-pointer`}
        onClick={() => navigate(`/card/${card.id}`)}
      >
        <img
          src={card.cardPhoto ? card.cardPhoto : ProductPhoto} alt={``}
          style={{width: `auto`, height: `80%`}}
          className={`rounded-circle bg-light border-1 border border-dark`}
        />
      </Col>

      <Col
        xs={6}
        className={`${colClassName} text-wrap btn-pointer`}
        onClick={() => navigate(`/card/${card.id}`)}
      >
        {card.title}
      </Col>

      <Col
        xs={2}
        className={`${colClassName}`}>
        <Button
          className={`dark-info btn-pointer rounded-pill w-75 `}
          onClick={() => navigate(`/card/edit/${card.id}`)}
        >
          Edit
        </Button>
      </Col>

      <Col
        xs={2}
        className={colClassName}>
        <Button
          className={`dark-danger btn-pointer rounded-pill w-75 `}
          onClick={onDelete}
        >
          Delete
        </Button>
      </Col>

    </Row>
  );
};

export default EditDeleteCards;