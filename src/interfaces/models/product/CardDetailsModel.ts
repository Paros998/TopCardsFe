import { ProductDetailsModel } from "./ProductDetailsModel";

export interface CardDetailsModel extends ProductDetailsModel {
  technology: string;
  rtxSupport: string;
  supportedLibraries: string[];
  cudaCoresAmount: number;
  powerConsumption: number;
  recommendedPower: number;
  cooling: string;
  powerConnector: string;
  coreClock: number;
  boostCoreClock: number;
  memoryAmount: number;
  supportedDirectX: string;
  typeOfMemory: string;
  typeOfPciConnector: string;
  memoryClock: number;
  memoryBus: number;
  maxNumberOfUnitsInSLI: number;
}

export interface GpuData {
  productId: string;
  title: string;
  productPhoto: string;
}