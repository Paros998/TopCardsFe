import React, {FC} from 'react';
import {ButtonProps} from "react-bootstrap/Button";
import {Button} from "react-bootstrap";

interface FilterButtonProps extends ButtonProps {
  handleClick?: () => void;
}

const FilterButton: FC<FilterButtonProps> = ({handleClick, ...props}) => {
  return (
      <Button className={`rotate-270 filter-button `}
              variant={`${props.variant ? props.variant : 'dark'}`}
              style={{width: "5.5rem", height: "2.5rem"}}
              onClick={handleClick}
              {...props}
      >
        Filter
      </Button>
  );
};

export default FilterButton;