export interface BasicCardModel {
  id:string;
  cardPhoto?:string;
  title:string;

  availableLocal:boolean;
  localStoresNumber:number;
  localStoresLowestPrice:number

  availableOnline:boolean
  onlineStoresNumber:number;
  onlineStoresLowestPrice:number

  isFollowed: boolean;
}