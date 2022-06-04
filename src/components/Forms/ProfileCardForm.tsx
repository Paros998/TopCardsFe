import React, { useState } from 'react';
import { Button, Col, Form as FormBoot, Row } from "react-bootstrap";
import { Form, useFormikContext } from "formik";
import { ProfileCardFormikValues } from "../../interfaces/formik/ProfileCardFormikValues";
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import EditablePicture from "../Inputs/EditablePicture/EditablePictures";
import { useFetchData } from "../../hooks/useFetchData";

const ProfileCardForm = () => {

  const [ editable, setEditable ] = useState<boolean>( false );

  const hStackClass = `hstack w-100 my-1 justify-content-center `;
  const colClass = `text-secondary`;

  const buttonClass = `rounded-pill mx-2 w-15 editable-button`;
  const formClassName = `profile-form-control w-100 rounded-pill bg-dark text-light`;

  const {
    handleChange,
    errors,
    touched,
    values,
    initialValues
  } = useFormikContext<ProfileCardFormikValues>();

  const { currentUser } = useCurrentUser();

  const [ userPhoto, fetchPicture ] = useFetchData<string>( `/users/${ currentUser?.userId }/avatar` );

  const urlForAvatar = `/users/${ currentUser?.userId }/avatar`;

  const reset = () => {
    values.username = initialValues.username;
    values.email = initialValues.email;
  }

  return (
    <Form className={ `${ hStackClass } flex-column h-80 justify-content-around mt-3 mt-sm-0 profile-form` }>
      <div className={ `${ hStackClass } top-profile-stack` }>

        <div className={ `w-50 d-flex justify-content-end img-profile-input` }>

          {
            editable

              ? <EditablePicture
                src={ userPhoto }
                photoWrapperClass={ `d-flex justify-content-end` }
                containerClass={ `w-30 d-flex justify-content-end` }
                photoClass=' border-2 border-light border '
                reloadData={ fetchPicture }
                urlToPost={ urlForAvatar }
                urlToUpdate={ urlForAvatar }
                urlToDelete={ urlForAvatar }
              />

              : <img src={ userPhoto }
                     className={ ` border-2 border-light border profile-avatar` }
                     alt={ `Img` }
                     style={ { width: "10rem", height: "10rem" } }
              />
          }
        </div>

        <div className={ `d-flex flex-md-column flex-wrap gap-3 ms-5 fs-4 fw-light w-50 profile-inputs` }>
          {/*//TODO fix reset*/}
          <FormBoot.Group as={ Row } className={ `w-100` }>
            <FormBoot.Label className={ colClass }>
              Email
            </FormBoot.Label>
            <Col className={ `pe-0` }>
              <FormBoot.Control
                className={ formClassName }
                type={ `text` }
                name={ `email` }
                defaultValue={ values.email }
                onChange={ handleChange }
                isInvalid={ touched.email && !!errors.email }
                isValid={ touched.email && !errors.email }
                disabled={ !editable }
              />
            </Col>
            <Col xs={ 1 } md={ 4 }/>
          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ `w-100` }>
            <FormBoot.Label className={ colClass }>
              Username
            </FormBoot.Label>
            <Col className={ `pe-0` }>
              <FormBoot.Control
                className={ formClassName }
                type={ `text` }
                name={ `username` }
                defaultValue={ values.username }
                onChange={ handleChange }
                isInvalid={ touched.username && !!errors.username }
                isValid={ touched.username && !errors.username }
                disabled={ !editable }
              />
            </Col>
            <Col xs={ 1 } md={ 4 }/>
          </FormBoot.Group>

        </div>

      </div>

      <div className={ `${ hStackClass } ` }>
        <Button
          className={ `${ buttonClass } ${ !editable ? `d-block` : `d-none` }` }
          variant={ `outline-info` }
          onClick={ () => setEditable( !editable ) }
        >
          Toggle Edit
        </Button>

        <Button
          className={ `${ buttonClass } ${ editable ? `d-block` : `d-none` }` }
          variant={ `outline-secondary` }
          type={ `submit` }
        >
          Save Changes
        </Button>

        <Button
          className={ `${ buttonClass } ${ editable ? `d-block` : `d-none` }` }
          variant={ `outline-danger` }
          type={ `reset` }
          onClick={ () => {
            setEditable( !editable );
          } }
        >
          Discard Changes
        </Button>

      </div>
    </Form>
  );
};

export default ProfileCardForm;