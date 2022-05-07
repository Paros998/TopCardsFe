import React, {FC} from 'react';

interface HrBrakeProps {
  className?:string;
}

const HrBrake:FC<HrBrakeProps> = ({className}) => {

  let spanFlex = `w-100 d-flex align-items-center`;

  return <span className={`${spanFlex} justify-content-center my-2`}>
    <hr className={`w-96 ${className}`}/>
  </span>
};

export default HrBrake;