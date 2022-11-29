export interface ReviewModel {
  id?: string;
  productId?: string;
  opinion: string;
  score: number;
  username?: string;
  reviewDate: string;
  isCensored: boolean;
  userId?: string;
}