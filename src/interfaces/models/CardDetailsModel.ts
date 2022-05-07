export interface CardDetailsModel {
  id?:string;
  cardPhoto:string;
  title:string;
  typeOfConnector:string;
  typeOfMemory:string;
  memory:string;
  memoryBus: string;
  clockMemory:string;
  coreClock:string;
  cuda:string;
  typeOfOutputs:string[];
  cooling:string;
  powerConnector:string;
  recommendedPower:string;
  powerConsumption:string;
  size:string;
  producentCode:string;
  rtxSupport:string;
  supportedLibraries:string[];
  producentSite:string;
}