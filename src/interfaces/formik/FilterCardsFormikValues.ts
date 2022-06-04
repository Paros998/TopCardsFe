export interface FilterCardsFormikValues {
  manufacturer: string[] | string;
  technology: string[] | string;
  memory: string[] | string;
  memoryType: string[] | string;
  outputsType: string[] | string;
  memoryBus: string[] | string;
  availableLocal: boolean;
  availableOnline: boolean;
  unavailableLocal: boolean;
  unavailableOnline: boolean;
}