export interface NotificationModel {
  cardId: number;
  message: string;
  date: string;
  type: `info` | `danger` | `success` ;
}