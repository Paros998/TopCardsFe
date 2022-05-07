import React, {FC} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import UserPhoto from "../../assets/images/user_avatar.png";
import {UserModel} from "../../interfaces/models/UserModel";

interface BasicUserProps {
  index: number;
  user: UserModel;
}

const BasicUser:FC<BasicUserProps> = ({user, index}) => {

  const onDelete = () => {

  }

  const onBlockUnblock = () => {

  }

  const colClassName = `d-flex justify-content-center h-100 align-items-center`;

  return (
    <Row key={index} className={`bg-${index % 2 === 0 ? `light` : `secondary-light`} text-dark rounded-pill my-2 h-15`}>

      <Col
        xs={1}
        className={colClassName}>
        <img
          src={user.avatarFile ? user.avatarFile  : UserPhoto} alt={``}
          style={{width: `auto`, height: `80%`}}
          className={`rounded-circle bg-light border-1 border border-dark`}
        />
      </Col>

      <Col
        xs={4}
        className={`${colClassName} text-wrap`}>
        {user.email}
      </Col>

      <Col
        xs={3}
        className={`${colClassName} text-wrap`}>
        {user.username}
      </Col>

      <Col
        xs={2}
        className={`${colClassName}`}>
        <Button
          className={`dark-${user.blocked ? `success` : `warning`} btn-pointer rounded-pill w-75 `}
          onClick={onBlockUnblock}
        >
          {user.blocked ? `Unblock` : `Block`}
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

export default BasicUser;