import { MapType } from "../../../MapType";

export interface BitcoinData {
  value: number;
  dailyBlocks: number;
  networkHashRate: number;
  dailyBitcoinRevenue: number;
}

export interface BitcoinCardProfitability {
  cardId: string;
  cardName: string;
  cardPhoto: string;
  cardLowestPrice: number;
  offerUrl: string;
  bitcoinHashRate: number;

  dailyBitcoinMiningRate: number;
  dailyBitcoinRevenue: number;
  dailyProfit: number;
  monthlyBitcoinMiningRate: number;
  monthlyBitcoinRevenue: number;
  monthlyProfit: number;

  investmentData: InvestmentReturnData | null;
}

export interface InvestmentReturnData {
  monthsToReturnInvestedMoney: number;
  investmentProfit: MapType;
}