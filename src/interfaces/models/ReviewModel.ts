export interface ReviewModel {
  id?:string;
  cardId?: string;
  opinion: string;
  score: number;
  username?: string;
  date: string;
  censored: boolean;
  userId?: string;
}