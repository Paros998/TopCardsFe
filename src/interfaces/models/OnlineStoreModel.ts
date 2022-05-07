export interface OnlineStoreModel {
  photo?: string;
  name: string;
  ratingScore: number;
  ratingCount: number;
  cards: { id: string, price: number, offerWebsite: string, hasFreeShipping?: boolean }[];

}