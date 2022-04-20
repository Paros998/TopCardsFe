import React, {ChangeEvent, useRef, useState} from 'react';
import {Button, Col, Form as FormBoot, Form, Row} from "react-bootstrap";
import {useFormikContext} from "formik";
import {RegisterFormikValues} from "../../interfaces/formik/RegisterFormikValues";

const ProfileCardForm = () => {

  const [editable, setEditable] = useState<boolean>(false);

  const hStackClass = `hstack w-100 my-1 justify-content-center `;
  const colClass = `text-secondary`;

  const buttonClass = `rounded-pill mx-2 w-15 editable-button`;
  const formClassName = `profile-form-control w-100 rounded-pill bg-dark text-light`;

  const {handleChange, errors, touched, values, resetForm, setFieldValue} = useFormikContext<RegisterFormikValues>();

  const handleFileUpload = (e: ChangeEvent<HTMLElement>) => {
    const file = (e.target as HTMLInputElement).files![0];

    if (file !== undefined) {
      setFieldValue(`avatarFile`, URL.createObjectURL(file));
    }
  };

  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <Form className={`${hStackClass} flex-column h-80 justify-content-around`}>
      <div className={`${hStackClass} top-profile-stack`}>

        <div className={`w-50 d-flex justify-content-end img-profile-input`}>

          <FormBoot.Control
            name={`avatarFile`}
            type={`file`}
            className={`d-none`}
            onChange={handleFileUpload}
            ref={fileRef}
          />

          <img src={values.avatarFile}
               className={`${editable && `rounded-circle btn-pointer`} border-2 border-light border profile-avatar`}
               alt={`Img`}
               style={{width: "10rem", height: "10rem"}}
               onClick={() => editable ? fileRef?.current?.click() : null}
          />

        </div>

        <div className={`d-flex flex-md-column flex-wrap gap-3 ms-5 fs-4 fw-light w-50 profile-inputs`}>

          <Form.Group as={Row} className={`w-100`}>
            <Form.Label className={colClass}>
              Email
            </Form.Label>
            <Col className={`pe-0`}>
              <Form.Control
                className={formClassName}
                type={`text`}
                name={`email`}
                defaultValue={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
                isValid={touched.email && !errors.email}
                disabled={!editable}
              />
            </Col>
            <Col xs={1} md={4}/>
          </Form.Group>

          <Form.Group as={Row} className={`w-100`}>
            <Form.Label className={colClass}>
              Username
            </Form.Label>
            <Col className={`pe-0`}>
              <Form.Control
                className={formClassName}
                type={`text`}
                name={`username`}
                defaultValue={values.username}
                onChange={handleChange}
                isInvalid={touched.username && !!errors.username}
                isValid={touched.username && !errors.username}
                disabled={!editable}
              />
            </Col>
            <Col xs={1} md={4}/>
          </Form.Group>

          <Form.Group as={Row} className={`w-100`}>
            <Form.Label className={colClass}>
              Password
            </Form.Label>
            <Col className={`pe-0`}>
              <Form.Control
                className={formClassName}
                type={`text`}
                name={`password`}
                defaultValue={`**********************`}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
                isValid={touched.password && !errors.password}
                disabled={!editable}
              />
            </Col>
            <Col xs={1} md={4}/>
          </Form.Group>


        </div>

      </div>

      <div className={`${hStackClass} `}>
        <Button
          className={`${buttonClass} ${!editable ? `d-block` : `d-none`}`}
          variant={`outline-info`}
          onClick={() => setEditable(!editable)}
        >
          Toggle Edit
        </Button>

        <Button
          className={`${buttonClass} ${editable ? `d-block` : `d-none`}`}
          variant={`outline-secondary`}
          type={`submit`}
        >
          Save Changes
        </Button>

        <Button
          className={`${buttonClass} ${editable ? `d-block` : `d-none`}`}
          variant={`outline-danger`}
          type={`reset`}
          onClick={() => {
            setEditable(!editable);
            resetForm();
          }}
        >
          Discard Changes
        </Button>

      </div>
    </Form>
  );
};

export default ProfileCardForm;