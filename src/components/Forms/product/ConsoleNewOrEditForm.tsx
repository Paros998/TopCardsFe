import React, { ChangeEvent, FC, useEffect, useRef } from 'react';
import { Button, Col, Form as FormBoot, Row } from "react-bootstrap";
import { Form, useFormikContext } from "formik";
import SubmitButton from "../../SubmitButton/SubmitButton";
import BasicCardPhoto from "../../../assets/images/product_avatar.png";
import NINTENDO from "../../../assets/images/producers/NINTENDO.jpg";
import SONY from "../../../assets/images/producers/SONY.jpg";
import XBOX from "../../../assets/images/producers/XBOX.jpeg";
import { ProductFormProps } from "../../../interfaces/ProductFormProps";
import { ConsoleDetailsModel } from "../../../interfaces/models/product/ConsoleDetailsModel";
import { ConsoleProducer } from "../../../interfaces/enums/ConsoleProducer";
import { useBackground } from "../../../contexts/BackgroundContext";

const ConsoleNewOrEditForm: FC<ProductFormProps> = ( {
                                                       isNewProduct,
                                                       editable,
                                                       setEditable,
                                                       inDetails,
                                                       className
                                                     } ) => {

  const { values, setFieldValue, handleChange, errors, touched, resetForm } = useFormikContext<ConsoleDetailsModel>();

  const { setBackground } = useBackground();

  const handleFileUpload = ( e: ChangeEvent<HTMLElement> ) => {
    const file = ( e.target as HTMLInputElement ).files![ 0 ];

    if ( file !== undefined ) {
      setFieldValue( `productPhoto`, URL.createObjectURL( file ) );
    }
  };

  const producer = {
    MICROSOFT: XBOX,
    SONY: SONY,
    NINTENDO: NINTENDO
  }[ values.producer as ConsoleProducer ];

  useEffect( () => {
    setBackground( producer );
  }, [ producer ] )

  const fileRef = useRef<HTMLInputElement>( null );

  const formClassName = `w-100 rounded-pill bg-dark text-light ${ !editable && `border-0` }`;

  const rowClass = `w-100 my-2`;

  const labelClass = `text-secondary-light m-0 `;

  const colClass = `d-flex align-items-center p-0`;

  const deleteClass = `fs-5 ms-1 text-danger btn-pointer ${ !editable && `d-none` }`;

  const addClass = `fs-5 btn-pointer ${ !editable && `d-none` }`;

  const arrayGroup = `rounded-card-10 border border-1 border-light p-1 ${ !editable && `border-0 p-0` }`;

  const dynamicRowClass = `row ${ editable ? `px-3` : `px-0 ps-2` }`;

  const labelSize = 5;

  const productPhoto = values?.productPhoto;

  return (
    <Form
      className={ `w-100 vstack ${ !inDetails ? `overflow-y-scroll thumb-slim thumb-light py-2` : ` pt-3 ` } px-3` }>

      <div className={ `w-100 hstack gap-4 align-items-start ` }>

        <div className={ `w-15 pt-3 d-flex flex-column align-items-center img-profile-input` }>

          <FormBoot.Control
            name={ `cardPhoto` }
            type={ `file` }
            className={ `d-none` }
            onChange={ handleFileUpload }
            ref={ fileRef }
          />

          <div className={ `w-100 d-flex justify-content-center` }>
            <img src={ productPhoto ? productPhoto : BasicCardPhoto }
                 className={ `${ editable && `rounded-circle btn-pointer` } border-2 border-light border profile-avatar` }
                 alt={ `Img` }
                 style={ { width: "10rem", height: "10rem" } }
                 onClick={ () => editable ? fileRef?.current?.click() : null }
            />
          </div>

          <div className={ `w-100 d-flex justify-content-center mb-3 mt-1 fs-4 fw-light ${ !editable && `d-none` }` }>
            <span>
              Product Image
            </span>
          </div>

        </div>

        <div className={ `w-40 vstack justify-content-start align-items-center pt-3` }>

          <FormBoot.Group as={ Row } className={ `${ rowClass } mb-2` }>

            <Col
              xs={ 1 }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Title
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName } py-2` }
                type={ `text` }
                name={ `title` }
                defaultValue={ values.title }
                onChange={ handleChange }
                isInvalid={ touched.title && !!errors.title }
                isValid={ touched.title && !errors.title }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Console type
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>

              <FormBoot.Select
                className={ `${ formClassName } ` }
                name={ `console` }
                onChange={ handleChange }
                isInvalid={ touched.console && !!errors.console }
                isValid={ touched.console && !errors.console }
                disabled={ !editable }
              >
                {
                  isNewProduct
                    ? <option>Choose...</option>
                    : <option className={ `inner-text-info` }
                              value={ values.console }>{ values.console }</option>
                }

              </FormBoot.Select>

            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Producer
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Select
                className={ `${ formClassName }` }
                name={ `producer` }
                onChange={ handleChange }
                isInvalid={ touched.producer && !!errors.producer }
                isValid={ touched.producer && !errors.producer }
                disabled={ !editable }
              >
                {
                  isNewProduct
                    ? <option>Choose...</option>
                    : <option className={ `inner-text-info` }
                              value={ values.producer }>{ values.producer }</option>
                }

              </FormBoot.Select>
            </Col>

          </FormBoot.Group>

        </div>

        <div className={ `w-40 vstack justify-content-start align-items-center pt-3 ` }>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Producent code
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `producentCode` }
                defaultValue={ values.producentCode }
                onChange={ handleChange }
                isInvalid={ touched.producentCode && !!errors.producentCode }
                isValid={ touched.producentCode && !errors.producentCode }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Date of production
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `dateOfProduction` }
                defaultValue={ values.dateOfProduction }
                onChange={ handleChange }
                isInvalid={ touched.dateOfProduction && !!errors.dateOfProduction }
                isValid={ touched.dateOfProduction && !errors.dateOfProduction }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

        </div>

      </div>

      <FormBoot.Group as={ Row } className={ `${ rowClass } my-3` }>

        <Col
          xs={ 6 }
          className={ `${ colClass } justify-content-end pe-3` }>
          <FormBoot.Label className={ `${ labelClass } text-truncate ` }>
            Product detailed description and technology on producer site:
          </FormBoot.Label>
        </Col>

        <Col
          xs={ 6 }
          className={ `${ colClass }` }>

          <FormBoot.Control
            className={ `${ formClassName } ${ !editable && `d-none` } inner-text-info text-truncate` }
            type={ `text` }
            name={ `producentSite` }
            defaultValue={ values.producentSite }
            onChange={ handleChange }
            isInvalid={ touched.producentSite && !!errors.producentSite }
            isValid={ touched.producentSite && !errors.producentSite }
            disabled={ !editable }
          />

          <a
            href={ values.producentSite }
            target={ `_blank` }
            className={ `${ formClassName } ${ editable && `d-none` } inner-text-info text-truncate ps-1 ps-md-3` }
          >
            { values.producentSite }
          </a>

        </Col>

      </FormBoot.Group>

      <div className={ `${ editable ? `d-flex` : `d-none` } justify-content-center mt-4` }>
        <SubmitButton
          className={ `rounded-pill me-5 w-10 dark-success` }
          type={ `submit` }
        >
          Save
        </SubmitButton>

        <Button
          className={ `rounded-pill w-10 dark-danger` }
          type={ `reset` }
          onClick={ () => {
            !isNewProduct && setEditable( !editable );
          } }
        >
          Reset
        </Button>
      </div>

    </Form>
  );
};

export default ConsoleNewOrEditForm;