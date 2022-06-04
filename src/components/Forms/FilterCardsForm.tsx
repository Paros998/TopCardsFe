import React, { useEffect, useRef } from 'react';
import { Form, useFormikContext } from "formik";
import { Button, ButtonGroup, Form as FormBoot } from "react-bootstrap";
import { FilterCardsFormikValues } from "../../interfaces/formik/FilterCardsFormikValues";
import { Globe, Shop } from "react-bootstrap-icons";
import { useFetchData } from "../../hooks/useFetchData";
import { FilterOption } from "../../interfaces/FilterOption";

const FilterCardsForm = () => {

  const [ manufacturers ] = useFetchData<FilterOption[]>( 'filters/manufacturer' );
  const [ technologies ] = useFetchData<FilterOption[]>( 'filters/technology' );
  const [ memoryAmounts ] = useFetchData<FilterOption[]>( 'filters/memory-amount' );
  const [ memoryTypes ] = useFetchData<FilterOption[]>( 'filters/memory-type' );
  const [ outputTypes ] = useFetchData<FilterOption[]>( 'filters/outputs' );
  const [ memoryBuses ] = useFetchData<FilterOption[]>( 'filters/memory-bus' );

  const formGroup = `mx-1 my-1 fw-light fs-6`;
  const formLabel = `position-relative left-10 fs-5 w-100 my-0`;
  const select = `position-relative left-15 btn-pointer select-all`;
  const checkbox = `position-relative left-20 check-pointer`;
  const insideSpan = `d-flex align-items-center justify-content-center gap-2`;

  const manufacturer = useRef<HTMLInputElement[]>( [] );
  const technology = useRef<HTMLInputElement[]>( [] );
  const memory = useRef<HTMLInputElement[]>( [] );
  const memoryType = useRef<HTMLInputElement[]>( [] );
  const outputsType = useRef<HTMLInputElement[]>( [] );
  const memoryBus = useRef<HTMLInputElement[]>( [] );
  const availableLocal = useRef<HTMLInputElement>();
  const unavailableLocal = useRef<HTMLInputElement>();
  const availableOnline = useRef<HTMLInputElement>();
  const unavailableOnline = useRef<HTMLInputElement>();

  const setRefs = ( form: string[], filter: FilterOption[], ref: React.MutableRefObject<HTMLInputElement[]> ) => {
    form.map( ( value ) => {
      let index = filter?.findIndex( value1 => value1.label === value );
      if ( ref.current[ index ] )
        ref.current[ index ].checked = true;
    } )
  }

  const { values } = useFormikContext<FilterCardsFormikValues>();


  useEffect( () => {

    if ( availableLocal.current )
      availableLocal.current.checked = values.availableLocal as boolean;

    if ( availableOnline.current )
      availableOnline.current.checked = values.availableOnline as boolean

    if ( unavailableLocal.current )
      unavailableLocal.current.checked = values.unavailableLocal as boolean;

    if ( unavailableOnline.current )
      unavailableOnline.current.checked = values.unavailableOnline as boolean

    setRefs( values.manufacturer as string[], manufacturers, manufacturer );

    setRefs( values.technology as string[], technologies, technology );

    setRefs( values.memory as string[], memoryAmounts, memory );

    setRefs( values.memoryType as string[], memoryTypes, memoryType );

    setRefs( values.outputsType as string[], outputTypes, outputsType );

    setRefs( values.memoryBus as string[], memoryTypes, memoryBus );

  }, [ values, manufacturers, technologies, memoryAmounts, memoryTypes, outputTypes, memoryBuses ] )

  const clear = ( value: HTMLInputElement ) => {
    value.checked = true;
    value.click();
  }

  const clearFormValues = () => {
    manufacturer.current.map( clear );
    technology.current.map( clear );
    memory.current.map( clear );
    memoryType.current.map( clear );
    outputsType.current.map( clear );
    memoryBus.current.map( clear );
    availableLocal.current && clear( availableLocal.current );
    availableOnline.current && clear( availableOnline.current );
    unavailableLocal.current && clear( unavailableLocal.current );
    unavailableOnline.current && clear( unavailableOnline.current );
  }

  const onChange = ( fieldName: `manufacturer` | `technology` | `memory` | `memoryType` | `outputsType` | `memoryBus`,
                     checkbox: HTMLInputElement,
                     label: string ) => {

    const array: string[] = values?.[ fieldName ] as string[];

    if ( checkbox.checked ) {
      array.push( label );
      values[ fieldName ] = array;
    } else
      values[ fieldName ] = array.filter( value => value !== label );
  }

  return (
    <>
      <div className={ `h-100 w-100 ` }>
        <Form className={ `h-100 w-100 d-flex w-80 flex-column ` }>

          <div className={ `h-100 w-100 thumb-light thumb-slim overflow-y-scroll` }>

            <FormBoot.Group className={ formGroup }>

              <FormBoot.Label className={ formLabel }>Availability</FormBoot.Label>

              <div
                className={ select }
                onClick={ () => {
                  availableLocal?.current?.click();
                  unavailableLocal?.current?.click();
                  availableOnline?.current?.click();
                  unavailableOnline?.current?.click();
                } }
              >
                Select All
              </div>

              <FormBoot.Check type={ `checkbox` }
                              label={ <span className={ insideSpan }>Available <Shop
                                className={ `text-light mb-1` }/></span> }
                              ref={ ( el: HTMLInputElement ) => availableLocal.current = el }
                              onChange={ () => values.availableLocal = availableLocal.current?.checked as boolean }
                              className={ checkbox }
              />

              <FormBoot.Check type={ `checkbox` }
                              label={ <span className={ insideSpan }>Available <Globe className={ `text-light mb-1` }/></span> }
                              ref={ ( el: HTMLInputElement ) => availableOnline.current = el }
                              onChange={ () => values.availableOnline = availableOnline.current?.checked as boolean }
                              className={ checkbox }
              />

              <FormBoot.Check type={ `checkbox` }
                              label={ <span className={ insideSpan }>Unavailable <Shop className={ `text-light mb-1` }/></span> }
                              ref={ ( el: HTMLInputElement ) => unavailableLocal.current = el }
                              onChange={ () => values.unavailableLocal = unavailableLocal.current?.checked as boolean }
                              className={ checkbox }
              />

              <FormBoot.Check type={ `checkbox` }
                              label={ <span className={ insideSpan }>Unavailable <Globe
                                className={ `text-light mb-1` }/></span> }
                              ref={ ( el: HTMLInputElement ) => unavailableOnline.current = el }
                              onChange={ () => values.unavailableOnline = unavailableOnline.current?.checked as boolean }
                              className={ checkbox }
              />

            </FormBoot.Group>


            <FormBoot.Group className={ formGroup }>

              <FormBoot.Label className={ formLabel }>Manufacturer</FormBoot.Label>

              <div
                className={ select }
                onClick={ () => {
                  manufacturer?.current?.map( value => value.click() )
                } }
              >
                Select All
              </div>

              {

                manufacturers?.map( ( value, index ) =>

                  <FormBoot.Check key={ index }
                                  type={ `checkbox` }
                                  label={ value.label }
                                  ref={ ( el: HTMLInputElement ) => manufacturer.current[ index ] = el }
                                  className={ checkbox }
                                  onChange={ () => onChange( "manufacturer", manufacturer.current[ index ], value.value ) }
                  /> )
              }


            </FormBoot.Group>

            <FormBoot.Group className={ formGroup }>

              <FormBoot.Label className={ formLabel }>Technology</FormBoot.Label>

              <div
                className={ select }
                onClick={ () => {
                  technology?.current?.map( value => value.click() )
                } }
              >
                Select All
              </div>

              {
                technologies?.map( ( value, index ) =>

                  <FormBoot.Check key={ index }
                                  type={ `checkbox` }
                                  label={ value.label }
                                  ref={ ( el: HTMLInputElement ) => technology.current[ index ] = el }
                                  onChange={ () => onChange( "technology", technology.current[ index ], value.value ) }
                                  className={ checkbox }
                  /> )
              }

            </FormBoot.Group>

            <FormBoot.Group className={ formGroup }>

              <FormBoot.Label className={ formLabel }>VRAM Memory</FormBoot.Label>

              <div
                className={ select }
                onClick={ () => {
                  memory?.current?.map( value => value.click() )
                } }
              >
                Select All
              </div>

              {

                memoryAmounts?.map( ( value, index ) =>

                  <FormBoot.Check key={ index }
                                  type={ `checkbox` }
                                  label={ value.label }
                                  ref={ ( el: HTMLInputElement ) => memory.current[ index ] = el }
                                  onChange={ () => onChange( "memory", memory.current[ index ], value.value ) }
                                  className={ checkbox }
                  /> )

              }

            </FormBoot.Group>

            <FormBoot.Group className={ formGroup }>

              <FormBoot.Label className={ formLabel }>Memory Type</FormBoot.Label>

              <div
                className={ select }
                onClick={ () => {
                  memoryType?.current?.map( value => value.click() )
                } }
              >
                Select All
              </div>

              {

                memoryTypes?.map( ( value, index ) =>

                  <FormBoot.Check key={ index }
                                  type={ `checkbox` }
                                  label={ value.label }
                                  ref={ ( el: HTMLInputElement ) => memoryType.current[ index ] = el }
                                  onChange={ () => onChange( "memoryType", memoryType.current[ index ], value.value ) }
                                  className={ checkbox }
                  />
                )

              }

            </FormBoot.Group>

            <FormBoot.Group className={ formGroup }>

              <FormBoot.Label className={ formLabel }>Memory Bus</FormBoot.Label>

              <div
                className={ select }
                onClick={ () => {
                  memoryBus?.current?.map( value => value.click() )
                } }
              >
                Select All
              </div>

              {

                memoryBuses?.map( ( value, index ) =>

                  <FormBoot.Check key={ index }
                                  type={ `checkbox` }
                                  label={ value.label }
                                  ref={ ( el: HTMLInputElement ) => memoryBus.current[ index ] = el }
                                  onChange={ () => onChange( "memoryBus", memoryBus.current[ index ], value.value ) }
                                  className={ checkbox }
                  />
                )

              }

            </FormBoot.Group>

            <FormBoot.Group className={ formGroup }>

              <FormBoot.Label className={ formLabel }>Output Type</FormBoot.Label>

              <div
                className={ select }
                onClick={ () => {
                  outputsType?.current?.map( value => value.click() )
                } }
              >
                Select All
              </div>

              {

                outputTypes?.map( ( value, index ) =>

                  <FormBoot.Check key={ index }
                                  type={ `checkbox` }
                                  label={ value.label }
                                  ref={ ( el: HTMLInputElement ) => outputsType.current[ index ] = el }
                                  onChange={ () => onChange( "outputsType", outputsType.current[ index ], value.value ) }
                                  className={ checkbox }
                  />
                )

              }

            </FormBoot.Group>


          </div>

          <hr className={ `w-75 my-3 position-relative left-12` }/>

          <ButtonGroup className={ `w-80 position-relative left-10 mb-2 ` }>

            <Button
              type={ "reset" }
              className={ `w-50 me-2` }
              variant={ `outline-primary-light` }
              onClick={ clearFormValues }
            >
              Clear
            </Button>

            <Button
              type={ "submit" }
              className={ `w-50` }
              variant={ `outline-light` }
            >
              Search
            </Button>

          </ButtonGroup>

        </Form>

      </div>
    </>
  );
};

export default FilterCardsForm;