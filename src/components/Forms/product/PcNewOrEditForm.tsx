import React, { ChangeEvent, FC, useRef } from 'react';
import { Button, Col, Form as FormBoot, Row } from "react-bootstrap";
import { FieldArray, Form, useFormikContext } from "formik";
import { PlusCircleFill, XCircleFill } from "react-bootstrap-icons";
import SubmitButton from "../../SubmitButton/SubmitButton";
import BasicCardPhoto from "../../../assets/images/product_avatar.png";
import { ProductFormProps } from "../../../interfaces/ProductFormProps";
import { PcDetailsModel } from "../../../interfaces/models/product/PcDetailsModel";

const PcNewOrEditForm: FC<ProductFormProps> = ( {
                                                  isNewProduct,
                                                  editable,
                                                  setEditable,
                                                  inDetails,
                                                  className
                                                } ) => {

  const { values, setFieldValue, handleChange, errors, touched, resetForm } = useFormikContext<PcDetailsModel>();

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

  return (
    <Form
      className={ `w-100 vstack ${ !inDetails ? `overflow-y-scroll thumb-slim thumb-light py-2` : ` pt-3 ` } px-3 ` }>

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
                Contains GPU
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `gpuCard.title` }
                defaultValue={ values.gpuCard.title }
                onChange={ handleChange }
                isInvalid={ touched.gpuCard?.title && !!errors.gpuCard?.title }
                isValid={ touched.gpuCard?.title && !errors.gpuCard?.title }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Contains CPU
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `cpu.title` }
                defaultValue={ values.cpu.title }
                onChange={ handleChange }
                isInvalid={ touched.cpu?.title && !!errors.cpu?.title }
                isValid={ touched.cpu?.title && !errors.cpu?.title }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Ram Amount (GB's)
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `ramAmount` }
                defaultValue={ values.ramAmount }
                onChange={ handleChange }
                isInvalid={ touched.ramAmount && !!errors.ramAmount }
                isValid={ touched.ramAmount && !errors.ramAmount }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Ram clock (GHz)
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `ramClock` }
                defaultValue={ values.ramClock }
                onChange={ handleChange }
                isInvalid={ touched.ramClock && !!errors.ramClock }
                isValid={ touched.ramClock && !errors.ramClock }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Ram type
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `ramType` }
                defaultValue={ values.ramType }
                onChange={ handleChange }
                isInvalid={ touched.ramType && !!errors.ramType }
                isValid={ touched.ramType && !errors.ramType }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Chipset
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `chipset` }
                defaultValue={ values.chipset }
                onChange={ handleChange }
                isInvalid={ touched.chipset && !!errors.chipset }
                isValid={ touched.chipset && !errors.chipset }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Sound
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `sound` }
                defaultValue={ values.sound }
                onChange={ handleChange }
                isInvalid={ touched.sound && !!errors.sound }
                isValid={ touched.sound && !errors.sound }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Has Disk Drive
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Check
                className={ `${ formClassName }` }
                type={ `switch` }
                name={ `diskDrive` }
                onChange={ handleChange }
                isInvalid={ touched.diskDrive && !!errors.diskDrive }
                isValid={ touched.diskDrive && !errors.diskDrive }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FieldArray name={ `connectivity` }>
            {
              ( fieldArrayProps ) => {

                const { push, remove, form } = fieldArrayProps;
                const { values: PcDetailsModel } = form;
                const { connectivity } = values;

                return <FormBoot.Group className={ `${ rowClass } ${ arrayGroup }` }>

                  {
                    connectivity.map( ( connection, index ) => (
                      <div className={ dynamicRowClass } key={ index }>

                        <Col
                          xs={ labelSize }
                          className={ colClass }>

                          {
                            index === 0 &&

                              <FormBoot.Label className={ labelClass }>
                                  Connectivity
                              </FormBoot.Label>
                          }
                        </Col>


                        <Col
                          xs={ 12 - labelSize }
                          className={ `${ colClass } mb-1` }>

                          <FormBoot.Control
                            className={ `${ formClassName } ${ !editable && `ps-2 pe-0` }` }
                            type={ `text` }
                            name={ `connectivity[${ index }]` }
                            defaultValue={ values.connectivity[ index ] }
                            onChange={ handleChange }
                            isInvalid={ touched.connectivity && !!errors.connectivity }
                            isValid={ touched.connectivity && !errors.connectivity }
                            disabled={ !editable }
                          />

                          <XCircleFill
                            className={ deleteClass }
                            onClick={ () => remove( index ) }
                          />

                        </Col>

                      </div>
                    ) )
                  }

                  <div className={ `row` }>

                    <Col xs={ labelSize }/>

                    <Col
                      xs={ 12 - labelSize }
                      className={ `${ colClass } justify-content-center` }>

                      <PlusCircleFill
                        className={ addClass }
                        onClick={ () => push( `` ) }
                      />

                    </Col>

                  </div>


                </FormBoot.Group>
              }
            }
          </FieldArray>

        </div>

        <div className={ `w-40 vstack justify-content-start align-items-center pt-3 ` }>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                PSU
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `psu` }
                defaultValue={ values.psu }
                onChange={ handleChange }
                isInvalid={ touched.psu && !!errors.psu }
                isValid={ touched.psu && !errors.psu }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>


          <FormBoot.Group as={ Row } className={ `${ rowClass }` }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Psu Power (Wats)
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `number` }
                name={ `cooling` }
                defaultValue={ values.psuPower }
                onChange={ handleChange }
                isInvalid={ touched.psuPower && !!errors.psuPower }
                isValid={ touched.psuPower && !errors.psuPower }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                PSU Efficiency
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `psuEfficiency` }
                defaultValue={ values.psuEfficiency }
                onChange={ handleChange }
                isInvalid={ touched.psuEfficiency && !!errors.psuEfficiency }
                isValid={ touched.psuEfficiency && !errors.psuEfficiency }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Operating System
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `system` }
                defaultValue={ values.system }
                onChange={ handleChange }
                isInvalid={ touched.system && !!errors.system }
                isValid={ touched.system && !errors.system }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Height
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `height` }
                defaultValue={ values.height }
                onChange={ handleChange }
                isInvalid={ touched.height && !!errors.height }
                isValid={ touched.height && !errors.height }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Width
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `width` }
                defaultValue={ values.width }
                onChange={ handleChange }
                isInvalid={ touched.width && !!errors.width }
                isValid={ touched.width && !errors.width }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Depth
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `depth` }
                defaultValue={ values.depth }
                onChange={ handleChange }
                isInvalid={ touched.depth && !!errors.depth }
                isValid={ touched.depth && !errors.depth }
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

export default PcNewOrEditForm;