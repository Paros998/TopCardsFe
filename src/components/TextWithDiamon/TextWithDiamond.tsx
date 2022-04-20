import React, {FC} from 'react';
import {DiamondFill} from "react-bootstrap-icons";

interface HeaderWithDiamondProps {
  headerClassName?:string;
  className?:string;
  diamondClassName?:string;
}

const TextWithDiamond: FC<HeaderWithDiamondProps> = ({ children,headerClassName,diamondClassName, className }) => {
  return (
    <div className={`d-flex justify-content-center align-items-center ${className}`}>
      <DiamondFill
        className={`text-primary ${diamondClassName}`}
        style={{ fontSize: '0.6em' }}
      />
      <span className={`ms-1 ${headerClassName}`}>{children}</span>
    </div>
  );
};

export default TextWithDiamond;