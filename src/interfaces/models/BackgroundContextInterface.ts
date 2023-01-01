import React from "react";

export interface BackgroundContextInterface {
  background: string;
  setBackground: React.Dispatch<React.SetStateAction<string | undefined>>;
}