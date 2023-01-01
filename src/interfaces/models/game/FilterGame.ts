import { Platform } from "../../enums/Platform";

export interface FilterGame {
  name: string;
}

export interface PlatformFilterGame extends FilterGame {
  platforms: Platform[];
}