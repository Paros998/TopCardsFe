import React, { FC, SetStateAction, useMemo } from 'react';
import { Offcanvas, OffcanvasProps } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";
import { Formik } from "formik";
import FilterCardsForm from "../Forms/FilterCardsForm";
import { FilterCardsFormikValues } from "../../interfaces/formik/FilterCardsFormikValues";

interface FilterCanvasProps extends OffcanvasProps {
  show: boolean;
  handleClose: () => void;
  setFilters: React.Dispatch<SetStateAction<FilterCardsFormikValues>>;
  filters: FilterCardsFormikValues;

}

const FilterCanvas: FC<FilterCanvasProps> = ( { show, setFilters, filters, handleClose, ...props } ) => {

  let spanFlex = `w-100 d-flex align-items-center`;

  const initialValues: FilterCardsFormikValues = useMemo( () => {
    return {
      memoryBus: filters.memoryBus,
      memory: filters.memory,
      outputsType: filters.outputsType,
      memoryType: filters.memoryType,
      technology: filters.technology,
      manufacturer: filters.manufacturer,
      unavailableOnline: filters.unavailableOnline,
      unavailableLocal: filters.unavailableLocal,
      availableOnline: filters.availableOnline,
      availableLocal: filters.availableLocal
    }
  },[filters]);

  return <Offcanvas show={ show }
                    onHide={ handleClose }
                    { ...props }
                    className={ `bg-dark text-light h-80 w-30 top-10 align-items-center border border-light mt-xl-3 mt-0 filter-canvas rounded-end-10 ` }>

    <Offcanvas.Header className={ `flex-column w-100 pb-0` }>

      <span className={ `${ spanFlex } btn-pointer` }
            onClick={ handleClose }
      >

        <Offcanvas.Title className={ 'w-80 text-center ms-3' }>Filter Search</Offcanvas.Title>
        <XCircleFill
          style={ { fontSize: "1.5rem" } }/>
      </span>

      <span className={ `${ spanFlex } justify-content-center` }>
        <hr className={ `w-80` }/>
      </span>

    </Offcanvas.Header>


    <Offcanvas.Body className={ `pt-0 vstack me-1 p-0 mb-0` }>

      <Formik<FilterCardsFormikValues>
        initialValues={ initialValues }
        onSubmit={ (values) => setFilters({...values}) }
      >
        <FilterCardsForm/>
      </Formik>


    </Offcanvas.Body>

  </Offcanvas>
};

export default FilterCanvas;