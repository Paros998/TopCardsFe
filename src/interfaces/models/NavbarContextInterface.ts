import React from "react";

export interface NavbarContextInterface {
  navbarVisible: boolean;
  setNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>;

  productNavbarVisible: boolean;
  setProductNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>;

  productSpecificNavbarVisible: boolean;
  setProductSpecificNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}