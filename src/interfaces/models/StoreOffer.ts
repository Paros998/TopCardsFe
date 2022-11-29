export interface StoreOffer {
  name: string;
  price: number
  phone: string;
  offerWebsite: string;
  storePhoto?: string;
  ratingCount: number
  ratingScore: number
  hasFreeShipping: boolean
}