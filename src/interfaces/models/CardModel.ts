export interface CardModel {
  cardId:string;
  cardPhoto?:string;

  title:string;
  typeOfConnector:string;
  memory:string;
  typeOfMemory:string;
  memoryBus:string;
  memoryClock:string;
  coreClock:string;
  cudaCores:string;
  typeOfOutputs:string[];

  coolingType:string;
  rtxSupport:string;
  powerConnector:string;
  psuPower:string;
  powerConsumption:string;
  size:string;
  producentCode:string;
  supportedLibraries:string[];
}