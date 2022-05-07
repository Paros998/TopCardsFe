export interface ReviewModel {
  id?:string;
  cardId?: string;
  opinion: string;
  score: number;
  username?: string;
  avatar?: string;
  date: string;
  censored: boolean;
  userId?: string;
}