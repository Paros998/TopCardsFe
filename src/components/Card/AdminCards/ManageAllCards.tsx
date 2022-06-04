import React, { useMemo, useState } from 'react';
import { FilterCardsFormikValues } from "../../../interfaces/formik/FilterCardsFormikValues";
import { FilterCardsInitialValues } from "../../../constants/InitialValues/FilterCardsInitialValues";
import FilterCardsForm from "../../Forms/FilterCardsForm";
import { Formik } from "formik";
import { Button, Col, Spinner } from "react-bootstrap";
import AllCards from "../../GraphicCard/AllCards";
import { useNavigate } from "react-router-dom";
import { transformArrayToParam } from "../../../utils/transformArrayToParam";
import { PageRequest } from "../../../interfaces/PageRequest";
import { useFetchData } from "../../../hooks/useFetchData";
import { PageResponse } from "../../../interfaces/PageResponse";
import { BasicCardModel } from "../../../interfaces/models/BasicCardModel";
import Pagination from "@mui/material/Pagination";

interface CardPageRequest extends PageRequest, FilterCardsFormikValues {

}

const ManageAllCards = () => {


  const [ filters, setFilters ] = useState<FilterCardsFormikValues>( FilterCardsInitialValues );

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
  }, [ filters ] );

  const [ page, setPage ] = useState<number>( 1 );

  const params: CardPageRequest = useMemo( () => {
    return {
      page: page,
      pageLimit: 5,
      sortBy: "cardId",
      sortDir: "asc",
      manufacturer: transformArrayToParam( filters.manufacturer as string[] ),
      technology: transformArrayToParam( filters.technology as string[] ),
      memory: transformArrayToParam( filters.memory as string[] ),
      memoryType: transformArrayToParam( filters.memoryType as string[] ),
      outputsType: transformArrayToParam( filters.outputsType as string[] ),
      memoryBus: transformArrayToParam( filters.memoryBus as string[] ),
      availableLocal: filters.availableLocal,
      availableOnline: filters.availableOnline,
      unavailableLocal: filters.unavailableLocal,
      unavailableOnline: filters.unavailableOnline
    }
  }, [ page, filters ] )

  const [ cards, , isPending ] = useFetchData<PageResponse<BasicCardModel>>( 'cards', { params } );

  return (
    <div className={ `w-100 hstack h-80 mt-2` }>

      <div className={ `w-20 h-100 vstack align-items-center` }>

        <span className={ `w-100 h-20 vstack align-items-center fs-4` }>
          Filter Cards
          <hr className={ `w-80 ` }/>
        </span>

        <div className={ `w-100 h-90` }>

          <Formik<FilterCardsFormikValues>
            initialValues={ initialValues }
            onSubmit={ ( values ) => setFilters( { ...values } ) }
            enableReinitialize
          >
            <FilterCardsForm/>
          </Formik>

        </div>

      </div>

      <div className={ `w-80 h-100 vstack align-items-center overflow-y-scroll` }>

        <div className={ `d-flex flex-column w-100 h-100 px-3 justify-content-center` }>

          <div className={`d-flex flex-column justify-content-start h-80`}>
            <AllCards cards={ cards?.content || [] } isPending={ isPending }/>
          </div>

          <div className={ `d-flex align-items-end justify-content-center h-20` }>
            <Pagination
              count={ cards?.totalPages || 1 }
              className={ `bg-light rounded-card-10` }
              color={ "primary" }
              page={ page }
              onChange={ ( event, newPage ) => setPage( newPage ) }
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default ManageAllCards;