import React, { FC } from 'react';
import { HistoryModel } from "../../interfaces/models/HistoryModel";
import HistoryRecord from "./HistoryRecord";
import { Spinner } from "react-bootstrap";
import RecordsNotFound from "../../assets/images/records-not-found.png";

interface HistoryRecordsProps {
  records: HistoryModel[] | [];
  isPending: boolean;
  fetchRecords: () => Promise<void>;
}

const HistoryRecords:FC<HistoryRecordsProps> = ({records, fetchRecords, isPending}) => {

  if ( isPending )
    return <div className={ `d-flex h-50 w-100 justify-content-center align-items-center mt-5` }>
      <Spinner style={{width: "3rem",height: "3rem"}}  animation={ "border" } variant={ "light" }/>
    </div>;

  if ( records.length === 0 )
    return <div className={ `d-flex h-80 w-100 justify-content-center align-items-center mt-5` }>
      <img src={ RecordsNotFound } alt={ '' } className={ `rounded-circle h-100 w-auto` }/>
    </div>;

  return (
    <>
      {
        records.map( ( value, index ) => <HistoryRecord record={ value } fetchRecords={fetchRecords} key={ index }/> )
      }
    </>
  );
};

export default HistoryRecords;