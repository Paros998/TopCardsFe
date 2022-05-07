export interface LocalStoreModel {
  cards: { id: string, price: number }[];
  name: string;
  address: string;
  phone?: string;
  shopWebsite?: string;
}