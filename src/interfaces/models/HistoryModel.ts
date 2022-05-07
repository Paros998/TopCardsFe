export interface HistoryModel {
  action: `unfollow` | `follow` | `checkCard` | `checkOffer` | `opinion`;
  id: string;
  cardId?: string;
  link?: string;
}