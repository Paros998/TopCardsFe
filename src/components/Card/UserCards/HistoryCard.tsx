import React, { useMemo, useState } from 'react';
import Pagination from "@mui/material/Pagination";
import { useFetchData } from "../../../hooks/useFetchData";
import { PageRequest } from "../../../interfaces/PageRequest";
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import HistoryRecords from "../../History/HistoryRecords";
import { HistoryModel } from "../../../interfaces/models/HistoryModel";
import { PageResponse } from "../../../interfaces/PageResponse";

const HistoryCard = () => {

  const [ page, setPage ] = useState<number>( 1 );
  const { currentUser } = useCurrentUser();

  const params: PageRequest = useMemo( () => {
    return {
      page: page,
      pageLimit: 15,
      sortDir: "desc",
      sortBy: "dateTime"
    }
  }, [ page ] )

  const [ records, fetchRecords, isPending ] = useFetchData<PageResponse<HistoryModel>>( `/history/${ currentUser?.userId }`, { params } );

  return (
    <div className={ `bg-secondary-dark w-100 h-90 align-self-center d-flex flex-column pb-3` }>

      <div
        className={ `w-100 mt-3 h-95 justify-content-start d-flex flex-column align-items-center overflow-y-scroll thumb-slim thumb-info mb-2` }>

        <HistoryRecords fetchRecords={ fetchRecords } records={ records?.content || [] } isPending={ isPending }/>

      </div>

      <div className={ `w-100 h-5 d-flex align-items-center justify-content-center ` }>
        <Pagination
          count={ records?.totalPages || 1 }
          className={ `bg-light rounded-card-10` }
          color={ "primary" }
          page={ page }
          onChange={ ( event, newPage ) => setPage( newPage ) }
        />
      </div>

    </div>
  );
};

export default HistoryCard;