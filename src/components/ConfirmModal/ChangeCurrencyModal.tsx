import React, { FC, SetStateAction } from 'react';
import { Modal } from "react-bootstrap";
import { Formik } from "formik";
import { ChangeCurrencyFormikValues } from "../../interfaces/formik/ChangeCurrencyFormikValues";
import ChangeCurrencyForm from "../Forms/ChangeCurrencyForm";
import { useFetchData } from "../../hooks/useFetchData";

interface ChangeCurrencyModalProps {
  showChangeCurrency: boolean;
  setShowChangeCurrency: React.Dispatch<SetStateAction<boolean>>;
  onSubmit: ( values: ChangeCurrencyFormikValues ) => Promise<void>;
  initialValues: ChangeCurrencyFormikValues;
}

const ChangeCurrencyModal: FC<ChangeCurrencyModalProps> = ( {
                                                              setShowChangeCurrency,
                                                              onSubmit,
                                                              showChangeCurrency,
                                                              initialValues
                                                            } ) => {
  const [ currencies ] = useFetchData<string[]>( `common-data/currencies` );

  return (
    <Modal
      centered
      onHide={ () => setShowChangeCurrency( false ) }
      show={ showChangeCurrency }
      size='lg'
      contentClassName='rounded-0 border-1 border-light bg-dark  text-light'
    >
      <Modal.Header closeButton className={ `bg-dark text-light modal-close-light` }>

        <div className={ `d-flex justify-content-center w-100` }>
          <h3>
            Change Your Current Currency
          </h3>
        </div>

      </Modal.Header>

      <Formik<ChangeCurrencyFormikValues>
        onSubmit={ onSubmit }
        initialValues={ initialValues }
      >
        <ChangeCurrencyForm setShowChangeCurrency={ setShowChangeCurrency } currencies={ currencies || [] }/>
      </Formik>

    </Modal>
  );
};

export default ChangeCurrencyModal;