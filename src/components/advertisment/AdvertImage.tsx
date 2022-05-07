import React, {FC, useState} from 'react';

import Chuck from '../../assets/images/advert/BZ_WBK_Chuck_Norris_Outdoor_1.d2cbdd99.jpg'
import {Spinner} from "react-bootstrap";

interface AdvertImageProps {
  className?:string;
}

const AdvertImage:FC<AdvertImageProps> = ({className}) => {

  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div className={`rounded-card-10 m-0 p-0 h-100 d-flex justify-content-center align-items-center ${className}`}>
      <img src={Chuck} alt={``} className={`img-fluid w-100 h-100 rounded-card-10 ${!loaded && `d-none`}`} onLoad={() => setLoaded(true)}/>
      <Spinner
        animation={`border`}
        variant={`light`}
        style={{
          width:"4rem",
          height:"4rem"
        }}
        className={` ${loaded && `d-none`}`}
      />
    </div>
  );
};

export default AdvertImage;