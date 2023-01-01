import { ProductDetailsModel } from "./ProductDetailsModel";
import { GpuData } from "./CardDetailsModel";
import { ProcessorData } from "./CpuDetailsModel";

export interface PcDetailsModel extends ProductDetailsModel {
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
  backPanelConnectors: Record<string, number>;
  frontPanelConnectors: Record<string, number>;
  freeInternalPorts: Record<string, number>;
  psu: string;
  psuPower: number;
  psuEfficiency: string;
  additionalAccessories: Record<string, number>;
  system: string;
  height: string;
  width: string;
  depth: string;
}