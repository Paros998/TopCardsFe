import { ProductDetailsModel } from "./ProductDetailsModel";
import { GpuData } from "./CardDetailsModel";
import { ProcessorData } from "./CpuDetailsModel";
import { MapType } from "../../MapType";

export interface PcDetailsModel extends ProductDetailsModel {
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
  backPanelConnectors: MapType;
  frontPanelConnectors: MapType;
  freeInternalPorts: MapType;
  psu: string;
  psuPower: number;
  psuEfficiency: string;
  additionalAccessories: MapType;
  system: string;
  height: string;
  width: string;
  depth: string;
}