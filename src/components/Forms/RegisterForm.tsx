import React, {ChangeEvent, useRef} from 'react';
import {Form as FormBoot} from "react-bootstrap";
import SubmitButton from "../SubmitButton/SubmitButton";
import {Form, useFormikContext} from "formik";
import {RegisterFormikValues} from "../../interfaces/formik/RegisterFormikValues";
import {Upload} from "react-bootstrap-icons";

const RegisterForm = () => {

  const formGroup = `mx-3 my-1 fw-light w-50 register-control`;
  const formLabel = `position-relative left-10 fs-4`;
  const formControl = `rounded-pill w-80 px-3 position-relative left-10 bg-dark text-light border-1 border-light `;
  const errorSpan = `text-danger position-relative left-10`;

  const {handleChange, errors, touched, values, setFieldValue} = useFormikContext<RegisterFormikValues>();

  const handleFileUpload = (e: ChangeEvent<HTMLElement>) => {
    const file = (e.target as HTMLInputElement).files![0];

    if (file !== undefined) {
      setFieldValue(`avatarFile`, URL.createObjectURL(file));
    }

  };

  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`h-90 w-100 overflow-y-scroll d-flex  thumb-slim thumb-light mb-md-0 mb-3`}>
      <Form
        className={`d-flex w-100 flex-column justify-content-between mb-2 mb-md-0 mt-3 pt-md-0 `}>

        <div className={`hstack justify-content-between flex-wrap flex-md-nowrap`}>

          <FormBoot.Group className={formGroup}>
            <FormBoot.Label className={formLabel}>Email</FormBoot.Label>
            <FormBoot.Control type={`text`}
                              className={formControl}
                              name={`email`}
                              onChange={handleChange}
                              isInvalid={touched.email && !!errors.email}
                              isValid={touched.email && !errors.email}
            />

            <span className={errorSpan}>
              {errors.email}
             </span>

          </FormBoot.Group>

          <FormBoot.Group className={formGroup}>
            <FormBoot.Label className={formLabel}>Username</FormBoot.Label>
            <FormBoot.Control type={`text`}
                              className={formControl}
                              name={`username`}
                              onChange={handleChange}
                              isInvalid={touched.username && !!errors.username}
                              isValid={touched.username && !errors.username}
            />

            <span className={errorSpan}>
              {errors.username}
            </span>

          </FormBoot.Group>

        </div>

        <div className={`hstack justify-content-between flex-wrap flex-md-nowrap`}>

          <FormBoot.Group className={formGroup}>
            <FormBoot.Label className={formLabel}>Password</FormBoot.Label>
            <FormBoot.Control type={`password`}
                              className={formControl}
                              name={`password`}
                              onChange={handleChange}
                              isInvalid={touched.password && !!errors.password}
                              isValid={touched.password && !errors.password}
            />

            <span className={errorSpan}>
              {errors.password}
            </span>

          </FormBoot.Group>

          <div className={`${formGroup}`}>

            <div className={formLabel}>
              Photo
              <Upload className={`ms-3 mb-1` }/>
            </div>

            <FormBoot.Control
              name={`avatarFile`}
              type={`file`}
              className={`d-none`}
              onChange={handleFileUpload}
              ref={fileRef}
            />

            <img src={values.avatarFile}
                 className={`position-relative left-10 bg-dark text-light border border-1 border-light rounded-circle btn-pointer`}
                 alt={``}
                 style={{width: "4rem", height: "4rem"}}
                 onClick={() => fileRef?.current?.click()}

            />
          </div>

        </div>

        <hr className={`my-4 w-90 position-relative left-5 hr-1 `}/>

        <SubmitButton
          variant={`light`}
          className={`w-40 position-relative left-30 rounded-pill mt-3 light-button-hover mb-3`}
        >
          Register
        </SubmitButton>

      </Form>
    </div>
  );
};

export default RegisterForm;