import { HistoryAction } from "../../enums/HistoryAction";

export interface HistoryData {
  historyId?: string;
  productId?: string;
  action: HistoryAction;
  content: string;
  dateTime?: string;
}

export interface AddHistoryCommand {
  historyData: HistoryData
  userId: string;
}