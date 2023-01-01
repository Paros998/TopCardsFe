import { Platform } from "../../enums/Platform";

export interface GameWithScores {
  gameId: string;
  name: string;
  fileUrl: string;
  platforms: Platform[];
  scores: PlatformScore[];
}

export interface GameData {
  title: string;
  releaseDate: string;
  description: string;
  scoreOnPlatforms: PlatformScore[];
  platforms: Platform[];
  file: string;
  graphicRequirements: string;
  processorRequirements: string;
  requiredRam: number;
  supportedSystems: string[];
  requiredSpace: number;
}

export interface PlatformScore {
  platform: Platform;
  score: number
}