import React, { ChangeEvent, Dispatch, FC, useRef } from 'react';
import { Button, Col, Form as FormBoot, Row } from "react-bootstrap";
import { FieldArray, Form, useFormikContext } from "formik";
import { CardDetailsModel } from "../../interfaces/models/CardDetailsModel";
import { PlusCircleFill, XCircleFill } from "react-bootstrap-icons";
import { FilterOption } from "../../interfaces/FilterOption";
import { useFetchData } from "../../hooks/useFetchData";
import SubmitButton from "../SubmitButton/SubmitButton";
import BasicCardPhoto from "../../assets/images/product_avatar.png";

interface CardNewOrEditFormProps {
  inDetails?: boolean;
  isNewCard: boolean;
  editable: boolean;
  setEditable: Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  isCreated?: boolean;
}

const CardNewOrEditForm: FC<CardNewOrEditFormProps> = ( {
                                                          isNewCard,
                                                          editable,
                                                          setEditable,
                                                          inDetails,
                                                          className
                                                        } ) => {

  const { values, setFieldValue, handleChange, errors, touched, resetForm } = useFormikContext<CardDetailsModel>();

  const handleFileUpload = ( e: ChangeEvent<HTMLElement> ) => {
    const file = ( e.target as HTMLInputElement ).files![ 0 ];

    if ( file !== undefined ) {
      setFieldValue( `cardPhoto`, URL.createObjectURL( file ) );
    }
  };

  const fileRef = useRef<HTMLInputElement>( null );

  const formClassName = `w-100 rounded-pill bg-dark text-light ${ !editable && `border-0` }`;

  const rowClass = `w-100 my-1`;

  const labelClass = `text-secondary-light m-0 `;

  const colClass = `d-flex align-items-center p-0`;

  const deleteClass = `fs-5 ms-1 text-danger btn-pointer ${ !editable && `d-none` }`;

  const addClass = `fs-5 btn-pointer ${ !editable && `d-none` }`;

  const arrayGroup = `rounded-card-10 border border-1 border-secondary-dark p-1 ${ !editable && `border-0 p-0` }`;

  const dynamicRowClass = `row ${ editable ? `px-3` : `px-0 ps-2` }`;

  const labelSize = 5;

  const [ manufacturers ] = useFetchData<FilterOption[]>( 'filters/manufacturer' );
  const [ connectors ] = useFetchData<FilterOption[]>( 'filters/connector' );
  const [ technologies ] = useFetchData<FilterOption[]>( 'filters/technology' );
  const [ memoryAmounts ] = useFetchData<FilterOption[]>( 'filters/memory-amount' );
  const [ memoryTypes ] = useFetchData<FilterOption[]>( 'filters/memory-type' );
  const [ outputTypes ] = useFetchData<FilterOption[]>( 'filters/outputs' );
  const [ memoryBuses ] = useFetchData<FilterOption[]>( 'filters/memory-bus' );

  const [ cardPhotoSrc ] = useFetchData<string>( `/files/${ values.cardPhoto }` );

  return (
    <Form
      className={ `w-100 vstack ${ !inDetails ? `overflow-y-scroll thumb-slim thumb-light py-2` : ` pt-3 mt-5` } px-3 my-2 mt-3 ` }>

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
            <img src={ cardPhotoSrc ? cardPhotoSrc : BasicCardPhoto }
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
                Type of connector
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>


              <FormBoot.Select
                className={ `${ formClassName } ` }
                name={ `typeOfConnector` }
                onChange={ handleChange }
                isInvalid={ touched.typeOfConnector && !!errors.typeOfConnector }
                isValid={ touched.typeOfConnector && !errors.typeOfConnector }
                disabled={ !editable }
              >
                {
                  isNewCard
                    ? <option>Choose...</option>
                    : <option className={ `inner-text-info` }
                              value={ values.typeOfConnector }>{ values.typeOfConnector }</option>
                }

                {
                  connectors?.map( ( value, index ) =>
                    <option key={ index } value={ value.value }>
                      { value.label }
                    </option> )
                }

              </FormBoot.Select>


            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Type of memory
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Select
                className={ `${ formClassName }` }
                name={ `typeOfMemory` }
                onChange={ handleChange }
                isInvalid={ touched.typeOfMemory && !!errors.typeOfMemory }
                isValid={ touched.typeOfMemory && !errors.typeOfMemory }
                disabled={ !editable }
              >
                {
                  isNewCard
                    ? <option>Choose...</option>
                    : <option className={ `inner-text-info` }
                              value={ values.typeOfMemory }>{ values.typeOfMemory }</option>
                }

                {
                  memoryTypes?.map( ( value, index ) =>
                    <option key={ index } value={ value.value }>
                      { value.label }
                    </option> )
                }

              </FormBoot.Select>
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Memory Amount
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Select
                className={ `${ formClassName }` }
                name={ `memoryAmount` }
                onChange={ handleChange }
                isInvalid={ touched.memoryAmount && !!errors.memoryAmount }
                isValid={ touched.memoryAmount && !errors.memoryAmount }
                disabled={ !editable }
              >

                {
                  isNewCard
                    ? <option>Choose...</option>
                    : <option className={ `inner-text-info` }
                              value={ values.memoryAmount }>{ values.memoryAmount }</option>
                }

                {
                  memoryAmounts?.map( ( value, index ) =>
                    <option key={ index } value={ value.value }>
                      { value.label }
                    </option> )
                }

              </FormBoot.Select>
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Memory Bus
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Select
                className={ `${ formClassName }` }
                name={ `memoryBus` }
                onChange={ handleChange }
                isInvalid={ touched.memoryBus && !!errors.memoryBus }
                isValid={ touched.memoryBus && !errors.memoryBus }
                disabled={ !editable }
              >

                {
                  isNewCard
                    ? <option>Choose...</option>
                    : <option className={ `inner-text-info` } value={ values.memoryBus }>{ values.memoryBus }</option>
                }

                {
                  memoryBuses?.map( ( value, index ) =>
                    <option key={ index } value={ value.value }>
                      { value.label }
                    </option> )
                }

              </FormBoot.Select>
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Memory clock speed
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `number` }
                name={ `clockMemory` }
                defaultValue={ values.clockMemory }
                onChange={ handleChange }
                isInvalid={ touched.clockMemory && !!errors.clockMemory }
                isValid={ touched.clockMemory && !errors.clockMemory }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Core clock
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
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
                Cuda cores
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `number` }
                name={ `cuda` }
                defaultValue={ values.cuda }
                onChange={ handleChange }
                isInvalid={ touched.cuda && !!errors.cuda }
                isValid={ touched.cuda && !errors.cuda }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ `${ rowClass }` }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Manufacturer
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Select
                className={ `${ formClassName }` }
                name={ `manufacturer` }
                onChange={ handleChange }
                isInvalid={ touched.manufacturer && !!errors.manufacturer }
                isValid={ touched.manufacturer && !errors.manufacturer }
                disabled={ !editable }
              >
                {
                  isNewCard
                    ? <option>Choose...</option>
                    : <option className={ `inner-text-info` }
                              value={ values.manufacturer }>{ values.manufacturer }</option>
                }

                {
                  manufacturers?.map( ( value, index ) =>
                    <option key={ index } value={ value.value }>
                      { value.label }
                    </option> )
                }

              </FormBoot.Select>
            </Col>

          </FormBoot.Group>

          <FieldArray name={ `typeOfOutputs` }>
            {
              ( fieldArrayProps ) => {

                const { push, remove, form } = fieldArrayProps;
                const { values: CardDetailsModel } = form;
                const { typeOfOutputs } = values;

                return <FormBoot.Group className={ `${ rowClass } ${ arrayGroup }` }>

                  {
                    typeOfOutputs.map( ( library, index ) => (
                      <div className={ dynamicRowClass } key={ index }>

                        <Col
                          xs={ labelSize }
                          className={ colClass }>

                          {
                            index === 0 &&

                            <FormBoot.Label className={ labelClass }>
                                Type of outputs
                            </FormBoot.Label>
                          }
                        </Col>


                        <Col
                          xs={ 12 - labelSize }
                          className={ `${ colClass } mb-1` }>

                          {/*TODO make control writeable and choosable*/ }

                          <FormBoot.Control
                            className={ `${ formClassName }  ${ !editable && `ps-2` }` }
                            type={ `text` }

                            name={ `typeOfOutputs[${ index }]` }
                            defaultValue={ values.typeOfOutputs[ index ] }
                            onChange={ handleChange }
                            isInvalid={ touched.typeOfOutputs && !!errors.typeOfOutputs }
                            isValid={ touched.typeOfOutputs && !errors.typeOfOutputs }
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

          <FormBoot.Group as={ Row } className={ `${ rowClass }` }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Technology
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Select
                className={ `${ formClassName }` }
                name={ `technology` }
                onChange={ handleChange }
                isInvalid={ touched.technology && !!errors.technology }
                isValid={ touched.technology && !errors.technology }
                disabled={ !editable }
              >
                {
                  isNewCard
                    ? <option>Choose...</option>
                    : <option className={ `inner-text-info` } value={ values.technology }>{ values.technology }</option>
                }

                {
                  technologies?.map( ( value, index ) =>
                    <option key={ index } value={ value.value }>
                      { value.label }
                    </option> )
                }

              </FormBoot.Select>
            </Col>

          </FormBoot.Group>


          <FormBoot.Group as={ Row } className={ `${ rowClass }` }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Cooling type
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `cooling` }
                defaultValue={ values.cooling }
                onChange={ handleChange }
                isInvalid={ touched.cooling && !!errors.cooling }
                isValid={ touched.cooling && !errors.cooling }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Power Connector
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `powerConnector` }
                defaultValue={ values.powerConnector }
                onChange={ handleChange }
                isInvalid={ touched.powerConnector && !!errors.powerConnector }
                isValid={ touched.powerConnector && !errors.powerConnector }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Recommended PSU power
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `number` }
                name={ `recommendedPower` }
                defaultValue={ values.recommendedPower }
                onChange={ handleChange }
                isInvalid={ touched.recommendedPower && !!errors.recommendedPower }
                isValid={ touched.recommendedPower && !errors.recommendedPower }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Power consumption
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `number` }
                name={ `powerConsumption` }
                defaultValue={ values.powerConsumption }
                onChange={ handleChange }
                isInvalid={ touched.powerConsumption && !!errors.powerConsumption }
                isValid={ touched.powerConsumption && !errors.powerConsumption }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

          <FormBoot.Group as={ Row } className={ rowClass }>

            <Col
              xs={ labelSize }
              className={ colClass }>
              <FormBoot.Label className={ labelClass }>
                Length | Width | Height
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Control
                className={ `${ formClassName }` }
                type={ `text` }
                name={ `size` }
                defaultValue={ values.size }
                onChange={ handleChange }
                isInvalid={ touched.size && !!errors.size }
                isValid={ touched.size && !errors.size }
                disabled={ !editable }
              />
            </Col>

          </FormBoot.Group>

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
                Ray Tracing support
              </FormBoot.Label>
            </Col>

            <Col className={ colClass }>
              <FormBoot.Select
                className={ `${ formClassName }` }
                name={ `rtxSupport` }
                onChange={ handleChange }
                isInvalid={ touched.rtxSupport && !!errors.rtxSupport }
                isValid={ touched.rtxSupport && !errors.rtxSupport }
                disabled={ !editable }
              >
                {
                  isNewCard
                    ? <option>Choose...</option>
                    : <option className={ `inner-text-info` } value={ values.rtxSupport }>{ values.rtxSupport }</option>
                }

                <option value={ "true" }>
                  Yes
                </option>

                <option value={ "no" }>
                  No
                </option>


              </FormBoot.Select>
            </Col>

          </FormBoot.Group>

          <FieldArray name={ `supportedLibraries` }>
            {
              ( fieldArrayProps ) => {

                const { push, remove, form } = fieldArrayProps;
                const { values: CardDetailsModel } = form;
                const { supportedLibraries } = values;

                return <FormBoot.Group className={ `${ rowClass } ${ arrayGroup }` }>

                  {
                    supportedLibraries.map( ( library, index ) => (
                      <div className={ dynamicRowClass } key={ index }>

                        <Col
                          xs={ labelSize }
                          className={ colClass }>

                          {
                            index === 0 &&

                            <FormBoot.Label className={ labelClass }>
                                Supported Libraries
                            </FormBoot.Label>
                          }
                        </Col>


                        <Col
                          xs={ 12 - labelSize }
                          className={ `${ colClass } mb-1` }>

                          <FormBoot.Control
                            className={ `${ formClassName } ${ !editable && `ps-2` }` }
                            type={ `text` }
                            name={ `supportedLibraries[${ index }]` }
                            defaultValue={ values.supportedLibraries[ index ] }
                            onChange={ handleChange }
                            isInvalid={ touched.supportedLibraries && !!errors.supportedLibraries }
                            isValid={ touched.supportedLibraries && !errors.supportedLibraries }
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
            className={ `${ formClassName } ${ editable && `d-none` } inner-text-info text-truncate` }
          >
            { values.producentSite }
          </a>

        </Col>

      </FormBoot.Group>

      <div className={ `${ editable ? `d-flex` : `d-none` } justify-content-center ` }>
        <SubmitButton
          className={ `rounded-pill me-5 w-10` }
          variant={ `outline-success` }
          type={ `submit` }
        >
          Save
        </SubmitButton>

        <Button
          className={ `rounded-pill w-10` }
          variant={ `outline-secondary` }
          type={ `reset` }
          onClick={ () => {
            !isNewCard && setEditable( !editable );
          } }
        >
          Reset
        </Button>
      </div>

    </Form>
  );
};

export default CardNewOrEditForm;