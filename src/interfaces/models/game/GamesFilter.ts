import { FilterGame } from "./FilterGame";
import { ProductType } from "../../enums/ProductType";

export interface GamesFilter {
  games: FilterGame[];
  consoles?: Console[];
  productType: ProductType;
}