import React from "react";
import { ProductType } from "../enums/ProductType";

export interface ProductData {
  productId: string;
  productType: ProductType;
}

export interface ModalProductDetailsContextInterface {
  showDetailsModal: boolean;
  setShowDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;

  showOffersModal: boolean;
  setShowOffersModal: React.Dispatch<React.SetStateAction<boolean>>;

  productData: ProductData;
  setProductData: React.Dispatch<React.SetStateAction<ProductData>>;
}