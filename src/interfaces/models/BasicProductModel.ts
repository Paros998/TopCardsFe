import { ProductType } from "../enums/ProductType";

export interface BasicProductModel {
  productId: string;
  title: string;
  productType: ProductType;
  isFollowed: boolean;
  isMarked: boolean;
  available: boolean;
  storesNumber: number;
  storesLowestPrice: number
  productPhoto?: string;
}