import React, {useState} from 'react';
import {BellFill} from "react-bootstrap-icons";
import NotificationCanvas from "../OfCanvas/NotificationCanvas";

const Notification = () => {

  const [showCanvas, setShowCanvas] = useState<boolean>(false);

  const handleClick = () => setShowCanvas(!showCanvas);
  const handleClose = () => setShowCanvas(false);

  return (
    <>
    <span
      className={`bg-light rounded-circle p-1 d-flex justify-content-center align-items-center btn-pointer
       position-absolute notification-span z-index-1000`}
      onClick={handleClick}
    >
      <BellFill className={`${showCanvas ? `text-primary` : `text-dark`}`}/>
    </span>

      <NotificationCanvas show={showCanvas} handleClose={handleClose}/>
    </>
  );
};

export default Notification;