import { ProductDetailsModel } from "./ProductDetailsModel";

export interface CpuDetailsModel extends ProductDetailsModel {
  producer: string;
  maxTdp: number;
  technology: string;
  coreClock: number;
  boostCoreClock: number;
  totalSpecification: string;
  socket: string;
  series: string;
  version: string;
  cores: number;
  threads: number;
  instructionsPerCycle: number;
}

export interface ProcessorData {
  productId: string;
  title: string;
  producer: string;
  productPhoto: string;
}