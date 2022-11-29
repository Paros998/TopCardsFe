export interface CardDetailsModel {
  productId?: string;
  title: string;
  producentCode: string;
  producentSite: string;
  dateOfProduction: string;
  productPhoto: string;

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
}