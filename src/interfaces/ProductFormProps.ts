import React, { Dispatch } from "react";

export interface ProductFormProps {
  inDetails?: boolean;
  isNewProduct: boolean;
  editable: boolean;
  setEditable: Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  isCreated?: boolean;
}