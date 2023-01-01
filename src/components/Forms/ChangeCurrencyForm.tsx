import React, { FC, SetStateAction } from 'react';
import { Button, Col, Container, Form as FormBoot, Modal, Row } from "react-bootstrap";
import { Form, useFormikContext } from "formik";
import SubmitButton from "../SubmitButton/SubmitButton";
import { ChangeCurrencyFormikValues } from "../../interfaces/formik/ChangeCurrencyFormikValues";

interface ChangeCurrencyFormProps {
  setShowChangeCurrency: React.Dispatch<SetStateAction<boolean>>;
  currencies: string[] | [];
}

const ChangeCurrencyForm: FC<ChangeCurrencyFormProps> = ( { setShowChangeCurrency, currencies } ) => {

  const {
    handleChange,
    errors,
    touched,
    values
  } = useFormikContext<ChangeCurrencyFormikValues>();

  const colClass = `text-secondary`;
  const formClassName = `profile-form-control w-100 rounded-pill bg-dark text-light`;

  return (
    <Form>
      <Modal.Body className={ `d-flex justify-content-center` }>

        <FormBoot.Group as={ Row } className={ `w-100` }>
          <FormBoot.Label className={ colClass }>
            Current Currency
          </FormBoot.Label>

          <Col className={ `pe-0` }>

            <FormBoot.Select
              className={ `${ formClassName } ` }
              name={ `oldCurrency` }
              onChange={ handleChange }
              isInvalid={ touched.oldCurrency && !!errors.oldCurrency }
              isValid={ touched.oldCurrency && !errors.oldCurrency }
              disabled={ true }
            >
              <option className={ `inner-text-info` }
                      value={ values.oldCurrency }>{ values.oldCurrency }</option>

            </FormBoot.Select>
          </Col>
          <Col xs={ 1 } md={ 4 }/>
        </FormBoot.Group>

        <FormBoot.Group as={ Row } className={ `w-100` }>
          <FormBoot.Label className={ colClass }>
            New Currency
          </FormBoot.Label>

          <Col className={ `pe-0` }>

            <FormBoot.Select
              className={ `${ formClassName } ` }
              name={ `newCurrency` }
              onChange={ handleChange }
              isInvalid={ touched.newCurrency && !!errors.newCurrency }
              isValid={ touched.newCurrency && !errors.newCurrency }
              disabled={ false }
            >
              <option className={ `inner-text-info` }
                      value={ values.newCurrency }>{ values.newCurrency }</option>
              {
                currencies.map( ( value, index ) => {
                    return value === values.newCurrency ? <></> :
                      <option key={ index } value={ value }>
                        { value }
                      </option>
                  }
                )
              }
            </FormBoot.Select>
          </Col>

          <Col xs={ 1 } md={ 4 }/>
        </FormBoot.Group>

      </Modal.Body>

      <Modal.Footer as={ Container } className='position-relative d-flex justify-content-center align-items-center'>

        <Button
          className={ `ms-3 w-30` }
          variant={ "outline-light" }
          onClick={ () => setShowChangeCurrency( false ) }
        >
          Cancel
        </Button>

        <Button
          className={ `ms-3 w-30` }
          variant={ "outline-danger" }
          type={ "reset" }
        >
          Reset
        </Button>

        <SubmitButton
          className={ `ms-3 w-30` }
          variant={ "outline-success" }
          disabled={ values.oldCurrency === values.newCurrency }
        >
          Save Changes
        </SubmitButton>

      </Modal.Footer>

    </Form>
  );
};

export default ChangeCurrencyForm;