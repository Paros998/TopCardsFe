import React, {FC, useState} from 'react';
import {ButtonProps} from "react-bootstrap/Button";

interface ImageButtonDropdownProps extends ButtonProps {
  src: string;
  className?: string;
  imageClassName?: string;
  dropdownClassName?: string;
  onClick?: () => void;
}

const ImageButtonDropdown: FC<ImageButtonDropdownProps> = ({
                                                             src,
                                                             className,
                                                             imageClassName,
                                                             dropdownClassName,
                                                             children,
                                                             onClick
                                                           }) => {

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div
      className={`w-100 ${className}`}
      onMouseOver={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >

      <img src={src}
           className={`rounded-circle border-2 border-light border btn-pointer position-relative ${imageClassName}`}
           alt={`Img`}
           style={{width: "3rem", height: "3rem"}}
           onClick={() => onClick ? onClick() : null}
      />

      <div
        className={`${showDropdown ? `d-flex` : `d-none`} flex-column p-1 bg-dark text-light position-absolute rounded-card-10 ${dropdownClassName}`}
      >

        {children}

      </div>
    </div>
  );
};

export default ImageButtonDropdown;