import { HistoryAction } from "../enums/HistoryAction";

export interface HistoryModel {
  action: HistoryAction
  historyId: string;
  productId: string;
  content: string;
  dateTime: string;
}