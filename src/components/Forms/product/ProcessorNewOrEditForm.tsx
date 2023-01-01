import React, { ChangeEvent, FC, useEffect, useRef } from 'react';
import { Button, Col, Form as FormBoot, Row } from "react-bootstrap";
import { Form, useFormikContext } from "formik";
import SubmitButton from "../../SubmitButton/SubmitButton";
import BasicCardPhoto from "../../../assets/images/product_avatar.png";
import { ProductFormProps } from "../../../interfaces/ProductFormProps";
import { useBackground } from "../../../contexts/BackgroundContext";
import { CpuDetailsModel } from "../../../interfaces/models/product/CpuDetailsModel";
import INTEL from "../../../assets/images/producers/INTEL.jpg";
import AMD from "../../../assets/images/producers/AMD.jpg";

const ProcessorNewOrEditForm: FC<ProductFormProps> = ( {
                                                         isNewProduct,
                                                         editable,
                                                         setEditable,
                                                         inDetails,
                                                         className
                                                       } ) => {

  const { values, setFieldValue, handleChange, errors, touched, resetForm } = useFormikContext<CpuDetailsModel>();

  const { setBackground } = useBackground();

  const handleFileUpload = ( e: ChangeEvent<HTMLElement> ) => {
    const file = ( e.target as HTMLInputElement ).files![ 0 ];

    if ( file !== undefined ) {
      setFieldValue( `productPhoto`, URL.createObjectURL( file ) );
    }
  };

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

  useEffect( () => {

    switch ( values.producer ) {
      case "INTEL" : {
        setBackground( INTEL );
        break;
      }
      case "AMD": {
        setBackground( AMD );
        break;
      }
      default:
        setBackground( undefined );
    }
  }, [ values.producer ] )

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

          <FormBoot.Group as={ Row } className={ `${ rowClass } ` }>

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
                Producer
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Select
                className={ `${ formClassName } py-2` }
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

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Series
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName } py-2` }
                type={ `text` }
                name={ `series` }
                defaultValue={ values.series }
                onChange={ handleChange }
                isInvalid={ touched.series && !!errors.series }
                isValid={ touched.series && !errors.series }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Version Code
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName } py-2` }
                type={ `text` }
                name={ `version` }
                defaultValue={ values.version }
                onChange={ handleChange }
                isInvalid={ touched.version && !!errors.version }
                isValid={ touched.version && !errors.version }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Technology
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName } py-2` }
                type={ `text` }
                name={ `technology` }
                defaultValue={ values.technology }
                onChange={ handleChange }
                isInvalid={ touched.technology && !!errors.technology }
                isValid={ touched.technology && !errors.technology }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Socket Version
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName } py-2` }
                type={ `text` }
                name={ `socket` }
                defaultValue={ values.socket }
                onChange={ handleChange }
                isInvalid={ touched.socket && !!errors.socket }
                isValid={ touched.socket && !errors.socket }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Max TDP in Watts
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName } py-2` }
                type={ `text` }
                name={ `maxTdp` }
                defaultValue={ values.maxTdp }
                onChange={ handleChange }
                isInvalid={ touched.maxTdp && !!errors.maxTdp }
                isValid={ touched.maxTdp && !errors.maxTdp }
                disabled={ !editable }
              />
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
                className={ `${ formClassName } py-2` }
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
                className={ `${ formClassName } py-2` }
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

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Total Spec.
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName } py-2` }
                type={ `text` }
                name={ `totalSpecification` }
                defaultValue={ values.totalSpecification }
                onChange={ handleChange }
                isInvalid={ touched.totalSpecification && !!errors.totalSpecification }
                isValid={ touched.totalSpecification && !errors.totalSpecification }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Core clock (GHz)
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName } py-2` }
                type={ `text` }
                name={ `coreClock` }
                defaultValue={ values.coreClock }
                onChange={ handleChange }
                isInvalid={ touched.coreClock && !!errors.coreClock }
                isValid={ touched.coreClock && !errors.coreClock }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Boost Core clock (GHz)
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName } py-2` }
                type={ `text` }
                name={ `boostCoreClock` }
                defaultValue={ values.boostCoreClock }
                onChange={ handleChange }
                isInvalid={ touched.boostCoreClock && !!errors.boostCoreClock }
                isValid={ touched.boostCoreClock && !errors.boostCoreClock }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Cores count
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName } py-2` }
                type={ `text` }
                name={ `cores` }
                defaultValue={ values.cores }
                onChange={ handleChange }
                isInvalid={ touched.cores && !!errors.cores }
                isValid={ touched.cores && !errors.cores }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Threads count
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName } py-2` }
                type={ `text` }
                name={ `threads` }
                defaultValue={ values.threads }
                onChange={ handleChange }
                isInvalid={ touched.threads && !!errors.threads }
                isValid={ touched.threads && !errors.threads }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Average IPC (Instructions Per Cycle)
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName } py-2` }
                type={ `text` }
                name={ `instructionsPerCycle` }
                defaultValue={ values.instructionsPerCycle }
                onChange={ handleChange }
                isInvalid={ touched.instructionsPerCycle && !!errors.instructionsPerCycle }
                isValid={ touched.instructionsPerCycle && !errors.instructionsPerCycle }
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

export default ProcessorNewOrEditForm;