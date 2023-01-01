import { ProductDetailsModel } from "./ProductDetailsModel";
import { GpuData } from "./CardDetailsModel";
import { ProcessorData } from "./CpuDetailsModel";

export interface LaptopDetailsModel extends ProductDetailsModel {
  gpuCard: GpuData;
  cpu: ProcessorData;
  ramAmount: number;
  ramType: string;
  ramClock: number;
  hddDrives: Record<string, number>;
  ssdDrives: Record<string, number>;
  chipset: string;
  diskDrive: boolean;
  sound: string;
  connectivity: string[];
  leftPanelConnectors: Record<string, number>;
  rightPanelConnectors: Record<string, number>;
  psu: string;
  psuPower: number;
  psuEfficiency: string;
  maxTDP: number;
  additionalAccessories: Record<string, number>;
  system: string;
  height: string;
  width: string;
  depth: string;
  touchableScreen: boolean;
  screenType: string;
  screenSize: string;
  screenResolution: string;
  screenRefreshRate: number;
  matrixLightness: string;
  batteryType: string;
  batteryCapacity: string;
  fingerPrintReader: boolean;
  weight: string;
}