import { ProductDetailsModel } from "./ProductDetailsModel";
import { Platform } from "../../enums/Platform";
import { Console } from "../../enums/Console";
import { ConsoleProducer } from "../../enums/ConsoleProducer";

export interface ConsoleDetailsModel extends ProductDetailsModel {
  platform: Platform;
  console: Console;
  producer: ConsoleProducer;
}