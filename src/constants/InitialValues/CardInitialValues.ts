import CardPhoto from "../../assets/images/product_avatar.png"
import { CardDetailsModel } from "../../interfaces/models/product/CardDetailsModel";

export const CardInitialValues: CardDetailsModel = {
  boostCoreClock: 0,
  dateOfProduction: "",
  supportedDirectX: "",
  producentSite: "",
  coreClock: 0,
  memoryClock: 0,
  cooling: "",
  cudaCoresAmount: 0,
  memoryAmount: 0,
  powerConnector: "",
  powerConsumption: 0,
  producentCode: "",
  recommendedPower: 0,
  rtxSupport: "",
  supportedLibraries: [ '' ],
  typeOfPciConnector: "",
  typeOfMemory: "",
  productPhoto: CardPhoto,
  title: "",
  memoryBus: 123,
  technology: "",
  maxNumberOfUnitsInSLI: 1

}