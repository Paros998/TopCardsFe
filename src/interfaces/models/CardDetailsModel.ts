export interface CardDetailsModel {
  cardId?:string;
  cardPhoto:string;
  title:string;
  typeOfConnector:string;
  typeOfMemory:string;
  memoryAmount:string;
  memoryBus: string;
  clockMemory:number;
  coreClock:string;
  cuda:number;
  typeOfOutputs:string[];
  cooling:string;
  powerConnector:string;
  recommendedPower:number;
  powerConsumption:number;
  size:string;
  producentCode:string;
  rtxSupport:string;
  supportedLibraries:string[];
  producentSite:string;
  technology: string;
  manufacturer: string;
}