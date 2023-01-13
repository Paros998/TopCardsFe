import { ProductDetailsModel } from "./ProductDetailsModel";
import { GpuData } from "./CardDetailsModel";
import { ProcessorData } from "./CpuDetailsModel";
import { MapType } from "../../MapType";

export interface LaptopDetailsModel extends ProductDetailsModel {
  gpuCard: GpuData;
  cpu: ProcessorData;
  ramAmount: number;
  ramType: string;
  ramClock: number;
  hddDrives: MapType;
  ssdDrives: MapType;
  chipset: string;
  diskDrive: boolean;
  sound: string;
  connectivity: string[];
  leftPanelConnectors: MapType;
  rightPanelConnectors: MapType;
  psu: string;
  psuPower: number;
  psuEfficiency: string;
  maxTDP: number;
  additionalAccessories: MapType;
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