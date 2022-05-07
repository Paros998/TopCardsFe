import React from 'react';
import {UserHistory} from "../../../constants/UserHistory/UserHistory";
import HistoryRecord from "../../History/HistoryRecord";

const HistoryCard = () => {
  return (
    <div className={`w-100 h-85 align-self-center d-flex flex-column justify-content-start
     align-items-center overflow-y-scroll thumb-slim thumb-info pb-3`}>
      {
        UserHistory.map((value, index) => <HistoryRecord record={value} key={index}/>)
      }
      {
        UserHistory.map((value, index) => <HistoryRecord record={value} key={index}/>)
      }
    </div>
  );
};

export default HistoryCard;