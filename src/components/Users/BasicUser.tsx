import React, { FC } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import UserPhoto from "../../assets/images/user_avatar.png";
import { UserModel } from "../../interfaces/models/UserModel";
import { toast } from "react-toastify";
import Axios from "axios";

interface BasicUserProps {
  index: number;
  user: UserModel;
  fetchUsers: () => Promise<void>
}

const BasicUser: FC<BasicUserProps> = ( { user, index, fetchUsers } ) => {

  const onDelete = async () => {
    try {
      await Axios.delete( `users/${ user.userId }` );
      await fetchUsers();
    } catch ( e: any ) {
      toast.error( e );
    }
  }

  const onBlockUnblock = async () => {

    try {
      await Axios.patch( `users/${ user.userId }` );
      await fetchUsers();
    } catch ( e: any ) {
      toast.error( e );
    }

  }

  const colClassName = `d-flex justify-content-center h-100 align-items-center`;

  return (
    <Row
         className={ `bg-${ index % 2 === 0 ? `light` : `secondary-light` } text-dark rounded-pill my-2 h-15` }>

      <Col
        xs={ 1 }
        className={ colClassName }>
        <img
          src={ user.avatarFile ? user.avatarFile : UserPhoto } alt={ `` }
          style={ { width: `auto`, height: `80%` } }
          className={ `rounded-circle bg-light border-1 border border-dark` }
        />
      </Col>

      <Col
        xs={ 4 }
        className={ `${ colClassName } text-wrap` }>
        { user.email }
      </Col>

      <Col
        xs={ 3 }
        className={ `${ colClassName } text-wrap` }>
        { user.username }
      </Col>

      <Col
        xs={ 2 }
        className={ `${ colClassName }` }>
        <Button
          className={ `dark-${ user.isBlocked ? `success` : `warning` } btn-pointer rounded-pill w-75 ` }
          onClick={ onBlockUnblock }
        >
          { user.isBlocked ? `Unblock` : `Block` }
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

    </Row>
  );
};

export default BasicUser;